from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Review
from .serializers import ReviewSerializer
from accounts.permissions import IsCustomer
from notifications.models import Notification


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsCustomer]

    def get_queryset(self):
        return Review.objects.filter(
            customer=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        review = serializer.save(customer=self.request.user)
        Notification.objects.create(
            user=review.repair_shop.owner,
            title="New Customer Review",
            message=(
                f"{self.request.user.username} left a {review.rating}-star review "
                f"for {review.repair_shop.shop_name}: {review.review}"
            ),
        )


from accounts.permissions import IsShopOwner


class ShopReviewViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsShopOwner]


    def get_queryset(self):
     return Review.objects.filter(
        repair_shop__owner=self.request.user
    ).order_by("-created_at")