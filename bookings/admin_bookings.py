from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from .models import Booking, BookingTimeline
from .serializers import BookingSerializer
from accounts.permissions import IsAdmin


class AdminBookingViewSet(viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


    @action(detail=True, methods=["patch"])
    def update_status(self, request, pk=None):

        booking = self.get_object()

        new_status = request.data.get(
            "status",
            booking.status
        )

        booking.status = new_status
        booking.save()

        BookingTimeline.objects.create(
            booking=booking,
            status=new_status,
            updated_by=request.user
        )

        serializer = BookingSerializer(booking)

        return Response(
            {
                "message": "Status Updated Successfully",
                "booking": serializer.data,
            },
            status=status.HTTP_200_OK
        )