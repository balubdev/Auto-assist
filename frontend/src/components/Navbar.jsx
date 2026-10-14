import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-[0_10px_30px_rgba(14,165,233,0.08)] sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-6">

        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-sky-400 leading-none">
          AutoAssist
        </h1>

        <div className="flex flex-wrap items-center justify-end gap-4 md:gap-7 font-semibold text-base md:text-lg">
          <Link to="/" className="text-slate-200 hover:text-sky-400 transition duration-200">Home</Link>
          <Link to="/about" className="text-slate-200 hover:text-sky-400 transition duration-200">About</Link>
          <Link to="/services" className="text-slate-200 hover:text-sky-400 transition duration-200">Services</Link>
          <Link to="/contact" className="text-slate-200 hover:text-sky-400 transition duration-200">Contact</Link>
          <Link to="/login" className="text-slate-200 hover:text-sky-400 transition duration-200">Login</Link>
          <Link to="/register" className="bg-sky-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-sky-500/20 hover:bg-sky-300 transition duration-200">Register</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;