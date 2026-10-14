import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import { getVehicles } from "../services/vehicleService";

function Footer() {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      return;
    }

    const fetchCounts = async () => {
      try {
        const [vehicleResponse, bookingResponse] = await Promise.all([
          getVehicles(token),
          getBookings(token),
        ]);

        const vehicles = Array.isArray(vehicleResponse.data)
          ? vehicleResponse.data
          : vehicleResponse.data.results || [];
        const bookings = Array.isArray(bookingResponse.data)
          ? bookingResponse.data
          : bookingResponse.data.results || [];

        setVehicleCount(vehicles.length);
        setBookingCount(bookings.length);
      } catch (error) {
        console.error("Unable to load footer counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-8">

        {/* ABOUT AUTOASSIST */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            AutoAssist
          </h2>

          <p className="text-gray-400">
            Smart Vehicle Repair Shop Locator & Service Booking powered by AI.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link
                to="/"
                className="hover:text-sky-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <a
                href="/#about"
                className="hover:text-sky-400 transition"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/#services"
                className="hover:text-sky-400 transition"
              >
                Services
              </a>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-sky-400 transition"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-bold mb-4">
            Services
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link
                to="/customer/book-service"
                className="hover:text-sky-400 transition"
              >
                Repair Booking
              </Link>
            </li>

            <li>
              <Link
                to="/customer/nearby-shops"
                className="hover:text-sky-400 transition"
              >
                Nearby Shops
              </Link>
            </li>

            <li>
              <Link
                to="/customer/emergency"
                className="hover:text-sky-400 transition"
              >
                Emergency SOS
              </Link>
            </li>

            <li>
              <Link
                to="/customer/ai-recommendation"
                className="hover:text-sky-400 transition"
              >
                AI Recommendation
              </Link>
            </li>

          </ul>
        </div>

        {/* ACTIVITY */}
        <div>
          <h3 className="font-bold mb-4">
            Your Activity
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Vehicles: <span className="font-semibold text-white">{vehicleCount}</span></li>
            <li>Bookings: <span className="font-semibold text-white">{bookingCount}</span></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold mb-4">
            Contact
          </h3>

          {/* LOCATION */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kerala,India"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-400 hover:text-sky-400 transition mb-2"
          >
            📍 Kerala, India
          </a>

          {/* EMAIL */}
          <a
            href="mailto:support@autoassist.com"
            className="block text-gray-400 hover:text-sky-400 transition mb-2"
          >
            📧 support@autoassist.com
          </a>

          {/* PHONE */}
          <a
            href="tel:+919876543210"
            className="block text-gray-400 hover:text-sky-400 transition"
          >
            📞 +91 9876543210
          </a>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 AutoAssist. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;