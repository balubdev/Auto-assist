from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from accounts.models import User, Vehicle
from repairshops.models import RepairShop


class Booking(models.Model):

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Accepted", "Accepted"),
        ("Mechanic Assigned", "Mechanic Assigned"),
        ("Vehicle Picked Up", "Vehicle Picked Up"),
        ("In Progress", "In Progress"),
        ("Waiting for Parts", "Waiting for Parts"),
        ("Ready for Delivery", "Ready for Delivery"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    )

    booking_id = models.CharField(
        max_length=20,
        unique=True,
        blank=True
    )

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE
    )

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE
    )

    problem_description = models.TextField()

    booking_date = models.DateField()

    booking_time = models.TimeField()

    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    estimated_completion_time = models.CharField(
        max_length=100,
        blank=True
    )

    queue_number = models.PositiveIntegerField(default=0)

    cancellation_reason = models.TextField(blank=True)

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_id:
            last_id = Booking.objects.count() + 1
            self.booking_id = f"AUTO{last_id:06d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.booking_id


class BookingTimeline(models.Model):

    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name="timeline"
    )

    status = models.CharField(max_length=100)

    remarks = models.TextField(blank=True)

    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.booking.booking_id} - {self.status}"


@receiver(post_save, sender=Booking)
def create_booking_timeline(sender, instance, created, **kwargs):
    if created:
        BookingTimeline.objects.create(
            booking=instance,
            status="Booking Created"
        )