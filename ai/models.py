from django.db import models
from accounts.models import User
from repairshops.models import RepairShop


class AIRecommendation(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    repair_shop = models.ForeignKey(
        RepairShop,
        on_delete=models.CASCADE
    )

    recommendation_score = models.FloatField()

    recommended_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.repair_shop.shop_name}"