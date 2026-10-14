import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MapPin,
  Bot,
  Siren,
  History,
  Star,
  User,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/", { replace: true });
  };

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-8 border-b border-slate-700">
        <h1 className="text-4xl font-extrabold text-blue-400">
          AutoAssist
        </h1>

        <p className="text-gray-400 mt-2">
          Smart Vehicle Care
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-8">

        <MenuItem
          to="/customer/dashboard"
          icon={<LayoutDashboard size={22} />}
          text="Dashboard"
        />

        <MenuItem
          to="/customer/vehicles"
          icon={<Car size={22} />}
          text="My Vehicles"
        />

        <MenuItem
          to="/customer/book-service"
          icon={<CalendarCheck size={22} />}
          text="Book Service"
        />

        <MenuItem
          to="/customer/nearby-shops"
          icon={<MapPin size={22} />}
          text="Nearby Shops"
        />

        <MenuItem
          to="/customer/ai-recommendation"
          icon={<Bot size={22} />}
          text="AI Recommendation"
        />

        <MenuItem
          to="/customer/emergency"
          icon={<Siren size={22} />}
          text="Emergency SOS"
        />

        <MenuItem
          to="/customer/booking-history"
          icon={<History size={22} />}
          text="Booking History"
        />

        <MenuItem
          to="/customer/reviews"
          icon={<Star size={22} />}
          text="Reviews"
        />

        <MenuItem
          to="/customer/profile"
          icon={<User size={22} />}
          text="Profile"
        />

      </div>

      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left text-gray-300 transition duration-300 hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

function MenuItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-4 px-8 py-4 transition duration-300 ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}

export default Sidebar;
