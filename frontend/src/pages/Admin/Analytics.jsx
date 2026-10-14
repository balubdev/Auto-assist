import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";


function Analytics() {


  const [data, setData] = useState({
    users:0,
    shops:0,
    bookings:0,
    reviews:0,
    revenue:0,
    pending:0,
    completed:0
  });


  const token = localStorage.getItem("access");



  useEffect(()=>{

    fetchAnalytics();

  },[]);



  const fetchAnalytics = async()=>{

    try{

      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

console.log(response.data);
setData({
  users: response.data.total_users,
  shops: response.data.total_shops,
  bookings: response.data.total_bookings,
  reviews: response.data.total_reviews,
  pending: response.data.pending_services,
  completed: response.data.completed_services
});

    }catch(error){

      console.log(error);

    }

  };



  return (

    <div className="flex">


      <AdminSidebar />


      <div className="flex-1 bg-gray-100 min-h-screen text-slate-900">


        <AdminHeader />


        <div className="p-8">


          <h1 className="text-3xl font-bold mb-6">
            Analytics Dashboard
          </h1>



          <div className="grid grid-cols-4 gap-6">


            <Card 
              title="Total Users"
              value={data.users}
            />


            <Card 
              title="Repair Shops"
              value={data.shops}
            />


            <Card 
              title="Bookings"
              value={data.bookings}
            />


            <Card 
              title="Reviews"
              value={data.reviews}
            />

            <Card 
              title="Pending"
              value={data.pending}
            />

            <Card 
              title="Completed"
              value={data.completed}
            />

          </div>


        </div>


      </div>


    </div>

  );

}



function Card({title,value}){

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-slate-600 font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>

  );

}
export default Analytics;