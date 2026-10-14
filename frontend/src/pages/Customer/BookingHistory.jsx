import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import {
  Calendar,
  Car,
  Clock,
  Eye,
  Trash2,
} from "lucide-react";

import {
  getBookings,
  deleteBooking,
} from "../../services/bookingService";

function BookingHistory() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("access");

    const response = await getBookings(token);

    setBookings(
      Array.isArray(response.data)
        ? response.data
        : response.data.results || []
    );

  } catch (error) {
    console.log(error);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const token = localStorage.getItem("access");

      await deleteBooking(id, token);

      alert("Booking Cancelled");

      fetchBookings();

    } catch (error) {
      console.log(error);
      alert("Unable to cancel booking.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Booking History
          </h1>

          <div className="space-y-6">

            {bookings.length === 0 && (
              <div className="bg-white rounded-3xl p-10 text-center shadow">
                No bookings found.
              </div>
            )}

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-lg p-8"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {booking.booking_id}
                    </h2>

                    <div className="space-y-3 mt-5">

                      <p className="flex gap-2">
                        <Car size={18} />
                        Vehicle ID : {booking.vehicle}
                      </p>

                      <p className="flex gap-2">
                        <Calendar size={18} />
                        {booking.booking_date}
                      </p>

                      <p className="flex gap-2">
                        <Clock size={18} />
                        {booking.booking_time}
                      </p>

                      <p>
                        <strong>Problem :</strong><br />
                        {booking.problem_description}
                      </p>

                    </div>

                  </div>

                  <div>

                    <span
                      className={`px-5 py-2 rounded-full text-white ${
                        booking.status === "Completed"
                          ? "bg-green-600"
                          : booking.status === "Cancelled"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

                <div className="flex gap-4 mt-8">

                  <button
                    onClick={() =>
                      navigate(`/customer/booking/${booking.id}`)
                    }
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <Eye size={18} />
                    View
                  </button>

                  {booking.status !== "Completed" &&
                    booking.status !== "Cancelled" && (
                      <button
                        onClick={() =>
                          handleDelete(booking.id)
                        }
                        className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Cancel
                      </button>
                    )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingHistory;