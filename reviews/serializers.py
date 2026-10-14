from rest_framework import serializers
from .models import Review
from bookings.models import Booking


class ReviewSerializer(serializers.ModelSerializer):
    repair_shop_name = serializers.CharField(
        source="repair_shop.shop_name",
        read_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "customer",
            "repair_shop",
            "repair_shop_name",
            "rating",
            "review",
            "created_at",
        ]
        read_only_fields = ["customer", "created_at"]

    def validate_repair_shop(self, repair_shop):
        request = self.context.get("request")
        if request and not Booking.objects.filter(
            customer=request.user,
            repair_shop=repair_shop,
            status="Completed",
        ).exists():
            raise serializers.ValidationError(
                "You can review a shop after completing a service there."
            )
        return repair_shop