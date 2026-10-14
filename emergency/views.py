from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import EmergencyRequest
from .serializers import EmergencySerializer, ShopEmergencyRequestSerializer
from accounts.permissions import IsCustomer, IsShopOwner
from notifications.models import Notification
from repairshops.models import RepairShop
from ai.services import calculate_distance


SOS_NOTIFICATION_RADIUS_KM = 25
SOS_FALLBACK_SHOP_COUNT = 3


class ShopEmergencyRequestListView(ListAPIView):
    serializer_class = ShopEmergencyRequestSerializer
    permission_classes = [IsAuthenticated, IsShopOwner]

    def get_queryset(self):
        shop = RepairShop.objects.filter(owner=self.request.user).first()
        if shop is None:
            return EmergencyRequest.objects.none()

        return (
            EmergencyRequest.objects.filter(notified_shops=shop)
            .select_related("customer", "vehicle")
            .order_by("-requested_at")
        )


class EmergencyViewSet(viewsets.ModelViewSet):

    queryset = EmergencyRequest.objects.all()

    serializer_class = EmergencySerializer

    permission_classes = [IsAuthenticated, IsCustomer]


    def get_queryset(self):

        return EmergencyRequest.objects.filter(
            customer=self.request.user
        )


    def perform_create(self, serializer):

        emergency = serializer.save(
            customer=self.request.user
        )

        shops_with_distance = []
        shops = RepairShop.objects.filter(is_verified=True).select_related("owner")
        for shop in shops:
            distance = calculate_distance(
                float(emergency.latitude),
                float(emergency.longitude),
                float(shop.latitude),
                float(shop.longitude),
            )
            shops_with_distance.append((shop, distance))

        nearby_shops = [
            (shop, distance)
            for shop, distance in shops_with_distance
            if distance <= SOS_NOTIFICATION_RADIUS_KM
        ]
        if not nearby_shops:
            nearby_shops = sorted(
                shops_with_distance,
                key=lambda item: item[1],
            )[:SOS_FALLBACK_SHOP_COUNT]

        emergency.notified_shops.set(
            [shop for shop, _distance in nearby_shops]
        )

        location_url = (
            "https://www.google.com/maps?q="
            f"{emergency.latitude},{emergency.longitude}"
        )
        Notification.objects.bulk_create([
            Notification(
                user=shop.owner,
                title="Nearby Emergency SOS",
                message=(
                    f"{emergency.customer.username} needs help: "
                    f"{emergency.problem}. Vehicle: "
                    f"{emergency.vehicle.registration_number}. "
                    f"Shop distance: {distance:.2f} km away. "
                    f"Location: {location_url}"
                ),
            )
            for shop, distance in nearby_shops
        ])