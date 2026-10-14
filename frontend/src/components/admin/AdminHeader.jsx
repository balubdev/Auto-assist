import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function AdminHeader() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await API.get("notifications/");
        const notifications = response.data.results || response.data;
        setUnreadCount(notifications.filter((item) => !item.is_read).length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadCount();

    const refreshTimer = window.setInterval(fetchUnreadCount, 10000);

    return () => window.clearInterval(refreshTimer);
  }, []);

  return (

    <div className="bg-white shadow p-5 flex justify-between items-center">


      <h1 className="text-xl font-bold text-gray-800">
        Admin Panel
      </h1>


      <div className="flex items-center gap-5">
        <Link
          to="/admin/notifications"
          className="relative text-gray-600 hover:text-blue-600"
          aria-label="View admin notifications"
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-red-600 px-1 text-center text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="text-gray-600">
          Welcome Admin
        </div>
      </div>


    </div>

  );

}


export default AdminHeader;