from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Booking
from .serializers import BookingSerializer

from accounts.permissions import (
    IsCustomer,
    IsAdmin,
    IsShopOwner,
)

from notifications.models import Notification
from django.contrib.auth import get_user_model
from repairshops.models import Queue

User = get_user_model()


class BookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_permissions(self):

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "admin"
        ):
            return [
                IsAuthenticated(),
                IsAdmin(),
            ]

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "shop_owner"
        ):
            return [
                IsAuthenticated(),
                IsShopOwner(),
            ]

        return [
            IsAuthenticated(),
            IsCustomer(),
        ]

    def get_queryset(self):

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "admin"
        ):
            return Booking.objects.all()

        if (
            self.request.user.is_authenticated
            and self.request.user.role == "shop_owner"
        ):
            return Booking.objects.filter(
                repair_shop__owner=self.request.user
            )

        return Booking.objects.filter(
            customer=self.request.user
        )

    def perform_create(self, serializer):

        booking = serializer.save(
            customer=self.request.user
        )

        Queue.objects.create(
            repair_shop=booking.repair_shop,
            booking=booking,
            position=Queue.objects.filter(
                repair_shop=booking.repair_shop
            ).count() + 1,
            status="Waiting",
        )

        admin = User.objects.filter(
            is_superuser=True
        ).first()

        if admin:
            Notification.objects.create(
                user=admin,
                title="New Booking",
                message=f"New booking received from {self.request.user.username}"
            )