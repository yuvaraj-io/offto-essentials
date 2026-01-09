"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const res = await fetch("/api/auth/users-login/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, new_password: password }),
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <AuthCard title="Reset Password">
      <div className="space-y-4">
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset password
        </button>
      </div>
    </AuthCard>
  );
}
