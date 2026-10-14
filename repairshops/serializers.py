from rest_framework import serializers
from .models import RepairShop


class RepairShopSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepairShop
        fields = "__all__"
        read_only_fields = [
            "owner"
        ]
        

    def validate_shop_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Shop name is too short."
            )
        return value

    def validate_phone(self, value):
        value = value.strip()
        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )
        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be 10 digits."
            )
        return value

    def validate(self, data):
        latitude = data.get("latitude")
        longitude = data.get("longitude")

        if latitude is not None and not -90 <= latitude <= 90:
            raise serializers.ValidationError(
                {"latitude": "Latitude must be between -90 and 90."}
            )

        if longitude is not None and not -180 <= longitude <= 180:
            raise serializers.ValidationError(
                {"longitude": "Longitude must be between -180 and 180."}
            )

        opening_time = data.get("opening_time")
        closing_time = data.get("closing_time")

        if opening_time and closing_time:
            if opening_time >= closing_time:
                raise serializers.ValidationError(
                    "Opening time must be earlier than closing time."
                )

        return data   