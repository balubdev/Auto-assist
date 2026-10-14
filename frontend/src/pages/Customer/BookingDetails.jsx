import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import { getBookings } from "../../services/bookingService";


function BookingDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);


  useEffect(() => {
    fetchBooking();
  }, []);



  const fetchBooking = async () => {

    try {

      const token = localStorage.getItem("access");

      const response = await getBookings(token);


      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];


      const selected = data.find(
        (item) => item.id === Number(id)
      );


      setBooking(selected);


    } catch (error) {

      console.log(error);

    }

  };



  if (!booking) {

    return (

      <div className="flex min-h-screen bg-gray-100 text-slate-900">

        <Sidebar />

        <div className="flex-1">

          <Header />

          <div className="p-10">
            Loading...
          </div>

        </div>

      </div>

    );

  }



  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">


      <Sidebar />


      <div className="flex-1">


        <Header />


        <div className="p-8">


          <div className="bg-white rounded-3xl shadow-xl p-10">


            <h1 className="text-4xl font-bold mb-8">
              Booking Details
            </h1>



            <div className="space-y-5">


              <p>
                <strong>Booking ID :</strong> {booking.booking_id}
              </p>


              <p>
                <strong>Vehicle :</strong> {booking.vehicle}
              </p>


              <p>
                <strong>Repair Shop :</strong> {booking.repair_shop}
              </p>


              <p>
                <strong>Date :</strong> {booking.booking_date}
              </p>


              <p>
                <strong>Time :</strong> {booking.booking_time}
              </p>


              <p>
                <strong>Status :</strong> {booking.status}
              </p>


              <p>
                <strong>Problem :</strong>
                <br />
                {booking.problem_description}
              </p>


            </div>



            <button

              onClick={() => navigate(-1)}

              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"

            >
              Back
            </button>



          </div>


        </div>


      </div>


    </div>

  );

}


export default BookingDetails;