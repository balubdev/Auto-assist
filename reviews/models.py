from django.db import models
from accounts.models import User
from repairshops.models import RepairShop


class Review(models.Model):

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.PositiveSmallIntegerField()

    review = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.username} - {self.repair_shop.shop_name}"