from rest_framework.test import APITestCase

from accounts.models import User
from .models import RepairShop


class NearbyRepairShopTests(APITestCase):
	def test_distance_uses_live_coordinates_and_returns_shop_coordinates(self):
		owner = User.objects.create_user(
			username="nearby-owner",
			password="test-password-123",
			phone="5551112222",
			role="shop_owner",
		)
		RepairShop.objects.create(
			owner=owner,
			shop_name="Nearby Test Shop",
			description="",
			phone="5553334444",
			email="nearby@example.com",
			address="Test Road",
			city="Test City",
			state="Test State",
			pincode="123456",
			latitude=9.9312,
			longitude=76.2673,
			google_map_link="",
			landmark="",
			opening_time="08:00",
			closing_time="20:00",
			is_verified=True,
		)
		self.client.force_authenticate(user=owner)

		response = self.client.get(
			"/api/repairshops/nearby/",
			{"lat": "9.9312", "lng": "76.2673"},
		)

		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.data), 1)
		self.assertAlmostEqual(response.data[0]["distance_km"], 0, places=6)
		self.assertEqual(response.data[0]["latitude"], 9.9312)
		self.assertEqual(response.data[0]["longitude"], 76.2673)
