import { useEffect, useState } from "react";
import API from "../../services/api";

import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";


function Bookings() {

  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const token = localStorage.getItem("access");

        const response = await API.get(
          "repairshops/owner/bookings/",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        setBookings(response.data);

      } catch(error){

        console.log(error);

      }

    };


    fetchBookings();

  }, []);



  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <RepairShopSidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Booking Management
          </h1>


          <div className="bg-white rounded-2xl shadow p-6">


            {bookings.length === 0 ? (

              <p className="text-slate-600">
                No bookings available
              </p>

            ) : (


              bookings.map((booking)=>(

                <div
                  key={booking.booking_id}
                  className="border-b py-4"
                >

                  <h2 className="font-bold">
                    {booking.booking_id}
                  </h2>

                  <p>
                    Customer: {booking.customer}
                  </p>

                  <p>
                    Vehicle: {booking.vehicle}
                  </p>

                  <p>
                    Status: {booking.status}
                  </p>


                </div>

              ))

            )}


          </div>


        </div>

      </div>

    </div>

  );

}


export default Bookings;