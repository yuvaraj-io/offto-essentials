import React from "react";

export default function RateReviews() {
  return (
    <div className="mx-auto py-10 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">Rate &</span>
            <span className="bg-[#0658A8] text-white px-5 py-1 rounded">
              Reviews
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            See your Ratings and comments
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-pink-500">
            ★★★
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-lg p-6 flex gap-6"
          >
            {/* Avatar */}
            <img
              src={`https://randomuser.me/api/portraits/${
                i === 2 ? "women" : "men"
              }/${30 + i}.jpg`}
              className="h-14 w-14 rounded-full object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h3 className="font-medium">Amit Kumar</h3>
                <span className="text-sm text-gray-400">
                  4 days
                </span>
              </div>

              {/* Stars */}
              <div className="flex text-yellow-400 text-sm mb-2">
                ★ ★ ★ ★
              </div>

              <p className="text-sm text-gray-600 mb-3">
                This is the best hotel near by so many
                amenities.....
                <span className="text-blue-500 cursor-pointer">
                  {" "}
                  see more
                </span>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <span className="text-red-500 cursor-pointer">
                  ❤️
                </span>
                <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded text-sm">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
