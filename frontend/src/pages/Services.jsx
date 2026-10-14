import Navbar from "../components/Navbar";

function Services() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-8">

        <div className="max-w-6xl mx-auto">

          {/* Heading */}

          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Our Services 🚗
            </h1>

            <p className="text-gray-300 text-lg">
              Smart vehicle solutions designed to keep your journey safe and hassle-free.
            </p>

          </div>

          {/* Services */}

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">🔧</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Vehicle Repair
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Professional repair services by experienced mechanics for all vehicle types.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">🚨</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Emergency Assistance
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Get immediate roadside assistance whenever your vehicle breaks down.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">🤖</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                AI Recommendation
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Our AI engine recommends the most suitable repair shop based on ratings, distance and availability.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">📍</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Nearby Repair Shops
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Discover verified repair shops near your location with real-time details.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">📅</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Online Booking
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Schedule vehicle maintenance appointments quickly with just a few clicks.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition">

              <div className="text-5xl mb-5">⭐</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Reviews & Ratings
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Read customer reviews and ratings before choosing a repair shop.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Services;