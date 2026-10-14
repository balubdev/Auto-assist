import { useEffect, useState } from "react";
import { Eye, Search, Trash2, Users, X } from "lucide-react";

import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  deleteCustomer,
  getCustomers,
} from "../../services/adminService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadAdminLists();
  }, []);

  const loadAdminLists = async () => {
    try {
      const response = await getCustomers();
      const userData = response.data;
      setCustomers(Array.isArray(userData) ? userData : userData.results || []);
    } catch (error) {
      console.error("Unable to load admin user lists:", error);
    }
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) =>
    [
      customer.username,
      customer.email,
      customer.phone,
      customer.city,
      customer.state,
      customer.pincode,
    ]
      .some((value) => (value || "").toLowerCase().includes(normalizedSearch))
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      await loadAdminLists();
    } catch (error) {
      console.error("Unable to delete customer:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="min-w-0 flex-1 bg-gray-100 text-slate-900">
        <AdminHeader />

        <main className="space-y-8 p-8">
          <section aria-label="Customers">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="flex items-center gap-2 text-3xl font-bold">
                <Users />
                Customers
              </h1>

              <div className="flex items-center gap-3">
                <label className="relative">
                  <span className="sr-only">Search customers by name, contact, or location</span>
                  <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                  <input
                    type="search"
                    placeholder="Name, email, phone, or location..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-72 rounded-lg border bg-white py-2 pl-10 pr-4 text-slate-900 placeholder:text-slate-500"
                  />
                </label>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    <X size={16} />
                    Clear
                  </button>
                )}
              </div>
            </div>

            <p className="mb-3 text-sm text-slate-600" aria-live="polite">
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>

            <div className="overflow-x-auto rounded-xl bg-white shadow">
              <table className="w-full text-left">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{customer.username}</td>
                      <td className="p-4">{customer.email || "-"}</td>
                      <td className="p-4">{customer.phone || "-"}</td>
                      <td className="p-4">{customer.city || "-"}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            onClick={() => setSelectedUser(customer)}
                          >
                            <Eye size={18} />
                            Details
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                            onClick={() => handleDelete(customer.id)}
                          >
                            <Trash2 size={18} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-slate-600">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {selectedUser && (
            <section className="rounded-xl bg-white p-6 shadow" aria-label="User details">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">User Details</h2>
                  <p className="mt-1 text-slate-600">Account information</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="inline-flex items-center gap-2 rounded border px-3 py-2 text-slate-700 hover:bg-gray-100"
                >
                  <X size={18} />
                  Close
                </button>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Detail label="Username" value={selectedUser.username} />
                <Detail label="Email" value={selectedUser.email || "Not provided"} />
                <Detail label="Phone" value={selectedUser.phone || "Not provided"} />
                <Detail label="City" value={selectedUser.city || "Not provided"} />
                <Detail label="State" value={selectedUser.state || "Not provided"} />
                <Detail label="Pincode" value={selectedUser.pincode || "Not provided"} />
              </dl>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-slate-600">{label}</dt>
      <dd className="font-medium capitalize">{value}</dd>
    </div>
  );
}

export default Customers;
