import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";
import API from "../../services/api";

import {
  CalendarDays,
  Clock,
  Users,
  Star,
} from "lucide-react";


function Dashboard() {

  const [stats, setStats] = useState({
    total_bookings: 0,
    pending: 0,
    completed: 0,
    mechanics: 0,
    rating: 0,
  });


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem("access");

        const response = await API.get(
          "repairshops/owner/dashboard/",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        setStats(response.data);

      } catch(error){

        console.log(error);

      }

    };


    fetchDashboard();

  }, []);



  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">


      <RepairShopSidebar />


      <div className="flex-1">


        <Header />


        <main className="p-8">


          <h1 className="text-4xl font-bold mb-8">
            Repair Shop Dashboard
          </h1>



          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">


            <Card
              title="Total Bookings"
              value={stats.total_bookings}
              icon={<CalendarDays size={32}/>}
              color="bg-blue-600"
              to="/repairshop/bookings"
            />


            <Card
              title="Pending Bookings"
              value={stats.pending}
              icon={<Clock size={32}/>}
              color="bg-orange-500"
              to="/repairshop/queue"
            />


            <Card
              title="Completed Services"
              value={stats.completed}
              icon={<Users size={32}/>}
              color="bg-green-600"
              to="/repairshop/bookings?status=completed"
            />


            <Card
              title="Average Rating"
              value={stats.rating}
              icon={<Star size={32}/>}
              color="bg-yellow-500"
              to="/repairshop/reviews"
            />


          </div>

          {/* Recent Bookings */}

<div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-5">
    Recent Bookings
  </h2>

  <div className="border rounded-xl p-4 font-medium text-slate-600">
    No recent bookings available
  </div>

</div>



{/* Quick Actions */}

<div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-5">
    Quick Actions
  </h2>


  <div className="grid md:grid-cols-3 gap-5">


    <Link
      to="/repairshop/mechanics"
      className="bg-blue-600 text-center text-white p-4 rounded-xl hover:bg-blue-700"
    >
      Add Mechanic
    </Link>


    <Link
      to="/repairshop/services"
      className="bg-green-600 text-center text-white p-4 rounded-xl hover:bg-green-700"
    >
      Add Service
    </Link>


    <Link
      to="/repairshop/profile"
      className="bg-purple-600 text-center text-white p-4 rounded-xl hover:bg-purple-700"
    >
      Edit Shop Profile
    </Link>


  </div>

</div>



        </main>


      </div>


    </div>

  );

}




function Card({
  title,
  value,
  icon,
  color,
  to,
}) {


return (

<Link
  to={to}
  className="block rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
  aria-label={`View ${title}`}
>
<div className="bg-white rounded-3xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-2xl">


<div className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white`}>

{icon}

</div>

<h2 className="text-slate-600 font-semibold mt-5">
{title}
</h2>


<h1 className="text-4xl font-bold mt-2 text-slate-900">
{value}
</h1>


</div>

</Link>

);


}


export default Dashboard;
