import { CarFront, Fuel, Calendar, Palette } from "lucide-react";

import { useEffect, useState } from "react";
import { getVehicles } from "../../services/vehicleService";

function VehicleCard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;
      try {
        const response = await getVehicles(token);
        setVehicles(response.data.results || response.data);
      } catch (err) {
        setVehicles([]);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          My Vehicles
        </h2>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          + Add Vehicle
        </button>

      </div>

      <div className="grid grid-cols-1 gap-6">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle.id}
            className="w-full min-w-0 border rounded-2xl p-6 hover:shadow-xl transition"
          >

            <div className="flex items-center gap-4 mb-5">

              <div className="bg-blue-100 p-4 rounded-full">
                <CarFront className="text-blue-600" size={32} />
              </div>

              <div className="min-w-0">

                <h3 className="break-words text-xl font-bold text-slate-900">
                  {vehicle.brand} {vehicle.model}
                </h3>

                <p className="break-all text-slate-600 font-medium">
                  {vehicle.registration_number}
                </p>

              </div>

            </div>

            <div className="space-y-3">

              <p className="flex items-center gap-2 text-slate-700 font-medium">
                <Fuel size={18} className="text-slate-500" />
                Fuel: {vehicle.fuel_type}
              </p>

              <p className="flex items-center gap-2 text-slate-700 font-medium">
                <Calendar size={18} className="text-slate-500" />
                Year: {vehicle.manufacturing_year}
              </p>

              <p className="flex items-center gap-2 text-slate-700 font-medium">
                <Palette size={18} className="text-slate-500" />
                Color: {vehicle.color}
              </p>

              <p className="flex items-center gap-2 text-slate-700 font-medium">
                <CarFront size={18} className="text-slate-500" />
                Type: {vehicle.vehicle_type}
              </p>

            </div>

          </div>

        ))}

        {vehicles.length === 0 && (
          <p className="text-slate-600 font-medium">No vehicles registered yet.</p>
        )}

      </div>

    </div>
  );
}

export default VehicleCard;
