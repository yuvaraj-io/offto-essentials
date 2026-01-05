import React from "react";

export default function BusinessProfile() {
  return (
    <div className="max-w-5xl mx-auto bg-white">
      {/* Carousel / Cover Image */}
      <div className="relative h-56 w-full bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="cover"
          className="h-full w-full object-cover"
        />
        <button className="absolute top-4 right-4 bg-white px-3 py-1 text-sm rounded shadow">
          Add & edit picture
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex gap-4 px-6 pt-10 items-end">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="h-24 w-24 rounded-full border-4 border-white object-cover"
        />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">TGV Insurances</h1>
          <p className="text-sm text-gray-600">royal@gmail.com</p>
          <p className="text-sm text-gray-600">+91 1234567890</p>
          <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded">
            Domestic Travel Insurance
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        {/* Operating Hours */}
        <section>
          <h3 className="font-medium mb-2">Operating Hours</h3>
          <div className="flex gap-6 text-sm text-gray-700">
            <p>Mon - Fri : 9 AM – 6 PM</p>
            <p>Sat - Sun : 10 AM – 4 PM</p>
          </div>
        </section>

        {/* About */}
        <section>
          <h3 className="font-medium mb-2">About guide</h3>
          <textarea
            className="w-full border rounded p-3 text-sm"
            placeholder="Write about yourself"
            rows={3}
          />
        </section>

        {/* Location */}
        <section>
          <h3 className="font-medium mb-2">Location</h3>
          <p className="text-sm text-gray-600 mb-2">
            18th main, Sharjapur, Bangalore
          </p>
          <div className="h-48 w-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Google Map Placeholder
          </div>
        </section>

        {/* Address Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3 text-sm" placeholder="Address" />
          <input className="border rounded p-3 text-sm" placeholder="Landmark" />
          <input className="border rounded p-3 text-sm" placeholder="Pincode" />
        </section>

        {/* Uploads */}
        <section className="space-y-3">
          {[
            "Government ID Upload (Aadhaar/PAN/License)",
            "Guide Certification Upload",
            "Language Proficiency Proof"
          ].map((label) => (
            <div key={label}>
              <p className="text-sm mb-1">{label}</p>
              <button className="w-full border-dashed border-2 rounded py-4 text-sm text-gray-500">
                + Upload
              </button>
            </div>
          ))}
        </section>

        {/* Languages */}
        <section>
          <h3 className="font-medium mb-2">Languages known</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">
              English
            </span>
            <button className="px-3 py-1 border rounded text-sm">
              + Add new
            </button>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="font-medium mb-2">Experience Level</h3>
          <select className="border rounded p-3 text-sm w-full">
            <option>Beginner (0–2 years)</option>
            <option>Intermediate (2–5 years)</option>
            <option>Expert (5+ years)</option>
          </select>
        </section>

        {/* Save */}
        <div className="pt-4">
          <button className="w-full bg-black text-white py-3 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
