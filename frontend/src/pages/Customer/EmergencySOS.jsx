import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { sendEmergency } from "../../services/emergencyService";
import { getVehicles } from "../../services/vehicleService";
import { useNavigate } from "react-router-dom";

import {
  Siren,
  MapPin,
  Phone,
  Truck,
  BatteryCharging,
} from "lucide-react";


function EmergencySOS() {

  const [sending, setSending] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await getVehicles(localStorage.getItem("access"));
        const data = response.data.results || response.data;
        const ownedVehicles = Array.isArray(data) ? data : [];
        setVehicles(ownedVehicles);
        if (ownedVehicles.length > 0) {
          setVehicleId(String(ownedVehicles[0].id));
        }
      } catch (error) {
        console.error("Unable to load vehicles:", error);
        setStatus("Unable to load your vehicles. Please try again.");
      }
    };

    loadVehicles();
  }, []);

  const getCurrentLocation = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
      () => reject(new Error("Unable to get your location. Allow location access and try again.")),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });

  const showLiveLocation = async () => {
    setStatus("");
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      setStatus("Your current location is ready.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const requestAssistance = async (problem) => {
    if (!vehicleId) {
      setStatus("Add a vehicle to your account before requesting assistance.");
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const currentLocation = await getCurrentLocation();
      await sendEmergency({
        vehicle: Number(vehicleId),
        problem,
        ...currentLocation,
      }, localStorage.getItem("access"));
      setLocation(currentLocation);
      setStatus(`${problem} request sent. Your location has been shared.`);
    } catch (error) {
      console.error("Emergency request failed:", error);
      setStatus(error.message || "Request failed. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const findMechanic = () => navigate("/customer/nearby-shops");

  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">


      <Sidebar />


      <div className="flex-1">


        <Header />



        <div className="p-8">



          <div className="bg-red-600 rounded-3xl text-white p-10 text-center shadow-xl">


            <Siren 
              size={80} 
              className="mx-auto animate-pulse" 
            />



            <h1 className="text-5xl font-bold mt-6">

              Emergency SOS

            </h1>



            <p className="mt-4 text-lg">

              Need Immediate Roadside Assistance?

            </p>

            <div className="mx-auto mt-6 max-w-sm text-left">
              <label htmlFor="emergency-vehicle" className="mb-2 block font-semibold">
                Vehicle for this request
              </label>
              <select
                id="emergency-vehicle"
                value={vehicleId}
                onChange={(event) => setVehicleId(event.target.value)}
                disabled={vehicles.length === 0 || sending}
                className="w-full rounded-xl border border-white/40 bg-white px-4 py-3 text-slate-900 disabled:opacity-70"
              >
                {vehicles.length === 0 ? (
                  <option value="">No registered vehicles</option>
                ) : vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} ({vehicle.registration_number})
                  </option>
                ))}
              </select>
            </div>




            <button

              onClick={() => requestAssistance("Emergency SOS")}

              disabled={sending || vehicles.length === 0}

              className="mt-8 bg-white text-red-600 px-12 py-5 rounded-full text-2xl font-bold hover:scale-105 transition"

            >

              {sending ? "Sending..." : "SEND SOS"}

            </button>



          </div>





          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">


            <Card
              icon={<MapPin size={35}/>}
              title="Live Location"
              color="blue"
              onClick={showLiveLocation}
            />


            <Card
              icon={<Phone size={35}/>}
              title="Find a Mechanic"
              color="green"
              onClick={findMechanic}
            />


            <Card
              icon={<Truck size={35}/>}
              title="Request Towing"
              color="orange"
              onClick={() => requestAssistance("Towing Assistance")}
            />


            <Card
              icon={<BatteryCharging size={35}/>}
              title="Battery Jump Start"
              color="purple"
              onClick={() => requestAssistance("Battery Jump Start")}
            />


          </div>

          {(status || location) && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm" role="status" aria-live="polite">
              {status && <p className="font-medium">{status}</p>}
              {location && (
                <a
                  className="mt-2 inline-flex font-semibold text-blue-700 underline"
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open my location in Maps
                </a>
              )}
            </div>
          )}





        </div>


      </div>


    </div>

  );

}




function Card({icon,title,color,onClick}) {


  const colors = {

    blue:"bg-blue-600",
    green:"bg-green-600",
    orange:"bg-orange-500",
    purple:"bg-purple-600",

  };



  return (

    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
    >


      <div
        className={`${colors[color]} text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto`}
      >

        {icon}

      </div>



      <h3 className="text-xl font-bold mt-6">

        {title}

      </h3>


    </button>

  );

}



export default EmergencySOS;