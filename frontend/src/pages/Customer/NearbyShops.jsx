
import { useEffect, useState } from "react";
import { MapPin, Star, Navigation } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NearbyShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getNearbyShops();
  }, []);

  const getNearbyShops = () => {
    setLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "GPS location is not supported by this browser."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({
            latitude,
            longitude,
            accuracy: position.coords.accuracy,
          });

          console.log("Customer Latitude:", latitude);
          console.log("Customer Longitude:", longitude);

          const token = localStorage.getItem("access");

          const response = await axios.get(
            "http://127.0.0.1:8000/api/repairshops/nearby/",
            {
              params: {
                lat: latitude,
                lng: longitude,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Nearby Shops:", response.data);

          const shopData = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];

          setShops(shopData);
          setLocationError("");
        } catch (error) {
          console.error("Nearby Shops API Error:", error);

          setLocationError(
            "Unable to load nearby repair shops."
          );
        } finally {
          setLoading(false);
        }
      },

      (error) => {
        console.error("GPS Error:", error);
        setUserLocation(null);

        if (error.code === 1) {
          setLocationError(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Unable to detect your current location."
          );
        } else if (error.code === 3) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to get your current location."
          );
        }

        setLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleBookNow = (shop) => {
    navigate("/customer/book-service", {
      state: {
        shopId: shop.id,
        shopName: shop.shop_name,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 text-slate-900">

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Navigation size={28} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Repair Shops
          </h2>
        </div>
        <button
          type="button"
          onClick={getNearbyShops}
          disabled={loading}
          className="rounded-lg border border-blue-700 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Finding location..." : "Refresh live location"}
        </button>
      </div>

      {userLocation && (
        <p className="mb-6 text-sm text-slate-600" aria-live="polite">
          Using your live location (accuracy ±{Math.round(userLocation.accuracy)} m):{" "}
          {userLocation.latitude.toFixed(5)}, {userLocation.longitude.toFixed(5)}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">

          <Navigation
            size={40}
            className="mx-auto text-blue-600 mb-4 animate-pulse"
          />

          <p className="text-lg font-semibold text-gray-700">
            Finding nearby repair shops...
          </p>

          <p className="text-sm text-slate-600 mt-2">
            Please allow location access.
          </p>

        </div>
      )}

      {/* Location Error */}
      {!loading && locationError && (
        <div className="text-center py-12">

          <MapPin
            size={45}
            className="mx-auto text-red-500 mb-4"
          />

          <p className="text-red-500 font-semibold">
            {locationError}
          </p>

          <button
            onClick={() => {
              setLoading(true);
              setLocationError("");
              getNearbyShops();
            }}
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>
      )}

      {/* No Shops */}
      {!loading &&
        !locationError &&
        shops.length === 0 && (
          <div className="text-center py-12">

            <MapPin
              size={45}
              className="mx-auto text-slate-500 mb-4"
            />

            <p className="text-slate-600">
              No nearby repair shops found.
            </p>

          </div>
        )}

      {/* Shops */}
      {!loading &&
        !locationError &&
        shops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition"
              >

                {/* Shop Image */}
                <img
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600"
                  alt="Repair Shop"
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">

                  {/* Shop Name */}
                  <h3 className="text-xl font-bold text-gray-800">
                    {shop.shop_name || "Repair Shop"}
                  </h3>

                  {/* City */}
                  <div className="flex items-center gap-2 mt-3 text-slate-600">

                    <MapPin size={18} />

                    <span>
                      {shop.city || "Location unavailable"}
                    </span>

                  </div>

                  {/* Rating and Distance */}
                  <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center gap-2 text-yellow-500">

                      <Star
                        size={18}
                        fill="currentColor"
                      />

                      <span>
                        {shop.rating !== undefined
                          ? shop.rating
                          : "0"}
                      </span>

                    </div>

                    <div className="text-blue-600 font-semibold">

                      {shop.distance_km !== undefined
                        ? `${Number(shop.distance_km).toFixed(2)} km`
                        : "--"}

                    </div>

                  </div>

                  {shop.latitude !== undefined && shop.longitude !== undefined && (
                    <a
                      className="mt-3 inline-flex text-sm font-medium text-blue-700 underline"
                      href={`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Verify shop location on map
                    </a>
                  )}

                  {/* Book Button */}
                  <button
                    onClick={() => handleBookNow(shop)}
                    className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
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

