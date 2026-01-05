import React from "react";

export default function Messages() {
  return (
    <div className=" mx-auto pt-8 bg-white">
      {/* Header */}
      <h1 className="text-xl font-semibold text-center mb-8">
        Messages
      </h1>

      {/* Business Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="Hotel"
          className="h-14 w-14 rounded-full object-cover"
        />
        <h2 className="text-lg font-medium">Hotel Royal</h2>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search messages and person"
          className="w-full border rounded-lg py-2 pl-10 pr-3 text-sm"
        />
      </div>

      {/* Message List */}
      <div className="divide-y">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Amit Kumar</p>
                <p className="text-sm text-gray-500">
                  Hi, is your Hotel Pet Friendly
                </p>
              </div>
            </div>

            <span className="text-sm text-gray-400">Feb 4</span>
          </div>
        ))}
      </div>
    </div>
  );
}
