import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { loginUser, getProfile } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
localStorage.setItem("access", response.data.access);
localStorage.setItem("refresh", response.data.refresh);

const profileResponse = await getProfile(response.data.access);

const role = profileResponse.data.role;

if (role === "customer") {
  navigate("/customer/dashboard", { replace: true });
} else if (role === "shop_owner") {
  navigate("/repairshop/dashboard", { replace: true });
} else if (role === "admin") {
  navigate("/admin/dashboard", { replace: true });
}
    } catch (error) {
      alert("Invalid Username or Password");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_40%,_#111827_100%)] text-white">
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/80 p-10 rounded-2xl shadow-[0_30px_80px_rgba(14,165,233,0.15)] w-full max-w-md">

          <h2 className="text-4xl font-bold text-center mb-8 text-sky-400">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
            />

            <button
              type="submit"
              className="w-full bg-sky-500 text-slate-950 py-3 rounded-xl font-bold hover:bg-sky-400 transition"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;