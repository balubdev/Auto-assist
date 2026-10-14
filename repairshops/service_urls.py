from rest_framework.routers import DefaultRouter

from .service_views import ServiceViewSet


router = DefaultRouter()

router.register(
    "services",
    ServiceViewSet,
    basename="services"
)


urlpatterns = router.urls