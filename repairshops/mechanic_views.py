from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from .models import Mechanic
from .mechanic_serializers import MechanicSerializer
from accounts.permissions import IsShopOwner

class MechanicViewSet(viewsets.ModelViewSet):

    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer

    permission_classes = [
        IsAuthenticated,
        IsShopOwner
    ]


    def get_queryset(self):
     return Mechanic.objects.filter(
        repair_shop__owner=self.request.user
    ).order_by("id")


    def perform_create(self, serializer):
        try:
            shop = self.request.user.repair_shop
        except RepairShop.DoesNotExist:
            raise ValidationError({
                "repair_shop": "Create your Shop Profile before adding mechanics."
            })

        serializer.save(
            repair_shop=shop
        )
