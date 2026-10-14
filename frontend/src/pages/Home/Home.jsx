import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_40%,_#111827_100%)] py-16 md:py-20">

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-90px)]">

          <div className="flex flex-col items-start justify-center">

            <span className="inline-flex bg-blue-500/20 text-blue-300 px-5 py-2.5 text-lg rounded-full border border-blue-400/30 shadow-lg shadow-blue-500/10">
              🤖 AI Powered Vehicle Assistance
            </span>

            <h1 className="text-6xl md:text-7xl lg:text-[5rem] font-extrabold mt-6 leading-[0.95] tracking-tight">

              Smart Solution
              <br />

              For Your
              <span className="text-sky-400">
                {" "}Vehicle
              </span>

            </h1>

            <p className="mt-6 text-slate-300 text-xl md:text-2xl max-w-xl leading-relaxed">

              Find nearby repair shops, book services,
              get emergency support and maintain your vehicle
              using intelligent AI technology.

            </p>

            <div className="flex flex-wrap items-center gap-5 mt-8">

              {/* FIND REPAIR SHOP */}

              <button
                onClick={() => navigate("/customer/nearby-shops")}
                className="bg-sky-500 text-black px-8 py-3.5 text-lg rounded-xl font-semibold hover:bg-sky-400"
              >
                Find Repair Shop
              </button>

              {/* EMERGENCY SOS */}

              <button
                onClick={() => navigate("/customer/emergency")}
                className="border border-sky-400 px-8 py-3.5 text-lg rounded-xl hover:bg-sky-400 hover:text-black"
              >
                Emergency SOS
              </button>

            </div>

          </div>

          <div className="relative flex items-center justify-center">

            <div className="absolute -inset-6 bg-sky-500/10 blur-3xl rounded-full" />

            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=900"
              alt="car"
              className="relative rounded-[2rem] shadow-[0_30px_80px_rgba(14,165,233,0.2)] border border-white/10 object-cover w-full"
            />

            <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl">

              <h3 className="text-sky-400 font-bold">
                AI Match Score
              </h3>

              <p>
                95% Best Repair Shop
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-20 bg-[#0f172a] text-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Why Choose AutoAssist?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">

            <Feature
              icon="🤖"
              title="AI Recommendation"
              text="Find best repair shop using AI score."
            />

            <Feature
              icon="📍"
              title="Live Location"
              text="Locate nearby mechanics instantly."
            />

            <Feature
              icon="🚨"
              title="Emergency SOS"
              text="Instant roadside assistance."
            />

            <Feature
              icon="⭐"
              title="Trusted Reviews"
              text="Choose verified services."
            />

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="py-20 bg-[#020617] text-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Smart Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Service
              title="🔧 Vehicle Repair"
              text="Professional repair with verified mechanics."
            />

            <Service
              title="📅 Smart Booking"
              text="Book your service anytime."
            />

            <Service
              title="🧠 Predictive Maintenance"
              text="AI predicts future vehicle problems."
            />

          </div>

        </div>

      </section>

      {/* AI SECTION */}

      <section className="py-20 bg-[linear-gradient(135deg,_rgba(30,64,175,0.9),_rgba(15,23,42,1),_rgba(2,6,23,1))] text-white border-t border-sky-500/20">

        <div className="max-w-6xl mx-auto text-center px-8">

          <h2 className="text-5xl md:text-6xl font-bold">
            AI Vehicle Intelligence
          </h2>

          <p className="mt-5 text-gray-300 text-xl md:text-2xl">
            Analyze vehicle data and predict maintenance requirements.
          </p>

          <button className="mt-8 bg-sky-400 text-black px-10 py-3 rounded-xl font-bold">
            Analyze Vehicle
          </button>

        </div>

      </section>

      {/* SHOPS */}

      <section className="py-20 bg-[#0f172a] text-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Top Repair Shops
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Shop
              name="Auto Care Garage"
              place="Kochi"
              rating="4.8"
              onBook={() => navigate("/customer/book-service")}
            />

            <Shop
              name="Speed Motors"
              place="Kottayam"
              rating="4.7"
              onBook={() => navigate("/customer/book-service")}
            />

            <Shop
              name="Prime Auto Service"
              place="Ernakulam"
              rating="4.9"
              onBook={() => navigate("/customer/book-service")}
            />

          </div>

        </div>

      </section>

      {/* REVIEWS */}

      <section className="py-20 bg-[#020617] text-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            <Review text="Fast and reliable service." />

            <Review text="AI recommendation saved my time." />

            <Review text="Emergency support was excellent." />

          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section className="py-16 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),transparent_35%),#0f172a] text-white text-center border-t border-slate-800/80">

        <h2 className="text-3xl font-bold">
          Need Help?
        </h2>

        <p className="text-gray-400 mt-3">
          Contact AutoAssist support for assistance.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="mt-6 bg-sky-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-sky-300"
        >
          Contact Us
        </button>

      </section>

      <Footer />

    </div>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 hover:border-sky-400 transition">

      <h3 className="text-4xl">
        {icon}
      </h3>

      <h4 className="text-xl font-bold mt-5">
        {title}
      </h4>

      <p className="text-gray-400 mt-3">
        {text}
      </p>

    </div>
  );
}


function Service({ title, text }) {
  return (
    <div className="bg-[#0f172a] p-8 rounded-2xl border border-slate-700 hover:border-sky-400">

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-gray-400">
        {text}
      </p>

    </div>
  );
}


function Shop({ name, place, rating, onBook }) {
  return (
    <div className="bg-[#1e293b] p-8 rounded-2xl">

      <h3 className="text-2xl font-bold">
        {name}
      </h3>

      <p className="mt-3">
        📍 {place}
      </p>

      <p>
        ⭐ {rating}
      </p>

      <button
        onClick={onBook}
        className="mt-5 bg-sky-400 text-black px-6 py-2 rounded-xl hover:bg-sky-300"
      >
        Book Now
      </button>

    </div>
  );
}


function Review({ text }) {
  return (
    <div className="bg-[#1e293b] p-8 rounded-2xl">

      <h3>
        ⭐⭐⭐⭐⭐
      </h3>

      <p className="mt-4 text-gray-300">
        "{text}"
      </p>

    </div>
  );
}


export default Home;