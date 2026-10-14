from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Review
from .serializers import ReviewSerializer
from accounts.permissions import IsAdmin


class AdminReviewViewSet(viewsets.ModelViewSet):

    queryset = Review.objects.all().order_by("-created_at")

    serializer_class = ReviewSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdmin,
    ]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        "customer__username",
        "repair_shop__shop_name",
        "review",
    ]

    ordering_fields = [
        "rating",
        "created_at",
    ]