import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import {
  CarFront,
  Fuel,
  Calendar,
  Palette,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  getVehicles,
  deleteVehicle,
} from "../../services/vehicleService";


function MyVehicles() {

  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {
    fetchVehicles();
  }, []);



  const fetchVehicles = async () => {

    try {

      const token = localStorage.getItem("access");

      const response = await getVehicles(token);

      // FIX: pagination response handling
      setVehicles(response.data.results || response.data);


    } catch (error) {

      console.log(error);

    }

  };





  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );


    if (!confirmDelete) return;



    try {

      const token = localStorage.getItem("access");


      await deleteVehicle(id, token);


      alert("Vehicle deleted successfully!");


      fetchVehicles();


    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };





  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">


      <Sidebar />



      <div className="flex-1">


        <Header />



        <div className="p-8">


          <div className="flex justify-between items-center mb-8">


            <div>

              <h1 className="text-4xl font-bold">
                My Vehicles
              </h1>


              <p className="text-slate-600 mt-2">
                Manage all your registered vehicles.
              </p>


            </div>




            <button

              onClick={() =>
                navigate("/customer/vehicles/add")
              }

              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"

            >

              + Add Vehicle

            </button>


          </div>





          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">


            {vehicles.map((vehicle) => (


              <div

                key={vehicle.id}

                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"

              >



                <div className="flex justify-between">


                  <div className="bg-blue-100 p-4 rounded-full">

                    <CarFront
                      className="text-blue-600"
                      size={32}
                    />

                  </div>





                  <div className="flex gap-3">


                    <button

                      onClick={() =>
                        navigate(
                          `/customer/vehicles/edit/${vehicle.id}`
                        )
                      }

                    >

                      <Pencil className="text-blue-600 hover:text-blue-800" />

                    </button>





                    <button

                      onClick={() =>
                        handleDelete(vehicle.id)
                      }

                    >

                      <Trash2 className="text-red-600 hover:text-red-800" />

                    </button>



                  </div>



                </div>






                <h2 className="text-2xl font-bold mt-6">

                  {vehicle.brand} {vehicle.model}

                </h2>



                <p className="text-slate-600">

                  {vehicle.registration_number}

                </p>





                <div className="space-y-3 mt-6">


                  <p className="flex items-center gap-2">

                    <CarFront size={18} />

                    {vehicle.vehicle_type}

                  </p>




                  <p className="flex items-center gap-2">

                    <Fuel size={18} />

                    {vehicle.fuel_type}

                  </p>





                  <p className="flex items-center gap-2">

                    <Calendar size={18} />

                    {vehicle.manufacturing_year}

                  </p>





                  <p className="flex items-center gap-2">

                    <Palette size={18} />

                    {vehicle.color}

                  </p>



                </div>



              </div>


            ))}



          </div>



        </div>



      </div>



    </div>

  );

}



export default MyVehicles;