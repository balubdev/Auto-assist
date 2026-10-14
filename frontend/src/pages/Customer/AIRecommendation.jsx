import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import {
  Bot,
  MapPin,
  Star,
  Users,
  Clock,
  IndianRupee,
  Trophy,
} from "lucide-react";

function AIRecommendation() {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      rank: "🥇",
      name: "Auto Care Center",
      score: 96,
      rating: 4.9,
      distance: "2.1 km",
      price: "₹500",
      mechanics: 5,
      waiting: "10 mins",
    },
    {
      id: 2,
      rank: "🥈",
      name: "Speed Motors",
      score: 92,
      rating: 4.7,
      distance: "3.5 km",
      price: "₹650",
      mechanics: 3,
      waiting: "18 mins",
    },
    {
      id: 3,
      rank: "🥉",
      name: "City Garage",
      score: 88,
      rating: 4.6,
      distance: "4.8 km",
      price: "₹450",
      mechanics: 2,
      waiting: "25 mins",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <div className="flex items-center gap-4 mb-8">

            <Bot className="text-blue-600" size={40} />

            <div>
              <h1 className="text-4xl font-bold">
                AI Recommendation
              </h1>

              <p className="text-slate-600">
                Smart shop recommendations powered by AI.
              </p>
            </div>

          </div>


          <div className="space-y-8">

            {recommendations.map((shop) => (

              <div
                key={shop.id}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      {shop.rank}
                      {shop.name}
                    </h2>


                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                      <p className="flex items-center gap-2">
                        <Star
                          className="text-yellow-500 fill-yellow-500"
                          size={18}
                        />
                        {shop.rating}
                      </p>


                      <p className="flex items-center gap-2">
                        <MapPin size={18} />
                        {shop.distance}
                      </p>


                      <p className="flex items-center gap-2">
                        <IndianRupee size={18} />
                        {shop.price}
                      </p>


                      <p className="flex items-center gap-2">
                        <Users size={18} />
                        {shop.mechanics} Mechanics
                      </p>


                      <p className="flex items-center gap-2">
                        <Clock size={18} />
                        {shop.waiting}
                      </p>

                    </div>

                  </div>


                  <div className="text-center">

                    <Trophy
                      className="mx-auto text-yellow-500"
                      size={42}
                    />

                    <h3 className="text-3xl font-bold text-blue-600 mt-3">
                      {shop.score}%
                    </h3>

                    <p className="text-slate-600">
                      AI Score
                    </p>

                  </div>

                </div>


                <div className="mt-8">

                  <div className="w-full bg-gray-200 rounded-full h-4">

                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{
                        width: `${shop.score}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="flex justify-end mt-8">

                  <button
                    onClick={() =>
                      navigate("/customer/book-service", {
                        state: { shop },
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                  >
                    Book Now
                  </button>

                </div>


              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIRecommendation;