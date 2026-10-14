from rest_framework import serializers
from django.utils import timezone
from datetime import date

from .models import Booking


class BookingSerializer(serializers.ModelSerializer):

    repair_shop_name = serializers.CharField(
        source="repair_shop.shop_name",
        read_only=True,
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "booking_id",
            "customer",
            "vehicle",
            "repair_shop",
            "repair_shop_name",
            "problem_description",
            "booking_date",
            "booking_time",
            "estimated_cost",
            "estimated_completion_time",
            "queue_number",
            "cancellation_reason",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "booking_id",
            "customer",
        ]

    def validate_booking_date(self, value):
        today = timezone.localdate()
        if value < today:
            raise serializers.ValidationError(
                "Booking date cannot be in the past."
            )
        return value

    def validate(self, data):

        request = self.context["request"]

        # If booking_date is today, ensure booking_time is not in the past
        booking_date = data.get("booking_date")
        booking_time = data.get("booking_time")
        if booking_date and booking_time:
            now = timezone.localtime()
            if booking_date == now.date() and booking_time < now.time():
                raise serializers.ValidationError(
                    "Booking time cannot be in the past for the selected date."
                )

        exists = Booking.objects.filter(
            customer=request.user,
            repair_shop=data["repair_shop"],
            booking_date=data["booking_date"],
            booking_time=data["booking_time"],
        ).exists()

        if exists:
            raise serializers.ValidationError(
                "You already have a booking for this time."
            )

        return data