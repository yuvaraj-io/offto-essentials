"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/users-login/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone_no: phone,
        password,
      }),
    });

    if (!res.ok) {
      setError("Invalid phone number or password");
      setLoading(false);
      return;
    }

    router.push(redirect);
  };

  return (
    <AuthCard title="Login">
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
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between text-sm">
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="text-blue-600"
          >
            Forgot password?
          </button>

          <button
            onClick={() => router.push("/auth/signup")}
            className="text-blue-600"
          >
            Create account
          </button>
        </div>
      </div>
    </AuthCard>
  );
}
