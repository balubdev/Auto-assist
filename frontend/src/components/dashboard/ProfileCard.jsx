import { useEffect, useState } from "react";
import { Mail, Phone, CarFront, CalendarCheck } from "lucide-react";
import axios from "axios";

import { getVehicles } from "../../services/vehicleService";
import { getBookings } from "../../services/bookingService";


function ProfileCard() {

  const [profile, setProfile] = useState({});
  const [vehicleCount, setVehicleCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);


  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("access");


        const profileRes = await axios.get(
          "http://127.0.0.1:8000/api/accounts/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        setProfile(profileRes.data);



        const vehicleRes = await getVehicles(token);

        setVehicleCount(
          Array.isArray(vehicleRes.data)
            ? vehicleRes.data.length
            : 0
        );



        const bookingRes = await getBookings(token);

        setBookingCount(
          Array.isArray(bookingRes.data)
            ? bookingRes.data.length
            : 0
        );


      } catch (err) {

        console.error(
          "Profile Error:",
          err.response?.data || err
        );

      }

    };


    fetchData();

  }, []);



  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">


      <div className="flex flex-col md:flex-row items-center gap-8">


        <img

          src={
            `https://ui-avatars.com/api/?name=${
              profile.username || "User"
            }`
          }

          alt="Profile"

          className="w-28 h-28 rounded-full border-4 border-blue-500"

        />



        <div className="flex-1">


          <h2 className="text-3xl font-bold text-slate-900">

            {profile.username || "User"}

          </h2>



          <p className="text-slate-600 capitalize font-medium">

            {profile.role || "Customer"}

          </p>




          <div className="grid md:grid-cols-2 gap-4 mt-6">


            <p className="flex items-center gap-2 text-slate-700 font-medium">

              <Mail size={18} className="text-slate-500" />

              {profile.email || "Not Available"}

            </p>




            <p className="flex items-center gap-2 text-slate-700 font-medium">

              <Phone size={18} className="text-slate-500" />

              {profile.phone || "Not Available"}

            </p>




            <p className="flex items-center gap-2 text-slate-700 font-medium">

              <CarFront size={18} className="text-slate-500" />

              Vehicles : {vehicleCount}

            </p>




            <p className="flex items-center gap-2 text-slate-700 font-medium">

              <CalendarCheck size={18} className="text-slate-500" />

              Bookings : {bookingCount}

            </p>



          </div>


        </div>


      </div>


    </div>

  );

}


export default ProfileCard;