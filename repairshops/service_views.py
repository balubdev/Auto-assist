from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from .models import Service
from .service_serializers import ServiceSerializer
from accounts.permissions import IsShopOwner


class ServiceViewSet(viewsets.ModelViewSet):

    serializer_class = ServiceSerializer

    permission_classes = [
        IsAuthenticated,
        IsShopOwner
    ]

    def get_queryset(self):
     return Service.objects.filter(
        repair_shop__owner=self.request.user
    ).order_by("id")


    def perform_create(self, serializer):
        try:
            shop = self.request.user.repair_shop
        except RepairShop.DoesNotExist:
            raise ValidationError({
                "repair_shop": "Create your Shop Profile before adding services."
            })

        serializer.save(
            repair_shop=shop
        )
