from django.db import models
from accounts.models import User

class RepairShop(models.Model):

    owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='repair_shop'
    )

    shop_name = models.CharField(max_length=150)

    description = models.TextField(blank=True)

    phone = models.CharField(max_length=15)

    email = models.EmailField()

    address = models.TextField()

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    latitude = models.DecimalField(max_digits=10, decimal_places=7)

    longitude = models.DecimalField(max_digits=10, decimal_places=7)

    google_map_link = models.URLField(blank=True)

    landmark = models.CharField(max_length=255, blank=True)

    opening_time = models.TimeField()

    closing_time = models.TimeField()

    is_open = models.BooleanField(default=True)

    
    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0
    )

    total_reviews = models.PositiveIntegerField(default=0)

    current_queue = models.PositiveIntegerField(default=0)

    available_mechanics = models.PositiveIntegerField(default=1)

    is_verified = models.BooleanField(default=False)

    shop_logo = models.ImageField(
        upload_to='shop_logo/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.shop_name
    
class Mechanic(models.Model):

    STATUS_CHOICES = (
        ("Available", "Available"),
        ("Busy", "Busy"),
        ("Offline", "Offline"),
    )

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE,
        related_name="mechanics"
    )

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    specialization = models.CharField(max_length=100)

    experience = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Available"
    )

    def __str__(self):
        return self.name

class Service(models.Model):

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE,
        related_name="services"
    )

    service_name = models.CharField(max_length=100)

    description = models.TextField(
        blank=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    duration = models.CharField(
        max_length=50
    )

    is_available = models.BooleanField(
        default=True
    )


    def __str__(self):
        return self.service_name
    
class Queue(models.Model):

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE,
        related_name="queue"
    )

    booking = models.ForeignKey(
        "bookings.Booking",
        on_delete=models.CASCADE
    )

    position = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        default="Waiting"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.repair_shop.shop_name} - {self.position}"