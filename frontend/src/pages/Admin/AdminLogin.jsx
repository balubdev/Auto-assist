import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getProfile } from "../../services/authService";

function AdminLogin() {

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


      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );


      const profileResponse = await getProfile(
        response.data.access
      );


      const role = profileResponse.data.role;


      if (role === "admin") {

        navigate("/admin/dashboard", { replace: true });

      } else {

        alert("You are not an Admin");

      }


    } catch (error) {

      alert("Invalid Username or Password");
      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-slate-900">


      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">


        <h2 className="text-3xl font-bold text-center mb-8">
          Admin Login
        </h2>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          <input

            type="text"

            name="username"

            placeholder="Username"

            value={formData.username}

            onChange={handleChange}

            className="w-full border p-3 rounded-lg text-slate-900 placeholder:text-slate-500"

          />



          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full border p-3 rounded-lg text-slate-900 placeholder:text-slate-500"

          />



          <button

            type="submit"

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

          >

            Login

          </button>


        </form>


      </div>


    </div>

  );

}


export default AdminLogin;