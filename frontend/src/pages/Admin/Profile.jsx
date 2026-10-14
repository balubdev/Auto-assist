import { useEffect, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import {
  Mail,
  User,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";

import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
  });

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/accounts/admin/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/accounts/admin/profile/",
        {
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setEdit(false);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Profile update failed");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  const adminName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    profile.username ||
    "Admin";

  const initials = adminName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">

          {/* PROFILE HEADER */}
          <div className="bg-white rounded-3xl shadow-xl p-10">

            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* AVATAR */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-blue-500 shadow-lg">
                {initials}
              </div>

              {/* NAME + ROLE */}
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {adminName}
                </h1>

                <p className="text-slate-600 capitalize mt-2">
                  {profile.role || "Admin"}
                </p>

                {!edit && (
                  <button
                    onClick={() => setEdit(true)}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* EDIT PROFILE */}
          {edit && (
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

              <h2 className="text-2xl font-bold mb-6">
                Edit Profile
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {/* USERNAME */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Username
                  </label>

                  <input
                    value={profile.username || ""}
                    disabled
                    className="w-full border p-3 rounded-xl bg-gray-100 text-slate-900"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>

                  <input
                    name="email"
                    value={profile.email || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl text-slate-900"
                  />
                </div>

                {/* FIRST NAME */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>

                  <input
                    name="first_name"
                    value={profile.first_name || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl text-slate-900"
                  />
                </div>

                {/* LAST NAME */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>

                  <input
                    name="last_name"
                    value={profile.last_name || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl text-slate-900"
                  />
                </div>

                {/* ROLE */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role
                  </label>

                  <input
                    value={profile.role || ""}
                    disabled
                    className="w-full border p-3 rounded-xl bg-gray-100 text-slate-900"
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-6">

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </button>

                <button
                  onClick={() => {
                    setEdit(false);
                    fetchProfile();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>

              </div>
            </div>
          )}

          {/* PERSONAL INFORMATION */}
          {!edit && (
            <div className="grid lg:grid-cols-2 gap-8 mt-10">

              <div className="bg-white rounded-3xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6">
                  Personal Information
                </h2>

                {/* USERNAME */}
                <p className="flex items-center gap-3 mb-5 text-gray-700">
                  <User className="text-blue-600" size={22} />
                  <span>
                    <strong>Username:</strong>{" "}
                    {profile.username || "-"}
                  </span>
                </p>

                {/* EMAIL */}
                <p className="flex items-center gap-3 mb-5 text-gray-700">
                  <Mail className="text-blue-600" size={22} />
                  <span>
                    <strong>Email:</strong>{" "}
                    {profile.email || "-"}
                  </span>
                </p>

                {/* FIRST NAME */}
                <p className="flex items-center gap-3 mb-5 text-gray-700">
                  <User className="text-blue-600" size={22} />
                  <span>
                    <strong>First Name:</strong>{" "}
                    {profile.first_name || "-"}
                  </span>
                </p>

                {/* LAST NAME */}
                <p className="flex items-center gap-3 mb-5 text-gray-700">
                  <User className="text-blue-600" size={22} />
                  <span>
                    <strong>Last Name:</strong>{" "}
                    {profile.last_name || "-"}
                  </span>
                </p>

                {/* ROLE */}
                <p className="flex items-center gap-3 text-gray-700">
                  <Shield className="text-blue-600" size={22} />
                  <span>
                    <strong>Role:</strong>{" "}
                    {profile.role || "-"}
                  </span>
                </p>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;