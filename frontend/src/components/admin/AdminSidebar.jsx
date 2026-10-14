import {
  LayoutDashboard,
  Users,
  Wrench,
  Calendar,
  Star,
  BarChart3,
  User,
  Bell,
  LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
function AdminSidebar(){

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/", { replace: true });

  };


  return (

    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">


      <h2 className="text-2xl font-bold mb-10">
        AutoAssist Admin
      </h2>


      <nav className="space-y-4">


        <NavLink
          to="/admin/dashboard"
          className={navItemClass}
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </NavLink>



        <NavLink
          to="/admin/customers"
          className={navItemClass}
        >
          <Users size={20}/>
          Customers
        </NavLink>



        <NavLink
          to="/admin/shops"
          className={navItemClass}
        >
          <Wrench size={20}/>
          Repair Shops
        </NavLink>



        <NavLink
          to="/admin/bookings"
          className={navItemClass}
        >
          <Calendar size={20}/>
          Bookings
        </NavLink>



        <NavLink
          to="/admin/reviews"
          className={navItemClass}
        >
          <Star size={20}/>
          Reviews
        </NavLink>



        <NavLink
          to="/admin/analytics"
          className={navItemClass}
        >
          <BarChart3 size={20}/>
          Analytics
        </NavLink>

        

        <NavLink
          to="/admin/profile"
          className={navItemClass}
        >
          <User size={20}/>
          Profile
        </NavLink>

        <NavLink
          to="/admin/notifications"
          className={navItemClass}
        >
          <Bell size={20}/>
          Notifications
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded p-2 text-left transition hover:bg-red-600"
        >
          <LogOut size={20}/>
          Logout
        </button>



      </nav>


    </div>

  );

}

const navItemClass = ({ isActive }) =>
  `flex gap-3 items-center p-2 rounded transition ${
    isActive ? "bg-blue-600" : "hover:bg-slate-700"
  }`;

export default AdminSidebar;