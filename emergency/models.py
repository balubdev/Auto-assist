from django.db import models
from accounts.models import User, Vehicle
from repairshops.models import RepairShop


class EmergencyRequest(models.Model):

    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('On The Way', 'On The Way'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE
    )

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    notified_shops = models.ManyToManyField(
        RepairShop,
        related_name="emergency_requests",
        blank=True,
    )

    problem = models.CharField(max_length=255)

    latitude = models.DecimalField(max_digits=10, decimal_places=7)

    longitude = models.DecimalField(max_digits=10, decimal_places=7)

    address = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    requested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.username} - {self.problem}"