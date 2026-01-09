"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    await fetch("/api/auth/users-login/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_no: phone }),
    });

    setSent(true);
  };

  return (
    <AuthCard title="Forgot Password">
      {sent ? (
        <p className="text-sm text-green-600">
          Reset instructions sent to your phone
        </p>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send reset link
          </button>
        </div>
      )}
    </AuthCard>
  );
}
