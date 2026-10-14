import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BookingChart() {

  const data = [
    { name: "Users", value: 120 },
    { name: "Shops", value: 18 },
    { name: "Bookings", value: 96 },
    { name: "Completed", value: 70 },
    { name: "Pending", value: 26 },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

      <h2 className="text-2xl font-bold mb-6 text-slate-900">
        System Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" tick={{ fill: "#475569" }} />

          <YAxis tick={{ fill: "#475569" }} />

          <Tooltip contentStyle={{ color: "#0f172a" }} />

          <Bar dataKey="value" fill="#2563eb" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default BookingChart;