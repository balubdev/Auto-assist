import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import API from "../../services/api";
import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";
import PasswordChangeForm from "../../components/PasswordChangeForm";

const profileFields = [
  ["shop_name", "Shop name", "text"],
  ["phone", "Phone", "tel"],
  ["email", "Email", "email"],
  ["city", "City", "text"],
  ["state", "State", "text"],
  ["pincode", "Pincode", "text"],
  ["opening_time", "Opening time", "time"],
  ["closing_time", "Closing time", "time"],
];

const emptyForm = {
  shop_name: "",
  description: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  latitude: "",
  longitude: "",
  opening_time: "",
  closing_time: "",
};

function Profile() {
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("repairshops/owner/profile/");
        setShop(response.data);
        setForm((current) => ({ ...current, ...response.data }));
      } catch (error) {
        if (error.response?.status !== 404) {
          console.log(error.response?.data || error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericLimits = { phone: 10, pincode: 6 };
    const nextValue = numericLimits[name]
      ? value.replace(/\D/g, "").slice(0, numericLimits[name])
      : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handlePasswordFieldChange = (event) => {
    setPasswordData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setPasswordError("");
    setPasswordMessage("");
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setSavingPassword(true);
    setPasswordError("");
    setPasswordMessage("");

    try {
      await API.post("accounts/password/change/", passwordData);
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

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm((current) => ({
          ...current,
          latitude: coords.latitude.toFixed(7),
          longitude: coords.longitude.toFixed(7),
        }));
      },
      () => alert("Unable to get your current location."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      const response = shop
        ? await API.patch("repairshops/owner/profile/", form)
        : await API.post("repairshops/shops/", form);
      setShop(response.data);
      setForm((current) => ({ ...current, ...response.data }));
      setIsEditing(false);
      alert(shop ? "Shop profile updated." : "Shop profile created.");
    } catch (error) {
      const details = error.response?.data;
      console.log(details || error);
      alert(`Unable to save shop profile: ${JSON.stringify(details || "Please try again.")}`);
    }
  };

  const renderFields = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {profileFields.map(([name, placeholder, type]) => (
        <input
          key={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name] || ""}
          onChange={handleChange}
          inputMode={name === "phone" || name === "pincode" ? "numeric" : undefined}
          maxLength={name === "phone" ? 10 : name === "pincode" ? 6 : undefined}
          required
          className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
        />
      ))}
    </div>
  );

  const renderLocationFields = () => (
    <>
      <p className="text-sm text-slate-600 md:col-span-2">
        Shop distances are calculated from these coordinates. Use your current location while at the shop, or verify the address on the map before saving.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["latitude", "Latitude", -90, 90],
          ["longitude", "Longitude", -180, 180],
        ].map(([name, placeholder, min, max]) => (
          <input
            key={name}
            name={name}
            type="number"
            step="any"
            min={min}
            max={max}
            placeholder={placeholder}
            value={form[name] || ""}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={useCurrentLocation}
        className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
      >
        <MapPin size={18} />
        Use current location
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      <RepairShopSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">
          <h1 className="mb-6 text-3xl font-bold">Shop Profile</h1>

          {!loading && !shop && (
            <form onSubmit={saveProfile} className="space-y-4 rounded-3xl bg-white p-8 shadow">
              <h2 className="text-xl font-bold">Create your shop profile</h2>
              {renderFields()}
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
              />
              {renderLocationFields()}
              <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                Create Shop Profile
              </button>
            </form>
          )}

          {shop && (
            <div className="rounded-3xl bg-white p-8 shadow">
              {!isEditing ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{shop.shop_name}</h2>
                      <span
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          shop.is_verified
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {shop.is_verified ? "Approved by admin" : "Pending admin approval"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordData({
                          new_password: "",
                          confirm_password: "",
                        });
                        setPasswordError("");
                        setPasswordMessage("");
                        setIsEditing(true);
                      }}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                  </div>
                  <p className="mt-3">{shop.description}</p>
                  <p className="mt-3">Phone: {shop.phone}</p>
                  <p>Email: {shop.email}</p>
                  <p>Address: {shop.address}</p>
                  <p>Rating: {shop.average_rating}</p>
                  <a
                    className="mt-3 inline-flex text-sm font-semibold text-blue-700 underline"
                    href={`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Verify saved shop location on map
                  </a>
                </>
              ) : (
                <>
                  <form onSubmit={saveProfile} className="space-y-4">
                    <h2 className="text-2xl font-bold">Edit Shop Profile</h2>
                    {renderFields()}
                    <textarea
                      name="address"
                      value={form.address || ""}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                      className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
                    />
                    <textarea
                      name="description"
                      value={form.description || ""}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full rounded-lg border p-3 text-slate-900 placeholder:text-slate-500"
                    />
                    {renderLocationFields()}
                    <div className="flex flex-wrap gap-3">
                      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm((current) => ({ ...current, ...shop }));
                          setPasswordData({
                            new_password: "",
                            confirm_password: "",
                          });
                          setIsEditing(false);
                        }}
                        className="rounded-lg border px-4 py-2 text-slate-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  <PasswordChangeForm
                    form={passwordData}
                    onChange={handlePasswordFieldChange}
                    onSubmit={changePassword}
                    message={passwordMessage}
                    error={passwordError}
                    saving={savingPassword}
                  />
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
