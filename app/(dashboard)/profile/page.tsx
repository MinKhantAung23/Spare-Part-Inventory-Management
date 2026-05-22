"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setPasswords({ current: "", new: "", confirm: "" });
        setTimeout(() => {
          setShowPasswordModal(false);
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: "error", text: "Failed to change password. Please check your current password." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-slate-50 via-gray-100 to-blue-50 flex items-center justify-center p-6 antialiased">
      {/* Profile Card Container */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 grid md:grid-cols-5">
        
        {/* Left Sidebar / Avatar Section */}
        <div className="md:col-span-2 bg-gradient-to-b from-slate-500 to-indigo-800 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 mx-auto mb-4 shadow-inner backdrop-blur-md">
              <span className="text-3xl font-bold text-white tracking-wider">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-indigo-200 text-sm mt-1">Verified Member</p>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Account Settings</h1>
              <span className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full border border-green-200">Active</span>
            </div>

            {/* Information Fields */}
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                <div className="text-base font-medium text-gray-800 bg-gray-50/70 border border-gray-100 rounded-xl px-4 py-3">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
                <div className="text-base font-medium text-gray-800 bg-gray-50/70 border border-gray-100 rounded-xl px-4 py-3">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-10 pt-6 border-t border-gray-100">
            <button
              onClick={() => { setMessage(null); setShowPasswordModal(true); }}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 transition-all duration-200 shadow-xs active:scale-[0.98]"
            >
              Update Password
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-red-600/10 active:scale-[0.98]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full border border-gray-100 transform transition-all scale-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-500 mt-1">Please enter your current credentials to update your password.</p>
            </div>

            {/* Custom UI Feedback Alert */}
            {message && (
              <div className={`p-3.5 mb-5 rounded-xl text-sm font-medium border ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800 border-green-200" 
                  : "bg-red-50 text-red-800 border-red-200"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setMessage(null); }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/10 transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}