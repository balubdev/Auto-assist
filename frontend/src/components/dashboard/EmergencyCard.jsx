import { PhoneCall, MapPinned, Ambulance } from "lucide-react";

function EmergencyCard() {
  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white shadow-2xl p-8">

      <div className="flex justify-between items-center flex-wrap gap-8">

        <div>

          <h2 className="text-3xl font-bold mb-4">
            🚨 Emergency SOS
          </h2>

          <p className="text-red-100 mb-6">
            Need immediate roadside assistance? Share your location and request help instantly.
          </p>

          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <MapPinned />
              <span>Live Location Available</span>
            </div>

            <div className="flex items-center gap-3">
              <PhoneCall />
              <span>24 × 7 Emergency Support</span>
            </div>

            <div className="flex items-center gap-3">
              <Ambulance />
              <span>Nearest Mechanic Response</span>
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-4">

          <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
            🚨 Send SOS
          </button>

          <button className="bg-red-900 text-white px-8 py-4 rounded-2xl hover:bg-red-800 transition">
            📞 Call Support
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmergencyCard;