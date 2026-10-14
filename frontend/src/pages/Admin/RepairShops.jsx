import { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Wrench,
  RefreshCw,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";

function RepairShops() {

  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredShops = shops.filter((shop) =>
    shop.shop_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    loadShops();

    const refreshTimer = window.setInterval(loadShops, 10000);

    return () => window.clearInterval(refreshTimer);
  }, []);

  const loadShops = async () => {

    try {

      const res = await API.get("repairshops/shops/");
      console.log(res.data);

      const registeredShops = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];
      const newestFirst = [...registeredShops].sort((firstShop, secondShop) => {
        if (firstShop.is_verified !== secondShop.is_verified) {
          return firstShop.is_verified ? 1 : -1;
        }

        return new Date(secondShop.created_at || 0) - new Date(firstShop.created_at || 0);
      });

      setShops(newestFirst);

    } catch (err) {

      console.log(err);

      alert("Unable to load Repair Shops");

    }

  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const refreshRequests = async () => {
    setRefreshing(true);
    await loadShops();
    setRefreshing(false);
  };

  const verifyShop = async (shop) => {

    try {

      await API.patch(

        `repairshops/shops/${shop.id}/`,

        {
          is_verified: true,
        }

      );

      loadShops();

    } catch (err) {

      console.log(err);

    }

  };

  const rejectShop = async (shop) => {

    try {

      await API.patch(

        `repairshops/shops/${shop.id}/`,

        {
          is_verified: false,
        }

      );

      loadShops();

    } catch (err) {

      console.log(err);

    }

  };

  const deleteShop = async (id) => {

    if (!window.confirm("Delete this repair shop?")) return;

    try {

      await API.delete(
        `repairshops/shops/${id}/`
      );

      loadShops();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen text-slate-900">

        <AdminHeader />

        <div className="p-8">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold flex items-center gap-2">

              <Wrench />

              Repair Shops

            </h1>

            <div className="relative">

              <Search
                className="absolute left-3 top-3 text-slate-500"
                size={18}
              />

              <input
                type="text"
                placeholder="Search Shop..."
                value={search}
                onChange={handleSearch}
                className="border rounded-lg pl-10 pr-4 py-2 text-slate-900 placeholder:text-slate-500"
              />

            </div>

            <button
              type="button"
              onClick={refreshRequests}
              disabled={refreshing}
              aria-busy={refreshing}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
            >
              <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh Requests"}
            </button>

          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4">Shop Name</th>

                  <th className="p-4">City</th>

                  <th className="p-4">Phone</th>

                  <th className="p-4">Approval Status</th>

                  <th className="p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredShops.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-10"
                    >
                      No Repair Shops Found
                    </td>

                  </tr>

                ) : (

                  filteredShops.map((shop) => (

                    <tr
                      key={shop.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4">

                        {shop.shop_name}

                      </td>

                      <td className="p-4">

                        {shop.city}

                      </td>

                      <td className="p-4">

                        {shop.phone}

                      </td>

                      <td className="p-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            shop.is_verified
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {shop.is_verified ? "Approved" : "New / Pending"}
                        </span>

                      </td>

                      <td className="p-4 flex gap-3">

                        <button
                          onClick={() => verifyShop(shop)}
                          disabled={shop.is_verified}
                          className="inline-flex items-center gap-2 rounded bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-green-600"
                        >
                          <CheckCircle size={20} />
                          {shop.is_verified ? "Accepted" : "Accept"}
                        </button>

                        <button
                          onClick={() => rejectShop(shop)}
                          className="inline-flex items-center gap-2 rounded bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                        >
                          <XCircle size={20} />
                          Reject
                        </button>

                        <button
                          onClick={() => deleteShop(shop.id)}
                          className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          <Trash2 size={20} />
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RepairShops;