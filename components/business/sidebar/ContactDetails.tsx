"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

export default function ContactDetailsPage() {
  const { activeBusiness } = useBusiness();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!activeBusiness) return;

    const fetchContact = async () => {
      const res = await fetch(
        `/api/business/contact-details/get?business_profile_id=${activeBusiness.id}`
      );
      const data = await res.json();

      if (res.ok && data.data) {
        setPhone(data.data.phone_number);
        setEmail(data.data.email);
      }

      setLoading(false);
    };

    fetchContact();
  }, [activeBusiness]);

  const handleSave = async () => {
    if (!phone.trim() || !email.trim()) {
      alert("Phone number and email are required");
      return;
    }

    setSaving(true);

    const res = await fetch(
      "/api/business/contact-details/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_profile_id: activeBusiness?.id,
          phone_number: phone,
          email
        })
      }
    );

    setSaving(false);

    if (!res.ok) {
      alert("Failed to save contact details");
      return;
    }

    alert("Contact details updated");
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-5xl p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">
          Contact Details
        </h1>
        <p className="text-sm text-gray-600">
          Please share your contact information for customer enquiries
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone number
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mail ID
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Save */}
      <div className="pt-6">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="px-10"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
