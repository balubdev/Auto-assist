from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("customer", "Customer"),
        ("shop_owner", "Shop Owner"),
        ("admin", "Admin"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )

    phone = models.CharField(max_length=15, unique=True)

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    address = models.TextField(blank=True)

    city = models.CharField(max_length=100, blank=True)

    state = models.CharField(max_length=100, blank=True)

    pincode = models.CharField(max_length=10, blank=True)

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class Vehicle(models.Model):

    vehicle_image = models.ImageField(
        upload_to="vehicles/",
        blank=True,
        null=True
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="vehicles"
    )

    # Any vehicle type can be entered
    vehicle_type = models.CharField(max_length=50)

    brand = models.CharField(max_length=100)

    model = models.CharField(max_length=100)

    registration_number = models.CharField(
        max_length=30,
        unique=True
    )

    fuel_type = models.CharField(max_length=30)

    manufacturing_year = models.PositiveIntegerField()

    color = models.CharField(max_length=30)

    def __str__(self):
        return self.registration_number