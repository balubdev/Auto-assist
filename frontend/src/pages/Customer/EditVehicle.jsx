import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import {
  getVehicles,
  updateVehicle,
} from "../../services/vehicleService";

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicle_type: "",
    brand: "",
    model: "",
    registration_number: "",
    fuel_type: "Petrol",
    manufacturing_year: "",
    color: "",
  });

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await getVehicles(token);
      const vehicles = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      const vehicle = vehicles.find(
        (v) => v.id === Number(id)
      );

      if (vehicle) {
        setFormData({
          vehicle_type: vehicle.vehicle_type || "",
          brand: vehicle.brand || "",
          model: vehicle.model || "",
          registration_number: vehicle.registration_number || "",
          fuel_type: vehicle.fuel_type || "Petrol",
          manufacturing_year: vehicle.manufacturing_year || "",
          color: vehicle.color || "",
        });
      }
    } catch (error) {
      console.log(error);
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

    try {
      const token = localStorage.getItem("access");

      await updateVehicle(id, formData, token);

      alert("Vehicle Updated Successfully");

      navigate("/customer/vehicles");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              Edit Vehicle
            </h1>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Vehicle Type */}

              <input
                type="text"
                name="vehicle_type"
                placeholder="Ex: Car, Bike, Bus, Truck, Auto..."
                value={formData.vehicle_type}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              {/* Brand */}

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              {/* Model */}

              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              {/* Registration Number */}

              <input
                type="text"
                name="registration_number"
                placeholder="Registration Number"
                value={formData.registration_number}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              {/* Fuel Type */}

              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
              </select>

              {/* Manufacturing Year */}

              <input
                type="number"
                name="manufacturing_year"
                placeholder="Manufacturing Year"
                value={formData.manufacturing_year}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              {/* Color */}

              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
                className="border rounded-xl p-4 text-slate-900 placeholder:text-slate-500"
                required
              />

              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/customer/vehicles")}
                  className="px-6 py-3 rounded-xl border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
                >
                  Update Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVehicle;