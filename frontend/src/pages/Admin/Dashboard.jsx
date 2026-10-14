import { useEffect, useState } from "react";

import {
  Users,
  Wrench,
  Calendar,
  AlertTriangle,
  Star,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link } from "react-router-dom";

import { getAdminDashboard } from "../../services/adminService";
import BookingChart from "../../components/admin/BookingChart";


function Dashboard() {

  const [stats, setStats] = useState({

    total_users: 0,
    total_shops: 0,
    total_bookings: 0,
    total_emergencies: 0,
    total_reviews: 0,

    completed_services: 0,
    pending_services: 0,

    recent_activity: [],

  });


  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      const response = await getAdminDashboard();

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <AdminSidebar />

      <div className="flex-1 w-full">

        <AdminHeader />

        <div className="p-10">

          <h1 className="text-4xl font-bold mb-10">
            Admin Dashboard
          </h1>


          {/* Statistics Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            <Card
              title="Total Users"
              value={stats.total_users}
              icon={<Users size={35} />}
              color="bg-blue-600"
              to="/admin/customers"
            />

            <Card
              title="Repair Shops"
              value={stats.total_shops}
              icon={<Wrench size={35} />}
              color="bg-green-600"
              to="/admin/shops"
            />

            <Card
              title="Bookings"
              value={stats.total_bookings}
              icon={<Calendar size={35} />}
              color="bg-purple-600"
              to="/admin/bookings"
            />

            <Card
              title="Emergency Requests"
              value={stats.total_emergencies}
              icon={<AlertTriangle size={35} />}
              color="bg-red-600"
              to="/emergency"
            />

            <Card
              title="Reviews"
              value={stats.total_reviews}
              icon={<Star size={35} />}
              color="bg-yellow-500"
              to="/admin/reviews"
            />

            <Card
              title="Completed Services"
              value={stats.completed_services}
              icon={<Calendar size={35} />}
              color="bg-emerald-600"
              to="/admin/bookings"
            />

            <Card
              title="Pending Services"
              value={stats.pending_services}
              icon={<AlertTriangle size={35} />}
              color="bg-orange-500"
              to="/admin/bookings"
            />

          </div>


          {/* Booking Analytics */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Booking Analytics
            </h2>

            <BookingChart />

          </div>


          {/* Recent Activity */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>


            {stats.recent_activity &&
            stats.recent_activity.length > 0 ? (

              <div className="space-y-4">

                {stats.recent_activity.map((activity, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 last:border-b-0"
                  >

                    <div className="flex items-center gap-4">

                      {/* Activity Icon */}

                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-white ${
                          activity.type === "booking"
                            ? "bg-blue-600"
                            : "bg-yellow-500"
                        }`}
                      >

                        {activity.type === "booking" ? (
                          <Calendar size={22} />
                        ) : (
                          <Star size={22} />
                        )}

                      </div>


                      {/* Activity Details */}

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          {activity.title}
                        </h3>


                        {activity.type === "booking" && (

                          <p className="text-sm font-medium text-slate-600">

                            Booking ID:{" "}

                            <span className="font-medium">
                              {activity.booking_id}
                            </span>

                          </p>

                        )}


                        {activity.type === "review" && (

                          <p className="text-sm font-medium text-slate-600">

                            {activity.customer} reviewed{" "}

                            <span className="font-medium">
                              {activity.repair_shop}
                            </span>

                          </p>

                        )}

                      </div>

                    </div>


                    {/* Status / Rating */}

                    <div className="text-right">

                      {activity.type === "booking" && (

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : activity.status === "Accepted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {activity.status}
                        </span>

                      )}


                      {activity.type === "review" && (

                        <div className="text-yellow-500 font-semibold">
                          ⭐ {activity.rating}/5
                        </div>

                      )}


                      <p className="text-xs text-slate-600 mt-1">

                        {activity.date
                          ? new Date(activity.date).toLocaleString()
                          : ""}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <p className="font-medium text-slate-600">
                No recent activity available.
              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}


function Card({ title, value, icon, color, to }) {

  return (

    <Link
      to={to}
      className="block bg-white rounded-3xl shadow-lg p-8 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
      aria-label={`View ${title}`}
    >

      <div
        className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white`}
      >

        {icon}

      </div>


      <h2 className="text-slate-600 font-semibold mt-6">
        {title}
      </h2>


      <h1 className="text-4xl font-bold mt-2 text-slate-900">
        {value}
      </h1>

    </Link>

  );

}


export default Dashboard;