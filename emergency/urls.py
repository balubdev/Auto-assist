from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmergencyViewSet, ShopEmergencyRequestListView

router = DefaultRouter()
router.register(r'emergency', EmergencyViewSet)

urlpatterns = [
    path(
        'shop-requests/',
        ShopEmergencyRequestListView.as_view(),
        name='shop-emergency-requests',
    ),
    path('', include(router.urls)),
]