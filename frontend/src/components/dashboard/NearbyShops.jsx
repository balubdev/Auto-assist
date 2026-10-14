import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import axios from "axios";

function NearbyShops() {

  const [shops, setShops] = useState([]);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("GPS location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const token = localStorage.getItem("access");
          const res = await axios.get(
            "http://127.0.0.1:8000/api/repairshops/nearby/",
            {
              params: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = Array.isArray(res.data)
            ? res.data
            : res.data.results || [];
          setShops(data);
          setLocationError("");
        } catch (error) {
          console.error("Nearby Shop Error:", error);
          setLocationError("Unable to load nearby repair shops.");
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        setLocationError("Allow location access to see accurate distances.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );

  }, []);
  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-8">
        Nearby Repair Shops
      </h2>

      {locationError ? (
        <div className="text-slate-600 font-medium text-center py-10">
          {locationError}
        </div>
      ) : shops.length === 0 ? (

        <div className="text-slate-600 font-medium text-center py-10">
          No Nearby Repair Shops Found
        </div>


      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


          {shops.map((shop,index)=>(


            <div
              key={shop.id || index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img

                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600"

                alt="repair shop"

                className="w-full h-52 object-cover"

              />
              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {shop.shop_name || "Repair Shop"}
                </h3>



                <div className="flex items-center text-slate-600 mt-3">

                  <MapPin size={18}/>

                  <span className="ml-2">
                    {shop.city || "Location"}
                  </span>

                </div>

                <div className="flex justify-between mt-5">


                  <div className="flex items-center text-yellow-500">

                    <Star size={18} fill="currentColor"/>

                    <span className="ml-2">
                      {shop.average_rating || 0}
                    </span>

                  </div>

                  <span className="text-blue-600 font-semibold">

                    {shop.distance_km !== undefined && shop.distance_km !== null
                      ? `${Number(shop.distance_km).toFixed(2)} km`
                      : "--"}

                  </span>

                </div>

                <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl">

                  Book Now

                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>

  );

}
export default NearbyShops;