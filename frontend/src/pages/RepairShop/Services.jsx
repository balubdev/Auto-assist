import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";

import { Plus, Trash2, Edit } from "lucide-react";


function Services() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    service_name:"",
    description:"",
    price:"",
    duration:"",
    is_available:true
  });



  const fetchServices = async()=>{

    try{

      const token = localStorage.getItem("access");

      const response = await API.get(
        "repairshops/services/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setServices(
        response.data.results || response.data
      );


    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchServices();

  },[]);




  const saveService = async()=>{

    if (!form.service_name.trim() || !form.price || !form.duration.trim()) {
      alert("Enter a service name, price, and duration.");
      return;
    }

    try{

      const token = localStorage.getItem("access");


      if(editId){

        await API.put(
          `repairshops/services/${editId}/`,
          form,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

      }else{

        await API.post(
          "repairshops/services/",
          form,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

      }


      resetForm();

      fetchServices();


    }catch(error){

      const details = error.response?.data;
      console.log(details || error);
      if (error.response?.status >= 500 || details?.repair_shop) {
        alert("Create your Shop Profile before adding services.");
        navigate("/repairshop/profile");
        return;
      }
      alert(`Unable to save service: ${JSON.stringify(details || "Please try again.")}`);

    }

  };




  const deleteService = async(id)=>{

    const token = localStorage.getItem("access");


    await API.delete(
      `repairshops/services/${id}/`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    fetchServices();

  };




  const resetForm=()=>{

    setForm({
      service_name:"",
      description:"",
      price:"",
      duration:"",
      is_available:true
    });

    setEditId(null);

  };



return(

<div className="flex min-h-screen bg-gray-100 text-slate-900">

<RepairShopSidebar />

<div className="flex-1">

<Header />


<div className="p-8">


<h1 className="text-3xl font-bold mb-6">
Service Management
</h1>



<div className="bg-white p-6 rounded-3xl shadow mb-8">


<input
className="border p-3 rounded w-full mb-3 text-slate-900 placeholder:text-slate-500"
placeholder="Service Name"
value={form.service_name}
onChange={(e)=>setForm({...form,service_name:e.target.value})}
/>


<textarea
className="border p-3 rounded w-full mb-3 text-slate-900 placeholder:text-slate-500"
placeholder="Description"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>


<input
className="border p-3 rounded w-full mb-3 text-slate-900 placeholder:text-slate-500"
placeholder="Price"
value={form.price}
onChange={(e)=>setForm({...form,price:e.target.value})}
/>


<input
className="border p-3 rounded w-full mb-3 text-slate-900 placeholder:text-slate-500"
placeholder="Duration"
value={form.duration}
onChange={(e)=>setForm({...form,duration:e.target.value})}
/>



<button
onClick={saveService}
className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2"
>

<Plus size={20}/>

{
editId ? "Update Service":"Add Service"
}

</button>


</div>




<div className="bg-white p-6 rounded-3xl shadow">


{
services.map((service)=>(


<div
key={service.id}
className="border-b py-4 flex justify-between"
>


<div>

<h2 className="font-bold">
{service.service_name}
</h2>

<p>
₹ {service.price}
</p>

<p>
{service.duration}
</p>

</div>



<div className="flex gap-2">


<button
onClick={()=>{
setEditId(service.id);
setForm(service);
}}
className="bg-green-600 text-white p-2 rounded"
>

<Edit size={18}/>

</button>



<button
onClick={()=>deleteService(service.id)}
className="bg-red-600 text-white p-2 rounded"
>

<Trash2 size={18}/>

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


export default Services;
