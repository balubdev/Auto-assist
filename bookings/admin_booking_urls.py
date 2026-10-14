from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .admin_bookings import AdminBookingViewSet

router = DefaultRouter()
router.register(
    r"admin/bookings",
    AdminBookingViewSet,
    basename="admin-bookings",
)

urlpatterns = [
    path("", include(router.urls)),
]