import { Sparkles, CarFront } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-300" />
            <span className="font-semibold">
              AI Powered Vehicle Assistant
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-blue-100 max-w-xl">
            Manage your vehicles, book repair services, discover nearby garages,
            and receive AI-powered repair shop recommendations—all in one place.
          </p>

          <button
            onClick={() => navigate("/customer/book-service")}
            className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Book a Service
          </button>

        </div>

        <div className="hidden lg:flex">

          <div className="bg-white/20 backdrop-blur-md rounded-full p-8">
            <CarFront size={140} />
          </div>

        </div>

      </div>

    </div>
  );
}

export default WelcomeBanner;