  import { useEffect, useState } from "react";

  import Sidebar from "../../components/dashboard/Sidebar";
  import Header from "../../components/dashboard/Header";

  import {
    Edit,
    Save,
    X,
  } from "lucide-react";

  import {
    getProfile,
    updateProfile,
    changePassword,
  } from "../../services/profileService";
  import PasswordChangeForm from "../../components/PasswordChangeForm";


  function Profile() {

    const [profile, setProfile] = useState(null);

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({});
    const [passwordData, setPasswordData] = useState({
      new_password: "",
      confirm_password: "",
    });
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);



    useEffect(() => {

      fetchProfile();

    }, []);

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("access");

        const response = await getProfile(token);

        setProfile(response.data);


      } catch(error) {
    console.log(error.response?.data || error);
  }

    };
    const handleChange = (e) => {

      setFormData({

        ...formData,

        [e.target.name]: e.target.value,

      });

    };

    const handlePasswordFieldChange = (event) => {
      setPasswordData((current) => ({
        ...current,
        [event.target.name]: event.target.value,
      }));
      setPasswordError("");
      setPasswordMessage("");
    };

    const handlePasswordChange = async (event) => {
      event.preventDefault();
      setSavingPassword(true);
      setPasswordError("");
      setPasswordMessage("");

      try {
        await changePassword(passwordData, localStorage.getItem("access"));
        setPasswordData({
          new_password: "",
          confirm_password: "",
        });
        setPasswordMessage("Password updated successfully.");
      } catch (error) {
        const details = error.response?.data || {};
        setPasswordError(
          Object.values(details).flat().join(" ") || "Unable to update password."
        );
      } finally {
        setSavingPassword(false);
      }
    };

    const handleUpdate = async () => {

      try {

        const token = localStorage.getItem("access");


        const response = await updateProfile(
          formData,
          token
        );


        setProfile(response.data);

        setEdit(false);


        alert("Profile Updated Successfully");


      } catch(error) {

    console.log(
      JSON.stringify(error.response?.data, null, 2)
    );

    alert(
      JSON.stringify(error.response?.data, null, 2)
    );

  }
    };

    if(!profile){

      return (
        <div className="flex min-h-screen bg-gray-100 text-slate-900">
          <Sidebar />

          <div className="flex-1">
            <Header />

            <div className="p-8">Loading...</div>
          </div>
        </div>
      );

    }

    return (

      <div className="flex min-h-screen bg-gray-100 text-slate-900">


        <Sidebar />

        <div className="flex-1">

          <Header />

          <div className="p-8">

            <div className="bg-white rounded-3xl shadow-xl p-10">


              <div className="flex flex-col md:flex-row items-center gap-8">


                <img

                  src={
                    profile.profile_image
                    ? profile.profile_image
                    :
                    `https://ui-avatars.com/api/?name=${profile.username}`
                  }

                  className="w-40 h-40 rounded-full border-4 border-blue-500"

                />

                <div>

                  <h1 className="text-4xl font-bold">

                    {profile.username}

                  </h1>

                  <p className="text-slate-600 capitalize">

                    {profile.role}

                  </p>

                  {!edit && (

                  <button
  onClick={()=>{

    setFormData({

      email: profile.email || "",
      phone: profile.phone || "",
      city: profile.city || "",
      state: profile.state || "",
      address: profile.address || "",
      pincode: profile.pincode || "",

    });
                    setPasswordData({
                      new_password: "",
                      confirm_password: "",
                    });
                    setPasswordError("");
                    setPasswordMessage("");

    setEdit(true);

  }}

                    className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl flex gap-2"

                  >

                    <Edit size={18}/>

                    Edit Profile

                  </button>

                  )}

                </div>

              </div>


            </div>

            {edit && (

            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">


              <h2 className="text-2xl font-bold mb-6">

                Edit Profile

              </h2>



              <div className="grid md:grid-cols-2 gap-5">


                <input

                  name="email"

                  value={formData.email || ""}

                  onChange={handleChange}

                  placeholder="Email"

                  className="border p-3 rounded-xl text-slate-900 placeholder:text-slate-500"

                />



      <input
    name="phone"
    value={formData.phone || ""}
    onChange={handleChange}
    placeholder="Phone"
    className="border p-3 rounded-xl text-slate-900 placeholder:text-slate-500"
  />



                <input

                  name="city"

                  value={formData.city || ""}

                  onChange={handleChange}

                  placeholder="City"

                  className="border p-3 rounded-xl text-slate-900 placeholder:text-slate-500"

                />

                <input

                  name="state"

                  value={formData.state || ""}

                  onChange={handleChange}

                  placeholder="State"

                  className="border p-3 rounded-xl text-slate-900 placeholder:text-slate-500"

                />

              </div>

              <div className="flex gap-4 mt-6">


                <button

                  onClick={handleUpdate}

                  className="bg-green-600 text-white px-6 py-3 rounded-xl flex gap-2"

                >

                  <Save size={18}/>

                  Save

                </button>

                <button

                  onClick={()=>{
                    setEdit(false);
                    setPasswordData({
                      new_password: "",
                      confirm_password: "",
                    });
                  }}

                  className="bg-gray-500 text-white px-6 py-3 rounded-xl flex gap-2"

                >

                  <X size={18}/>

                  Cancel

                </button>


              </div>

              <PasswordChangeForm
                form={passwordData}
                onChange={handlePasswordFieldChange}
                onSubmit={handlePasswordChange}
                message={passwordMessage}
                error={passwordError}
                saving={savingPassword}
              />


            </div>

            )}
          </div>

        </div>
      </div>

    );

  }
  export default Profile;
