from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterUserView,
    UserViewSet,
    VehicleViewSet,
    UserProfileView,
    AdminCustomerView,
    AdminProfileView,
    ChangePasswordView,
)

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'vehicles', VehicleViewSet)

urlpatterns = [

    path(
        "register/",
        RegisterUserView.as_view(),
        name="register"
    ),

    path(
        "profile/",
        UserProfileView.as_view(),
        name="profile"
    ),

    path(
        "password/change/",
        ChangePasswordView.as_view(),
        name="password-change"
    ),

    path(
        "admin/customers/",
        AdminCustomerView.as_view(),
        name="admin-customers"
    ),

    path(
        "admin/profile/",
        AdminProfileView.as_view(),
        name="admin-profile"
    ),

    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "",
        include(router.urls)
    ),
]