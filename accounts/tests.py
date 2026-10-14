from rest_framework.test import APITestCase
from django.urls import reverse

from .models import User


class AdminUsersListTests(APITestCase):
    def test_admin_list_includes_only_customers(self):
        admin = User.objects.create_user(
            username="site-admin",
            password="test-password-123",
            phone="1111111111",
            role="admin",
        )
        customer = User.objects.create_user(
            username="customer-one",
            password="test-password-123",
            phone="2222222222",
            role="customer",
        )
        shop_owner = User.objects.create_user(
            username="shop-owner-one",
            password="test-password-123",
            phone="3333333333",
            role="shop_owner",
        )
        self.client.force_authenticate(user=admin)

        response = self.client.get(reverse("admin-customers"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual([user["id"] for user in response.data], [customer.id])


class ChangePasswordTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="password-customer",
            password="Current-Password-123!",
            phone="4444444444",
            role="customer",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("password-change")

    def test_customer_can_change_password_with_matching_confirmation(self):
        response = self.client.post(
            self.url,
            {
                "new_password": "New-Password-456!",
                "confirm_password": "New-Password-456!",
            },
            format="json",
        )

        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.user.check_password("New-Password-456!"))

    def test_password_change_rejects_confirmation_mismatch(self):
        response = self.client.post(
            self.url,
            {
                "new_password": "New-Password-456!",
                "confirm_password": "Different-Password-789!",
            },
            format="json",
        )

        self.user.refresh_from_db()
        self.assertEqual(response.status_code, 400)
        self.assertTrue(self.user.check_password("Current-Password-123!"))

    def test_shop_owner_can_change_password(self):
        shop_owner = User.objects.create_user(
            username="password-shop-owner",
            password="Current-Owner-123!",
            phone="5555555555",
            role="shop_owner",
        )
        self.client.force_authenticate(user=shop_owner)

        response = self.client.post(
            self.url,
            {
                "new_password": "New-Owner-456!",
                "confirm_password": "New-Owner-456!",
            },
            format="json",
        )

        shop_owner.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(shop_owner.check_password("New-Owner-456!"))
