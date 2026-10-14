from rest_framework.test import APITestCase

from accounts.models import User, Vehicle
from notifications.models import Notification
from repairshops.models import RepairShop


class EmergencyShopNotificationTests(APITestCase):
	def test_sos_notifies_verified_shops_within_25_km_only(self):
		customer = User.objects.create_user(
			username="customer",
			password="test-password-123",
			phone="1111111111",
			role="customer",
		)
		nearby_owner = User.objects.create_user(
			username="nearby-shop-owner",
			password="test-password-123",
			phone="2222222222",
			role="shop_owner",
		)
		distant_owner = User.objects.create_user(
			username="distant-shop-owner",
			password="test-password-123",
			phone="3333333333",
			role="shop_owner",
		)
		Vehicle.objects.create(
			user=customer,
			vehicle_type="Car",
			brand="Test",
			model="Vehicle",
			registration_number="SOS-TEST-1",
			fuel_type="Petrol",
			manufacturing_year=2020,
			color="Blue",
		)
		shop_fields = {
			"shop_name": "Test Shop",
			"description": "",
			"phone": "4444444444",
			"email": "shop@example.com",
			"address": "Test Road",
			"city": "Test City",
			"state": "Test State",
			"pincode": "123456",
			"longitude": 76.2673,
			"google_map_link": "",
			"landmark": "",
			"opening_time": "08:00",
			"closing_time": "20:00",
			"is_open": True,
			"is_verified": True,
		}
		nearby_shop = RepairShop.objects.create(
			owner=nearby_owner,
			latitude=9.9312,
			**shop_fields,
		)
		distant_shop = RepairShop.objects.create(
			owner=distant_owner,
			latitude=10.5,
			**{
				**shop_fields,
				"shop_name": "Distant Shop",
				"email": "distant@example.com",
			},
		)
		self.client.force_authenticate(user=customer)

		response = self.client.post(
			"/api/emergency/emergency/",
			{
				"vehicle": customer.vehicles.get().id,
				"problem": "Battery Jump Start",
				"latitude": 9.9312,
				"longitude": 76.2673,
			},
			format="json",
		)

		self.assertEqual(response.status_code, 201)
		self.assertEqual(
			list(Notification.objects.values_list("user_id", flat=True)),
			[nearby_shop.owner_id],
		)
		self.assertFalse(
			Notification.objects.filter(user=distant_shop.owner).exists()
		)

		self.client.force_authenticate(user=nearby_owner)
		nearby_inbox = self.client.get("/api/notifications/")
		self.assertEqual(nearby_inbox.status_code, 200)
		nearby_notifications = nearby_inbox.data.get(
			"results",
			nearby_inbox.data,
		)
		self.assertEqual(len(nearby_notifications), 1)
		self.assertEqual(
			nearby_notifications[0]["title"],
			"Nearby Emergency SOS",
		)
		self.assertIn("0.00 km away", nearby_notifications[0]["message"])

		shop_requests = self.client.get(
			"/api/emergency/shop-requests/"
		)
		self.assertEqual(shop_requests.status_code, 200)
		requests = shop_requests.data.get("results", shop_requests.data)
		self.assertEqual(len(requests), 1)
		self.assertEqual(requests[0]["problem"], "Battery Jump Start")
		self.assertEqual(
			requests[0]["customer_phone"],
			customer.phone,
		)
		self.assertEqual(
			requests[0]["vehicle_registration"],
			"SOS-TEST-1",
		)

		self.client.force_authenticate(user=customer)
		self.assertEqual(
			self.client.get("/api/emergency/shop-requests/").status_code,
			403,
		)

		self.client.force_authenticate(user=distant_owner)
		distant_inbox = self.client.get("/api/notifications/")
		distant_notifications = distant_inbox.data.get(
			"results",
			distant_inbox.data,
		)
		self.assertEqual(distant_notifications, [])
		distant_requests = self.client.get(
			"/api/emergency/shop-requests/"
		).data
		self.assertEqual(
			distant_requests.get("results", distant_requests),
			[],
		)

	def test_sos_falls_back_to_three_nearest_verified_shops(self):
		customer = User.objects.create_user(
			username="fallback-customer",
			password="test-password-123",
			phone="7771112222",
			role="customer",
		)
		Vehicle.objects.create(
			user=customer,
			vehicle_type="Car",
			brand="Test",
			model="Vehicle",
			registration_number="SOS-TEST-2",
			fuel_type="Petrol",
			manufacturing_year=2020,
			color="Blue",
		)
		shop_owners = []
		for index, latitude in enumerate((10.5, 11.0, 12.0, 13.0)):
			owner = User.objects.create_user(
				username=f"fallback-owner-{index}",
				password="test-password-123",
				phone=f"888111220{index}",
				role="shop_owner",
			)
			shop_owners.append(owner)
			RepairShop.objects.create(
				owner=owner,
				shop_name=f"Fallback Shop {index}",
				description="",
				phone=f"999111220{index}",
				email=f"fallback-{index}@example.com",
				address="Test Road",
				city="Test City",
				state="Test State",
				pincode="123456",
				latitude=latitude,
				longitude=76.2673,
				google_map_link="",
				landmark="",
				opening_time="08:00",
				closing_time="20:00",
				is_open=True,
				is_verified=True,
			)
		self.client.force_authenticate(user=customer)

		response = self.client.post(
			"/api/emergency/emergency/",
			{
				"vehicle": customer.vehicles.get().id,
				"problem": "Engine Breakdown",
				"latitude": 9.9312,
				"longitude": 76.2673,
			},
			format="json",
		)

		self.assertEqual(response.status_code, 201)
		notified_owner_ids = set(
			Notification.objects.values_list("user_id", flat=True)
		)
		self.assertEqual(
			notified_owner_ids,
			{owner.id for owner in shop_owners[:3]},
		)
