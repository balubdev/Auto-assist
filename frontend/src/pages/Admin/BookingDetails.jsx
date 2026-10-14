import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function BookingDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadBooking();

  }, []);


  const loadBooking = async () => {

    try {

      const res = await API.get(
        `bookings/admin/bookings/${id}/`
      );

      setBooking(res.data);


    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (

      <div className="p-10 text-xl">

        Loading...

      </div>

    );

  }


  if (!booking) {

    return (

      <div className="p-10 text-red-600">

        Booking Not Found

      </div>

    );

  }
    return (

    <div className="flex min-h-screen bg-slate-100 text-slate-900">

      <AdminSidebar />

      <div className="flex-1 p-8">

        <button
          onClick={() => navigate("/admin/bookings")}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Booking Details
          </h1>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="font-semibold">
                Booking ID
              </label>

              <p className="mt-1">
                {booking.booking_id}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Customer
              </label>

              <p className="mt-1">
                {booking.customer}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Vehicle
              </label>

              <p className="mt-1">
                {booking.vehicle}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Repair Shop
              </label>

              <p className="mt-1">
                {booking.repair_shop}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Booking Date
              </label>

              <p className="mt-1">
                {booking.booking_date}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Booking Time
              </label>

              <p className="mt-1">
                {booking.booking_time}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Estimated Cost
              </label>

              <p className="mt-1">
                ₹ {booking.estimated_cost}
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Queue Number
              </label>

              <p className="mt-1">
                {booking.queue_number}
              </p>
            </div>

            <div className="col-span-2">
              <label className="font-semibold">
                Problem Description
              </label>

              <p className="mt-1 border rounded p-3 bg-gray-50">
                {booking.problem_description}
              </p>
            </div>

            <div className="col-span-2">

              <label className="font-semibold">
                Booking Status
              </label>

              <p className="mt-2 rounded-lg border bg-gray-50 p-3">
                {booking.status}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default BookingDetails;