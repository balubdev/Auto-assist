import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function Bookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await API.get("bookings/admin/bookings/");

      const data = res.data.results || res.data;

      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = bookings.filter((booking) =>
      booking.booking_id
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredBookings(filtered);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Booking Management
        </h1>

        <input
          type="text"
          placeholder="Search Booking ID..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded-lg p-2 mb-5 w-80 text-slate-900 placeholder:text-slate-500"
        />

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">

              <tr>
                <th className="p-3">Booking ID</th>
                <th>Customer</th>
                <th>Repair Shop</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (

                filteredBookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b text-center hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {booking.booking_id}
                    </td>

                    <td>
                      {booking.customer}
                    </td>

                    <td>
                      {booking.repair_shop}
                    </td>

                    <td>
                      {booking.booking_date}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm text-white
                        ${
                          booking.status === "Completed"
                            ? "bg-green-600"
                            : booking.status === "Accepted"
                            ? "bg-blue-600"
                            : booking.status === "Cancelled"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          navigate(`/admin/bookings/${booking.id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-6 text-slate-600"
                  >
                    No Bookings Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Bookings;