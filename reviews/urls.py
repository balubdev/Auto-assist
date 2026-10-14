from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ReviewViewSet, ShopReviewViewSet


router = DefaultRouter()

router.register(
    r'reviews',
    ReviewViewSet
)

router.register(
    r'shop-reviews',
    ShopReviewViewSet,
    basename="shop-reviews"
)


urlpatterns = [
    path('', include(router.urls)),
]