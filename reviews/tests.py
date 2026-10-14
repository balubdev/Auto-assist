from datetime import date, time

from rest_framework.test import APITestCase

from accounts.models import User, Vehicle
from bookings.models import Booking
from notifications.models import Notification
from repairshops.models import RepairShop
from .models import Review


class CustomerReviewTests(APITestCase):
	def setUp(self):
		self.customer = User.objects.create_user(
			username="review-customer",
			password="test-password-123",
			phone="1112223333",
			role="customer",
		)
		self.other_customer = User.objects.create_user(
			username="other-customer",
			password="test-password-123",
			phone="1112223334",
			role="customer",
		)
		self.owner = User.objects.create_user(
			username="review-shop-owner",
			password="test-password-123",
			phone="1112223335",
			role="shop_owner",
		)
		self.shop = RepairShop.objects.create(
			owner=self.owner,
			shop_name="Completed Service Shop",
			phone="2223334444",
			email="review-shop@example.com",
			address="Test Road",
			city="Test City",
			state="Test State",
			pincode="123456",
			latitude=9.9312,
			longitude=76.2673,
			opening_time=time(8, 0),
			closing_time=time(20, 0),
			is_verified=True,
		)
		vehicle = Vehicle.objects.create(
			user=self.customer,
			vehicle_type="Car",
			brand="Test",
			model="Vehicle",
			registration_number="REVIEW-TEST-1",
			fuel_type="Petrol",
			manufacturing_year=2020,
			color="Blue",
		)
		Booking.objects.create(
			customer=self.customer,
			vehicle=vehicle,
			repair_shop=self.shop,
			problem_description="Routine service",
			booking_date=date.today(),
			booking_time=time(10, 0),
			status="Completed",
		)
		self.client.force_authenticate(user=self.customer)
		self.url = "/api/reviews/reviews/"

	def test_customer_can_review_shop_after_completed_service(self):
		response = self.client.post(
			self.url,
			{
				"customer": self.other_customer.id,
				"repair_shop": self.shop.id,
				"rating": 5,
				"review": "Great service.",
			},
			format="json",
		)

		self.assertEqual(response.status_code, 201)
		review = Review.objects.get()
		self.assertEqual(review.customer_id, self.customer.id)
		self.assertEqual(response.data["repair_shop_name"], self.shop.shop_name)
		notification = Notification.objects.get(user=self.owner)
		self.assertEqual(notification.title, "New Customer Review")
		self.assertIn(self.shop.shop_name, notification.message)

	def test_customer_cannot_review_shop_without_completed_service(self):
		other_shop_owner = User.objects.create_user(
			username="unvisited-shop-owner",
			password="test-password-123",
			phone="1112223336",
			role="shop_owner",
		)
		unvisited_shop = RepairShop.objects.create(
			owner=other_shop_owner,
			shop_name="Unvisited Shop",
			phone="3334445555",
			email="unvisited@example.com",
			address="Other Road",
			city="Other City",
			state="Test State",
			pincode="123456",
			latitude=9.9,
			longitude=76.2,
			opening_time=time(8, 0),
			closing_time=time(20, 0),
			is_verified=True,
		)

		response = self.client.post(
			self.url,
			{
				"repair_shop": unvisited_shop.id,
				"rating": 4,
				"review": "A review without a completed booking.",
			},
			format="json",
		)

		self.assertEqual(response.status_code, 400)
		self.assertFalse(Review.objects.exists())
