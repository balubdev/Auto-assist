import { Link } from "react-router-dom";

function StatCard({
  title,
  value,
  icon,
  color,
  change,
  to,
}) {
  const card = (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-slate-900">
            {value}
          </h2>

          <p className="text-emerald-600 mt-3 font-semibold">
            {change}
          </p>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );

  return (
    <Link
      to={to}
      className="block rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
      aria-label={`View ${title}`}
    >
      {card}
    </Link>
  );
}

export default StatCard;
