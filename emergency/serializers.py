from rest_framework import serializers
from .models import EmergencyRequest


class EmergencySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyRequest
        fields = '__all__'
        read_only_fields = ['customer']


class ShopEmergencyRequestSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.username", read_only=True)
    customer_phone = serializers.CharField(source="customer.phone", read_only=True)
    vehicle_brand = serializers.CharField(source="vehicle.brand", read_only=True)
    vehicle_model = serializers.CharField(source="vehicle.model", read_only=True)
    vehicle_registration = serializers.CharField(
        source="vehicle.registration_number",
        read_only=True,
    )

    class Meta:
        model = EmergencyRequest
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "vehicle_brand",
            "vehicle_model",
            "vehicle_registration",
            "problem",
            "latitude",
            "longitude",
            "address",
            "status",
            "requested_at",
        ]