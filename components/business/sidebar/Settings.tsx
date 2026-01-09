"use client"
import React from "react";



export default function Settings() {

  const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });

  // Optional: clear local storage / context
  localStorage.clear();

  window.location.href = "/auth/business-login";
};


  return (
    <div className="max-w-5xl mx-auto p-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="inline-block bg-[#0658A8] text-white px-4 py-1 rounded mb-2">
            Settings
          </div>
          <p className="text-gray-400 text-sm">
            Apply your settings here
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-36 h-36 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            ⚙️
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4 text-sm max-w-sm">
        <p className="font-medium cursor-pointer">
          Admin Panel
        </p>

        <p className="cursor-pointer hover:underline">
          Reset Password
        </p>

        <p className="text-gray-600">
          partnersupport@offto.in
        </p>

        <p className="text-gray-600">
          91-xxxxxxx668
        </p>

        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
