import { useEffect, useState } from "react";
import { getBookings } from "../../services/bookingService";

function RecentBookings() {

  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const token = localStorage.getItem("access");

        const res = await getBookings(token);

        const data = res.data.results || res.data;

        setBookings(
          Array.isArray(data) ? data : []
        );


      } catch (err) {

        console.error(err);

      }

    };


    fetchBookings();

  }, []);




  const statusColor = (status) => {

    if (status === "Completed")
      return "bg-green-100 text-green-700";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";

  };




  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">


      <h2 className="text-2xl font-bold mb-6 text-slate-900">
        Recent Bookings
      </h2>



      <div className="overflow-x-auto">


        <table className="w-full">


          <thead>

            <tr className="border-b">

              <th className="text-left py-4 text-slate-700 font-semibold">
                Booking ID
              </th>

              <th className="text-left text-slate-700 font-semibold">
                Vehicle
              </th>

              <th className="text-left text-slate-700 font-semibold">
                Service
              </th>

              <th className="text-left text-slate-700 font-semibold">
                Shop
              </th>

              <th className="text-left text-slate-700 font-semibold">
                Date
              </th>

              <th className="text-left text-slate-700 font-semibold">
                Status
              </th>

            </tr>

          </thead>



          <tbody>


            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >


                <td className="py-5 text-slate-700 font-medium">
                  {booking.booking_id}
                </td>


                <td className="text-slate-700 font-medium">
                  {booking.vehicle}
                </td>


                <td className="text-slate-700 font-medium">
                  {booking.service}
                </td>


                <td className="text-slate-700 font-medium">
                  {booking.repair_shop}
                </td>


                <td className="text-slate-700 font-medium">
                  {booking.booking_date}
                </td>


                <td>

                  <span
                    className={`px-4 py-2 rounded-full ${statusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </td>


              </tr>

            ))}



            {bookings.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-6 text-slate-600 font-medium"
                >
                  No Recent Bookings
                </td>

              </tr>

            )}


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default RecentBookings;