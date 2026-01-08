"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: "", // phone OR email
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload =
        /^\d+$/.test(form.identifier)
          ? { phone_no: form.identifier, password: form.password }
          : { email: form.identifier, password: form.password };

      const res = await fetch(
        "/api/auth/business-login/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Later: token → cookie / context
      router.push("/business/trip-essentials");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-semibold mb-4">
          Business Login
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Phone or Email
          </label>
          <input
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Phone number or email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() =>
              router.push("/auth/business-signup")
            }
            className="text-blue-600 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
