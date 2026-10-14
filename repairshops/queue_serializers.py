from rest_framework import serializers
from .models import Queue


class QueueSerializer(serializers.ModelSerializer):

    customer = serializers.CharField(
        source="booking.customer.username",
        read_only=True
    )

    vehicle = serializers.CharField(
        source="booking.vehicle.registration_number",
        read_only=True
    )

    problem = serializers.CharField(
        source="booking.problem_description",
        read_only=True
    )

    booking_id = serializers.CharField(
        source="booking.booking_id",
        read_only=True
    )

    booking_date = serializers.DateField(
        source="booking.booking_date",
        read_only=True
    )

    booking_time = serializers.TimeField(
        source="booking.booking_time",
        read_only=True
    )

    class Meta:
        model = Queue
        fields = [
            "id",
            "booking_id",
            "customer",
            "vehicle",
            "problem",
            "position",
            "booking_date",
            "booking_time",
            "status",
        ]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Remove `position` from the serialized output when the queue item is completed
        if rep.get("status") == "Completed":
            rep.pop("position", None)
        return rep

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)