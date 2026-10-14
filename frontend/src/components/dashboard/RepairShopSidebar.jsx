import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Calendar,
  Users,
  Wrench,
  Star,
  List,
  Siren,
  LogOut,
} from "lucide-react";

function RepairShopSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/", { replace: true });
  };

  return (

    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        AutoAssist
      </h2>

      <nav className="space-y-4">

        <NavLink
          to="/repairshop/dashboard"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <LayoutDashboard size={22}/>
          Dashboard
        </NavLink>

        <NavLink
          to="/repairshop/profile"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <User size={22}/>
          Shop Profile
        </NavLink>

        <NavLink
          to="/repairshop/bookings"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <Calendar size={22}/>
          Bookings
        </NavLink>

        <NavLink
          to="/repairshop/mechanics"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <Users size={22}/>
          Mechanics
        </NavLink>

        <NavLink
          to="/repairshop/services"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <Wrench size={22}/>
          Services
        </NavLink>

        <NavLink
          to="/repairshop/reviews"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <Star size={22}/>
          Reviews
        </NavLink>

        <NavLink
          to="/repairshop/queue"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <List size={22}/>
          Queue
        </NavLink>

        <NavLink
          to="/repairshop/emergency-service"
          className="flex items-center gap-3 hover:bg-slate-700 p-3 rounded-lg"
        >
          <Siren size={22}/>
          Emergency Service
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-red-600"
        >
          <LogOut size={22}/>
          Logout
        </button>

      </nav>

    </div>

  );
}

export default RepairShopSidebar;