from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

from .models import User, Vehicle
from .serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    VehicleSerializer
)

from .permissions import IsAdmin


class RegisterUserView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = UserRegistrationSerializer

    permission_classes = [AllowAny]



class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        if self.request.user.role == "admin":

            return User.objects.filter(role="customer")

        return User.objects.filter(
            id=self.request.user.id
        )



class VehicleViewSet(viewsets.ModelViewSet):

    queryset = Vehicle.objects.all()

    serializer_class = VehicleSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):

        return Vehicle.objects.filter(
            user=self.request.user
        )


    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )




class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)



    def put(self, request):

        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role not in ["customer", "shop_owner"]:
            return Response(
                {"detail": "Password changes are not available for this account."},
                status=403,
            )

        new_password = request.data.get("new_password", "")
        confirm_password = request.data.get("confirm_password", "")

        if new_password != confirm_password:
            return Response(
                {"confirm_password": ["Passwords do not match."]},
                status=400,
            )

        try:
            validate_password(new_password, user=request.user)
        except DjangoValidationError as error:
            return Response({"new_password": error.messages}, status=400)

        request.user.set_password(new_password)
        request.user.save(update_fields=["password"])

        return Response({"detail": "Password updated successfully."})




class AdminCustomerView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]


    def get(self, request):

        customers = User.objects.filter(role="customer").order_by("username")

        serializer = UserSerializer(customers, many=True)

        return Response(serializer.data)
    
class AdminProfileView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):

        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=400)