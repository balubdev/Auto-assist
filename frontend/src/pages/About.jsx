import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-8">

        <div className="max-w-6xl mx-auto">

          {/* Hero */}

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 text-center text-white">

            <h1 className="text-5xl font-bold mb-5 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About AutoAssist 🚗
            </h1>

            <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
              AutoAssist is an intelligent vehicle service platform that
              connects vehicle owners with trusted repair shops. It provides
              smart booking, emergency assistance and AI-powered repair
              recommendations in one place.
            </p>

          </div>

          {/* Feature Cards */}

          <div className="grid md:grid-cols-3 gap-8 mt-10">

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:-translate-y-2 transition shadow-xl">

              <div className="text-4xl mb-4">🔧</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                Smart Booking
              </h2>

              <p className="text-gray-300">
                Book vehicle services quickly with nearby verified repair shops.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:-translate-y-2 transition shadow-xl">

              <div className="text-4xl mb-4">📍</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                Nearby Shops
              </h2>

              <p className="text-gray-300">
                Find repair shops based on location, ratings and availability.
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:-translate-y-2 transition shadow-xl">

              <div className="text-4xl mb-4">🤖</div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                AI Recommendation
              </h2>

              <p className="text-gray-300">
                AI suggests the best repair shop using smart analysis.
              </p>

            </div>

          </div>

          {/* Technologies */}

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 mt-10 text-white">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Technologies Used
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              {[
                "React.js",
                "Tailwind CSS",
                "Django REST",
                "MySQL",
                "Machine Learning",
                "JWT Authentication",
                "REST API",
                "AI Engine"
              ].map((tech, index) => (

                <div
                  key={index}
                  className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-4 text-center hover:bg-cyan-500/30 transition"
                >
                  {tech}
                </div>

              ))}

            </div>

          </div>

          {/* Vision */}

          <div className="mt-10 rounded-3xl p-10 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl">

            <h2 className="text-3xl font-bold mb-4">
              Our Vision
            </h2>

            <p className="text-lg leading-relaxed">
              To transform vehicle maintenance into a smart digital experience
              by combining artificial intelligence, modern technology and
              reliable automotive services.
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default About;