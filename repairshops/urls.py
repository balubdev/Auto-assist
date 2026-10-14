from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RepairShopViewSet
from .views import NearbyRepairShopView
from .views import ShopProfileView


router = DefaultRouter()
router.register(r'shops', RepairShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("nearby/", NearbyRepairShopView.as_view(), name="nearby-shops"),
    path(
    "owner/",
    include("repairshops.dashboard_urls")
),
    path(
    "",
    include("repairshops.mechanic_urls")
),
path(
    "owner/profile/",
    ShopProfileView.as_view(),
    name="shop-profile"
),
path(
    "",
    include("repairshops.service_urls")
),
path("", include("repairshops.queue_urls")),
]