from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from bookings.models import Booking
from repairshops.models import Queue
from accounts.permissions import IsShopOwner


class ShopOwnerBookingView(APIView):

    permission_classes = [IsAuthenticated, IsShopOwner]

    def get(self, request):

        bookings = Booking.objects.filter(
            repair_shop__owner=request.user
        )

        data = []

        for booking in bookings:

            data.append({

                "booking_id": booking.booking_id,
                "customer": booking.customer.username,
                "vehicle": booking.vehicle.registration_number,
                "status": booking.status,
                "date": booking.booking_date,
                "time": booking.booking_time

            })

        return Response(data)
    
class ShopDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsShopOwner]

    def get(self, request):

        bookings = Booking.objects.filter(
            repair_shop__owner=request.user
        )

        data = {

            "total_bookings": bookings.count(),

            "pending": Queue.objects.filter(
                repair_shop__owner=request.user,
                status="Waiting"
            ).count(),

            "accepted": bookings.filter(
                status="Accepted"
            ).count(),

            "completed": bookings.filter(
                status="Completed"
            ).count(),

            "cancelled": bookings.filter(
                status="Cancelled"
            ).count()

        }

        return Response(data)