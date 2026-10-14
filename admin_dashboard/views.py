from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Sum

from repairshops.models import RepairShop
from bookings.models import Booking
from emergency.models import EmergencyRequest
from reviews.models import Review

from accounts.permissions import IsAdmin


User = get_user_model()


class DashboardView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        # -----------------------------
        # Dashboard Statistics
        # -----------------------------

        data = {

            "total_users": User.objects.count(),

            "total_shops": RepairShop.objects.count(),

            "total_bookings": Booking.objects.count(),

            "total_emergencies": EmergencyRequest.objects.count(),

            "total_reviews": Review.objects.count(),

            "completed_services":
                Booking.objects.filter(
                    status="Completed"
                ).count(),

            "pending_services":
                Booking.objects.filter(
                    status="Pending"
                ).count(),

            "revenue":
                Booking.objects.filter(
                    status="Completed"
                ).aggregate(
                    total=Sum("estimated_cost")
                )["total"] or 0,

        }

        # -----------------------------
        # Recent Activity
        # -----------------------------

        recent_activity = []

        # Latest bookings
        bookings = Booking.objects.all().order_by(
            "-created_at"
        )[:5]

        for booking in bookings:

            activity_title = "New Booking"

            if booking.status == "Completed":
                activity_title = "Booking Completed"

            elif booking.status == "Accepted":
                activity_title = "Booking Accepted"

            elif booking.status == "Pending":
                activity_title = "New Booking"

            recent_activity.append({

                "type": "booking",

                "title": activity_title,

                "booking_id": booking.booking_id,

                "status": booking.status,

                "date": booking.created_at,

            })


        # Latest reviews
        reviews = Review.objects.all().order_by(
            "-created_at"
        )[:5]

        for review in reviews:

            recent_activity.append({

                "type": "review",

                "title": "New Review",

                "customer": review.customer.username,

                "repair_shop": review.repair_shop.shop_name,

                "rating": review.rating,

                "date": review.created_at,

            })


        # Sort all activities by date
        recent_activity.sort(
            key=lambda x: x["date"],
            reverse=True
        )


        # Only latest 10 activities
        data["recent_activity"] = recent_activity[:10]


        return Response(data)