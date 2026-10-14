import { useState } from "react";
import Navbar from "../../components/Navbar";
import { registerUser } from "../../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Only allow numbers and max 10 digits
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      alert("Registration Successful!");
    } catch (error) {
console.log(JSON.stringify(error.response?.data, null, 2));
      alert("Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_40%,_#111827_100%)] text-white">
      <Navbar />

      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
        <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/80 p-10 rounded-2xl shadow-[0_30px_80px_rgba(14,165,233,0.15)] w-full max-w-md">

          <h2 className="text-4xl font-bold text-center mb-8 text-sky-400">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white placeholder:text-slate-400 p-3 rounded-xl focus:outline-none focus:border-sky-400"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-950/50 text-white p-3 rounded-xl focus:outline-none focus:border-sky-400"
            >
              <option value="customer">Customer</option>
              <option value="shop_owner">Shop Owner</option>
            </select>

            <button
              type="submit"
              className="w-full bg-sky-500 text-slate-950 py-3 rounded-xl font-bold hover:bg-sky-400 transition"
            >
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Register;