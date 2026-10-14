from rest_framework import viewsets
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import RepairShop
from .serializers import RepairShopSerializer
from notifications.models import Notification

from accounts.permissions import (
    IsShopOwner,
    IsAdmin,
)

from ai.services import calculate_distance


class RepairShopViewSet(viewsets.ModelViewSet):

    queryset = RepairShop.objects.all().order_by("-created_at")
    serializer_class = RepairShopSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "shop_name",
        "city",
        "state",
        "address",
    ]

    filterset_fields = [
        "city",
        "state",
        "is_verified",
    ]

    ordering_fields = [
        "average_rating",
        "current_queue",
        "available_mechanics",
    ]


    def get_permissions(self):

        if self.action in ["list", "retrieve"]:

            return [IsAuthenticated()]

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "admin"
        ):

            return [IsAuthenticated(), IsAdmin()]

        return [IsAuthenticated(), IsShopOwner()]


    def get_queryset(self):

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "admin"
        ):

            return RepairShop.objects.all()

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "shop_owner"
        ):

            return RepairShop.objects.filter(
                owner=self.request.user
            )

        return RepairShop.objects.filter(is_verified=True)


    def perform_create(self, serializer):

        shop = serializer.save(
            owner=self.request.user
        )

        admin_users = self.request.user.__class__.objects.filter(
            role="admin",
            is_active=True,
        )
        Notification.objects.bulk_create([
            Notification(
                user=admin,
                title="New repair shop request",
                message=(
                    f"{shop.shop_name} was submitted by "
                    f"{shop.owner.username} and is waiting for approval."
                ),
            )
            for admin in admin_users
        ])



class NearbyRepairShopView(APIView):

    def get(self, request):

        try:

            user_lat = float(
                request.GET.get("lat")
            )

            user_lng = float(
                request.GET.get("lng")
            )

        except (TypeError, ValueError):

            return Response(
                {
                    "error":
                    "Please provide valid lat and lng values."
                },
                status=400
            )

        shops = RepairShop.objects.filter(is_verified=True)

        data = []

        for shop in shops:

            distance = calculate_distance(
                user_lat,
                user_lng,
                float(shop.latitude),
                float(shop.longitude)
            )

            data.append({

                "id": shop.id,

                "shop_name": shop.shop_name,

                "city": shop.city,

                "latitude": float(shop.latitude),

                "longitude": float(shop.longitude),

                "distance_km": distance,

                "rating": shop.average_rating,

                "queue": shop.current_queue,

                "available_mechanics":
                shop.available_mechanics,

                "verified": shop.is_verified,

            })

        data.sort(
            key=lambda x: x["distance_km"]
        )

        return Response(data)



class ShopProfileView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsShopOwner
    ]


    def get(self, request):

        shop = RepairShop.objects.get(
            owner=request.user
        )

        serializer = RepairShopSerializer(shop)

        return Response(serializer.data)

    def patch(self, request):
        shop = RepairShop.objects.get(owner=request.user)
        serializer = RepairShopSerializer(
            shop,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



    def put(self, request):

        shop = RepairShop.objects.get(
            owner=request.user
        )

        serializer = RepairShopSerializer(
            shop,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )