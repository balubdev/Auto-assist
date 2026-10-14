import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";

import { UserPlus, Trash2, Edit } from "lucide-react";

function Mechanics() {

  const navigate = useNavigate();

  const [mechanics, setMechanics] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    specialization: "",
    experience: "",
    status: "Available"
  });

  const fetchMechanics = async () => {

    try {

      const token = localStorage.getItem("access");

      const response = await API.get(
        "repairshops/mechanics/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMechanics(
        response.data.results || response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMechanics();

  }, []);

  const addMechanic = async () => {

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.specialization.trim() ||
      form.experience === ""
    ) {
      alert("Enter the mechanic's name, phone, specialization, and experience.");
      return;
    }

    try {

      const token = localStorage.getItem("access");

      await API.post(
        "repairshops/mechanics/",
        {
          ...form,
          experience: Number(form.experience),
          status: "Available"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      resetForm();

      fetchMechanics();

    } catch (error) {

      const details = error.response?.data;
      console.log(details || error);
      if (error.response?.status >= 500 || details?.repair_shop) {
        alert("Create your Shop Profile before adding mechanics.");
        navigate("/repairshop/profile");
        return;
      }
      alert(`Unable to add mechanic: ${JSON.stringify(details || "Please try again.")}`);

    }

  };

  const updateMechanic = async () => {

    try {

      const token = localStorage.getItem("access");

      await API.put(
        `repairshops/mechanics/${editId}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      resetForm();

      fetchMechanics();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteMechanic = async (id) => {

    try {

      const token = localStorage.getItem("access");

      await API.delete(
        `repairshops/mechanics/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchMechanics();

    } catch (error) {

      console.log(error);

    }

  };

  const resetForm = () => {

    setForm({
      name: "",
      phone: "",
      specialization: "",
      experience: "",
      status: "Available"
    });

    setEditId(null);

  };

  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <RepairShopSidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Mechanic Management
          </h1>

          <div className="bg-white p-6 rounded-3xl shadow mb-8">

            <h2 className="text-xl font-bold mb-4">

              {
                editId
                  ? "Update Mechanic"
                  : "Add Mechanic"
              }

            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="border p-3 rounded text-slate-900 placeholder:text-slate-500"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

              <input
                className="border p-3 rounded text-slate-900 placeholder:text-slate-500"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
              />

              <input
                className="border p-3 rounded text-slate-900 placeholder:text-slate-500"
                placeholder="Specialization"
                value={form.specialization}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialization: e.target.value
                  })
                }
              />

              <input
                className="border p-3 rounded text-slate-900 placeholder:text-slate-500"
                placeholder="Experience"
                type="number"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value
                  })
                }
              />

            </div>

            <button
              onClick={
                editId
                  ? updateMechanic
                  : addMechanic
              }
              className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2"
            >

              <UserPlus size={20} />

              {
                editId
                  ? "Update Mechanic"
                  : "Add Mechanic"
              }

            </button>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Mechanics List
            </h2>

            {
              mechanics.map((mechanic) => (

                <div
                  key={mechanic.id}
                  className="border-b py-4 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold">
                      {mechanic.name}
                    </h3>

                    <p>
                      {mechanic.specialization}
                    </p>

                    <p>
                      Experience: {mechanic.experience} years
                    </p>

                    <p>
                      Status: {mechanic.status}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => {

                        setEditId(mechanic.id);
                        setForm(mechanic);

                      }}
                      className="bg-green-600 text-white p-3 rounded-xl"
                    >

                      <Edit size={20} />

                    </button>

                    <button
                      onClick={() =>
                        deleteMechanic(mechanic.id)
                      }
                      className="bg-red-600 text-white p-3 rounded-xl"
                    >

                      <Trash2 size={20} />

                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default Mechanics;
