from django.core.mail import send_mail
from django.conf import settings


def send_booking_confirmation(email, booking_id):

    subject = "Booking Confirmed"

    message = f"""
Hello,

Your booking has been created successfully.

Booking ID : {booking_id}

Thank you for using AutoAssist.
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

def send_status_update(email, booking_id, status):

    subject = f"Booking Status Updated - {status}"

    message = f"""
Hello,

Your booking status has been updated.

Booking ID : {booking_id}

Current Status : {status}

Thank you for using AutoAssist.
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )