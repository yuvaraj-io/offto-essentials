"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateConnectivitySimProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    about: "",
    address: "",
    landmark: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/essential-business/connectivity-sim/profile/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create profile");
        return;
      }

      // redirect back to dashboard
      router.push(
        "/business/trip-essentials/connectivity-and-sim-services"
      );
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Create Connectivity & SIM Business Profile
      </h1>

      {error && (
        <p className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Business Name"
          className="w-full border rounded p-3"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border rounded p-3"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          className="w-full border rounded p-3"
          value={form.phone_number}
          onChange={handleChange}
        />

        <textarea
          name="about"
          placeholder="About your business"
          rows={3}
          className="w-full border rounded p-3"
          value={form.about}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full border rounded p-3"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="landmark"
          placeholder="Landmark"
          className="w-full border rounded p-3"
          value={form.landmark}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          className="w-full border rounded p-3"
          value={form.pincode}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Saving..." : "Create Profile"}
        </button>
      </div>
    </div>
  );
}
