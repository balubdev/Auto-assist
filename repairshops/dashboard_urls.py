from django.urls import path
from .dashboard_views import (
    ShopOwnerBookingView,
    ShopDashboardView,
)

urlpatterns = [

    path(
        "bookings/",
        ShopOwnerBookingView.as_view()
    ),

    path(
        "dashboard/",
        ShopDashboardView.as_view()
    ),

]