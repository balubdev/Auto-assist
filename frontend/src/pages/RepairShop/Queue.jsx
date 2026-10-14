import { useEffect, useState, useRef } from "react";
import API from "../../services/api";

import RepairShopSidebar from "../../components/dashboard/RepairShopSidebar";
import Header from "../../components/dashboard/Header";

function Queue() {

  const [queue, setQueue] = useState([]);
  const timersRef = useRef({});

  useEffect(() => {
    fetchQueue();

    const refreshInterval = setInterval(fetchQueue, 60_000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Clear previous timers
    Object.values(timersRef.current).forEach((t) => clearTimeout(t));
    timersRef.current = {};

    // For each queue item, set a timer to auto-mark completed when due
    queue.forEach((item) => {
      if (!item.booking_date || !item.booking_time) return;
      if (item.status === "Completed") return;

      const dueAt = new Date(`${item.booking_date}T${item.booking_time}`);
      const now = new Date();
      const ms = dueAt - now;

      if (ms <= 0) {
        // already due, ensure backend sync by fetching (backend also auto-completes on GET)
        fetchQueue();
      } else {
        const timer = setTimeout(() => {
          markCompleted(item.id);
        }, ms);
        timersRef.current[item.id] = timer;
      }
    });

    return () => {
      Object.values(timersRef.current).forEach((t) => clearTimeout(t));
      timersRef.current = {};
    };
  }, [queue]);

  const fetchQueue = async () => {
    try {

      const token = localStorage.getItem("access");

      const response = await API.get(
        "repairshops/queue/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueue(response.data.results || response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const markCompleted = async (id) => {
    try {
      await API.patch(`repairshops/queue/${id}/`, {
        status: "Completed",
      });
      fetchQueue();
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Unable to mark this booking as completed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">

      <RepairShopSidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Queue Management
          </h1>

          <div className="bg-white rounded-2xl shadow p-6">

            {queue.length === 0 ? (

              <p className="text-slate-600">
                No vehicles in queue.
              </p>

            ) : (

              queue.map((item) => (

                <div
                  key={item.id}
                  className="border-b py-5 last:border-none"
                >

                  <p>
                    <strong>Booking ID:</strong> {item.booking_id}
                  </p>

                  <p>
                    <strong>Customer:</strong> {item.customer}
                  </p>

                  <p>
                    <strong>Vehicle:</strong> {item.vehicle}
                  </p>

                  <p>
                    <strong>Problem:</strong> {item.problem}
                  </p>

                  <p>
                    <strong>Position:</strong> {item.position}
                  </p>

                  <p>
                    <strong>Booking Date:</strong> {item.booking_date}
                  </p>

                  <p>
                    <strong>Booking Time:</strong> {item.booking_time}
                  </p>

                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>

                  {(() => {
                    if (item.status !== "Completed") {
                      return (
                        <button
                          onClick={() => markCompleted(item.id)}
                          className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                          Mark Completed
                        </button>
                      );
                    }

                    return null;
                  })()}

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Queue;
