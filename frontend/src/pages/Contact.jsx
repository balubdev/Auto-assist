import { useState } from "react";
import Navbar from "../components/Navbar";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const subject = `AutoAssist Contact Message from ${name}`;

    const body = `Name: ${name}
Email: ${email}

Message:
${message}`;

    window.location.href =
      `mailto:support@autoassist.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Contact AutoAssist 🚗
            </h1>

            <p className="text-gray-300 text-lg">
              We're always here to help. Contact our support team anytime for
              vehicle service assistance.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* Location */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kerala,India"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition block"
            >
              <div className="text-5xl mb-5">
                📍
              </div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                Location
              </h2>

              <p className="text-gray-300">
                Kerala, India
              </p>

              <p className="text-cyan-300 text-sm mt-3">
                View on Google Maps →
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition block"
            >
              <div className="text-5xl mb-5">
                📞
              </div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                Phone
              </h2>

              <p className="text-gray-300">
                +91 98765 43210
              </p>

              <p className="text-cyan-300 text-sm mt-3">
                Click to Call →
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:support@autoassist.com"
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition block"
            >
              <div className="text-5xl mb-5">
                ✉️
              </div>

              <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                Email
              </h2>

              <p className="text-gray-300">
                support@autoassist.com
              </p>

              <p className="text-cyan-300 text-sm mt-3">
                Send Email →
              </p>
            </a>

          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Send Us a Message
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />

              {/* Message */}
              <textarea
                rows="5"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="md:col-span-2 p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-cyan-400"
              />

            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-3 rounded-xl text-white font-bold hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </>
  );
}

export default Contact;