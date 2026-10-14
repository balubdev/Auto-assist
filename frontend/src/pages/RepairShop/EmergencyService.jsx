import { useEffect, useState } from "react";
import { MapPin, Phone, Siren } from "lucide-react";
import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";
import API from "../../services/api";

function EmergencyService() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await API.get("emergency/shop-requests/");
        setRequests(response.data.results || response.data);
        setError("");
      } catch (requestError) {
        console.error("Unable to load emergency requests:", requestError);
        setError("Unable to load emergency requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    const refreshInterval = setInterval(fetchRequests, 30_000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      <RepairShopSidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <Siren className="text-red-600" size={32} />
            <h1 className="text-3xl font-bold">Emergency Service Requests</h1>
          </div>

          {loading ? (
            <p className="rounded-2xl bg-white p-6 text-slate-600 shadow">
              Loading emergency requests...
            </p>
          ) : error ? (
            <p className="rounded-2xl border border-red-200 bg-white p-6 text-red-700 shadow" role="alert">
              {error}
            </p>
          ) : requests.length === 0 ? (
            <p className="rounded-2xl bg-white p-6 text-slate-600 shadow">
              No emergency requests have been sent to your shop.
            </p>
          ) : (
            <div className="grid gap-5">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border-l-4 border-red-500 bg-white p-6 shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {request.problem}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(request.requested_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                      {request.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
                    <p><strong>Customer:</strong> {request.customer_name}</p>
                    <p>
                      <strong>Vehicle:</strong>{" "}
                      {request.vehicle_brand} {request.vehicle_model} (
                      {request.vehicle_registration})
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} />
                      <a className="font-medium text-blue-700 underline" href={`tel:${request.customer_phone}`}>
                        {request.customer_phone}
                      </a>
                    </p>
                    {request.address && (
                      <p><strong>Address:</strong> {request.address}</p>
                    )}
                  </div>

                  <a
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 underline"
                    href={`https://www.google.com/maps?q=${request.latitude},${request.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={18} />
                    Open customer location in Maps
                  </a>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default EmergencyService;
