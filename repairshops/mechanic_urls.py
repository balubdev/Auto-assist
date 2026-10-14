from rest_framework.routers import DefaultRouter
from .mechanic_views import MechanicViewSet

router = DefaultRouter()

router.register(
    "mechanics",
    MechanicViewSet,
    basename="mechanics"
)

urlpatterns = router.urls