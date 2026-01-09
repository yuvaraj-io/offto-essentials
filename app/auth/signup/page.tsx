"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";

export default function SignupPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/users-login/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_no: phone,
        password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Signup failed");
      setLoading(false);
      return;
    }

    router.push("/auth/login");
  };

  return (
    <AuthCard title="Create Account">
      <div className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600"
          >
            Login
          </button>
        </p>
      </div>
    </AuthCard>
  );
}
