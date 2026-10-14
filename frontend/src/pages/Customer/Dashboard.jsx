import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import RecentBookings from "../../components/dashboard/RecentBookings";
import NearbyShops from "../../components/dashboard/NearbyShops";
import EmergencyCard from "../../components/dashboard/EmergencyCard";
import VehicleCard from "../../components/dashboard/VehicleCard";
import ProfileCard from "../../components/dashboard/ProfileCard";
import StatCard from "../../components/dashboard/StatCard";
import Footer from "../../components/Footer";

import { getVehicles } from "../../services/vehicleService";
import { getBookings } from "../../services/bookingService";
import axios from "axios";

import {
  Car,
  CalendarCheck,
  MapPin,
  TriangleAlert,
} from "lucide-react";

function Dashboard() {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [shopCount, setShopCount] = useState(0);
  const [sosCount, setSOSCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("access");

        const vehicleRes = await getVehicles(token);
        setVehicleCount(vehicleRes.data.length);

        const bookingRes = await getBookings(token);
        setBookingCount(bookingRes.data.length);

        const shopRes = await axios.get(
          "http://127.0.0.1:8000/api/repairshops/nearby/?lat=9.9312&lng=76.2673",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setShopCount(shopRes.data.length);

        const sosRes = await axios.get(
          "http://127.0.0.1:8000/api/emergency/emergency/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSOSCount(sosRes.data.length);

      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8 space-y-8">

          <WelcomeBanner />

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome Back 👋
            </h1>

            <p className="text-slate-600 mt-2 text-lg">
              Here's what's happening with your vehicle today.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="My Vehicles"
              value={vehicleCount}
              change="Registered Vehicles"
              icon={<Car size={28} />}
              color="bg-blue-600"
              to="/customer/vehicles"
            />

            <StatCard
              title="Bookings"
              value={bookingCount}
              change="Total Bookings"
              icon={<CalendarCheck size={28} />}
              color="bg-green-600"
              to="/customer/booking-history"
            />

            <StatCard
              title="Nearby Shops"
              value={shopCount}
              change="Available Nearby"
              icon={<MapPin size={28} />}
              color="bg-purple-600"
              to="/customer/nearby-shops"
            />

            <StatCard
              title="SOS Requests"
              value={sosCount}
              change="Emergency History"
              icon={<TriangleAlert size={28} />}
              color="bg-red-600"
              to="/customer/emergency"
            />

          </div>

          {/* Full Width Sections */}

          <RecentBookings />

          <NearbyShops />

          {/* Two Column Cards */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <EmergencyCard />

            <VehicleCard />

          </div>

          <ProfileCard />

        </main>

        <Footer />

      </div>

    </div>
  );
}

export default Dashboard;
