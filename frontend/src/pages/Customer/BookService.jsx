import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import { getVehicles } from "../../services/vehicleService";
import { getRepairShops } from "../../services/repairShopService";
import { addBooking } from "../../services/bookingService";

function BookService() {

  const navigate = useNavigate();
  const location = useLocation();
const selectedShopId = Number(location.state?.shopId) || "";
  const [vehicles, setVehicles] = useState([]);
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const filteredShops = shops.filter((shop) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    const searchableText = [
      shop.shop_name,
      shop.city,
      shop.state,
      shop.address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  const [formData, setFormData] = useState({
    vehicle: "",
    repair_shop: "",
    booking_date: "",
    booking_time: "",
    problem_description: "",
  });

 useEffect(() => {
  loadData();
}, [selectedShopId]);

  const loadData = async () => {
  try {
    const token = localStorage.getItem("access");

    const vehicleResponse = await getVehicles(token);

    setVehicles(
      Array.isArray(vehicleResponse.data)
        ? vehicleResponse.data
        : vehicleResponse.data.results || []
    );


    const shopResponse = await getRepairShops(token);

    setShops(
      Array.isArray(shopResponse.data)
        ? shopResponse.data
        : shopResponse.data.results || []
    );
    if (selectedShopId) {
  setFormData((prev) => ({
    ...prev,
    repair_shop: selectedShopId,
  }));
}


  } catch (error) {
    console.error(error);
    alert("Failed to load data.");
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected Shop ID:", formData.repair_shop);

    if (
      !formData.vehicle ||
      !formData.repair_shop ||
      !formData.booking_date ||
      !formData.booking_time ||
      !formData.problem_description
    ) {
      alert("please enter valid details");
      return;
    }

    // Client-side: prevent selecting past date/time
    try {
      const selected = new Date(`${formData.booking_date}T${formData.booking_time}`);
      const now = new Date();
      if (isNaN(selected.getTime()) || selected < now) {
        alert("please enter valid details");
        return;
      }
    } catch (err) {
      alert("please enter valid details");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("access");

      await addBooking(
        {
          vehicle: Number(formData.vehicle),
          repair_shop: Number(formData.repair_shop),
          booking_date: formData.booking_date,
          booking_time: formData.booking_time,
          problem_description: formData.problem_description,
        },
        token
      );

      alert("Booking Created Successfully");

      navigate("/customer/booking-history");

    } catch (error) {

      console.error(error);

      if (error.response?.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Booking Failed");
      }

    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold mb-2">
              Book Service
            </h1>

            <p className="text-slate-600 mb-8">
              Schedule a service for your vehicle.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6"
            >

              {/* Vehicle */}

              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="border rounded-xl p-4"
              >
                <option value="">
                  Select Vehicle
                </option>

                {vehicles.map((vehicle) => (
                  <option
                    key={vehicle.id}
                    value={vehicle.id}
                  >
                    {vehicle.brand} {vehicle.model} (
                    {vehicle.registration_number})
                  </option>
                ))}

              </select>

              {/* Repair Shop */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Search by location or shop name
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter city, area, or repair shop name"
                  className="w-full border rounded-xl p-4"
                />
              </div>

              <select
                name="repair_shop"
                value={formData.repair_shop}
                onChange={handleChange}
                className="border rounded-xl p-4 md:col-span-2"
              >
                <option value="">
                  {filteredShops.length > 0
                    ? "Select Repair Shop"
                    : "No repair shops match this location"}
                </option>

                {filteredShops.map((shop) => (
                  <option
                    key={shop.id}
                    value={shop.id}
                  >
                    {shop.shop_name} - {shop.city || "Location not specified"}
                  </option>
                ))}

              </select>

              {/* Booking Date */}

              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              {/* Booking Time */}

              <label
                htmlFor="booking-time"
                className="block text-sm font-medium text-slate-700"
              >
                Select time
                <input
                  id="booking-time"
                  type="time"
                  name="booking_time"
                  value={formData.booking_time}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl p-4"
                />
              </label>

              {/* Problem */}

              <textarea
                rows="6"
                name="problem_description"
                value={formData.problem_description}
                onChange={handleChange}
                placeholder="Describe your vehicle problem..."
                className="border rounded-xl p-4 md:col-span-2"
              />

              <div className="md:col-span-2 flex justify-end">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
                >
                  {loading
                    ? "Booking..."
                    : "Book Service"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookService;