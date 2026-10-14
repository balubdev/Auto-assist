import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await axios.get(
          "http://127.0.0.1:8000/api/accounts/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/notifications/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const results = response.data.results || response.data;
        setNotifications(results.filter((notification) => !notification.is_read));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationClick = async (notification) => {
    setIsNotificationsOpen(false);

    if (notification.is_read) {
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await axios.patch(
        `http://127.0.0.1:8000/api/notifications/${notification.id}/`,
        { is_read: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (currentNotification) => currentNotification.id !== notification.id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-end px-8">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
          aria-label="Notifications"
          aria-expanded={isNotificationsOpen}
          aria-haspopup="menu"
          className="relative rounded-lg p-2 transition hover:bg-gray-100"
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {isNotificationsOpen && (
          <div
            role="menu"
            className="absolute right-28 top-16 z-10 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          >
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="mt-3 text-sm text-gray-600">No messages yet.</p>
            ) : (
              <div className="mt-2 max-h-72 space-y-2 overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full rounded-md p-3 text-left transition hover:bg-gray-100 ${
                      notification.is_read ? "" : "bg-blue-50"
                    }`}
                  >
                    <p className="font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-lg p-1 text-left transition hover:bg-gray-100"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${
                profile.username || "User"
              }`}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">
                {profile.username || "User"}
              </h3>

              <p className="text-sm text-gray-600 capitalize">
                {profile.role || "Customer"}
              </p>
            </div>

            <ChevronDown size={18} className="text-gray-600" />
          </button>

          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            >
              <p className="font-semibold text-gray-900">
                {profile.username || "User"}
              </p>
              <p className="mt-1 text-sm capitalize text-gray-600">
                {profile.role || "Customer"}
              </p>
              {profile.email && (
                <p className="mt-1 break-words text-sm text-gray-600">
                  {profile.email}
                </p>
              )}

              <button
                type="button"
                onClick={handleLogout}
                role="menuitem"
                className="mt-4 flex w-full items-center gap-2 border-t border-gray-200 pt-3 text-left text-red-600 transition hover:text-red-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;