from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.utils import timezone

from .models import Queue
from bookings.models import Booking
from .queue_serializers import QueueSerializer
from accounts.permissions import IsShopOwner


class QueueViewSet(viewsets.ModelViewSet):

    serializer_class = QueueSerializer
    permission_classes = [IsAuthenticated, IsShopOwner]

    def _complete_due_bookings(self):
        now = timezone.localtime()
        due = Q(booking__booking_date__lt=now.date()) | Q(
            booking__booking_date=now.date(),
            booking__booking_time__lte=now.time(),
        )

        Queue.objects.filter(
            repair_shop__owner=self.request.user,
            status="Waiting",
        ).filter(due).update(status="Completed")

        Booking.objects.filter(
            repair_shop__owner=self.request.user,
            status__in=["Pending", "Accepted", "Mechanic Assigned", "In Progress"],
        ).filter(
            Q(booking_date__lt=now.date()) | Q(
                booking_date=now.date(),
                booking_time__lte=now.time(),
            )
        ).update(status="Completed")

    def list(self, request, *args, **kwargs):
        self._complete_due_bookings()
        return super().list(request, *args, **kwargs)

    def perform_update(self, serializer):
        queue_item = serializer.save()

        if queue_item.status == "Completed":
            Booking.objects.filter(pk=queue_item.booking_id).update(
                status="Completed"
            )

    def get_queryset(self):
        return (
            Queue.objects.filter(
                repair_shop__owner=self.request.user,
                status="Waiting",
            )
            .select_related(
                "booking",
                "booking__customer",
                "booking__vehicle",
            )
            .order_by("position")
        )
