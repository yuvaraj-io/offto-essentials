"use client";

import { useEffect, useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Button } from "@/components/ui/button";

export default function BankDetailsPage() {
  const { activeBusiness } = useBusiness();

  const [form, setForm] = useState({
    bank_account_number: "",
    bank_account_name: "",
    bank_account_type: "",
    bank_name: "",
    branch_name: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------- FETCH ---------- */
  useEffect(() => {
    if (!activeBusiness) return;

    const fetchData = async () => {
      const res = await fetch(
        `/api/business/bank-details/get?business_profile_id=${activeBusiness.id}`
      );
      const data = await res.json();

      if (data.data) {
        setForm({
          bank_account_number: data.data.bank_account_number,
          bank_account_name: data.data.bank_account_name,
          bank_account_type: data.data.bank_account_type,
          bank_name: data.data.bank_name,
          branch_name: data.data.branch_name
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [activeBusiness]);

  const update = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setError("");
  };

  const handleSave = async () => {
    if (Object.values(form).some((v) => !v.trim())) {
      setError("All fields are required");
      return;
    }

    setSaving(true);

    const res = await fetch(
      "/api/business/bank-details/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          business_profile_id: activeBusiness?.id
        })
      }
    );

    setSaving(false);

    if (!res.ok) {
      setError("Failed to save bank details");
      return;
    }

    alert("Bank details saved successfully");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white">
      <h1 className="text-xl font-bold">Bank Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          placeholder="Bank account number"
          className="border rounded px-4 py-2"
          value={form.bank_account_number}
          onChange={(e) =>
            update("bank_account_number", e.target.value)
          }
        />

        <input
          placeholder="Bank account name"
          className="border rounded px-4 py-2"
          value={form.bank_account_name}
          onChange={(e) =>
            update("bank_account_name", e.target.value)
          }
        />

        <input
          placeholder="Bank account type"
          className="border rounded px-4 py-2"
          value={form.bank_account_type}
          onChange={(e) =>
            update("bank_account_type", e.target.value)
          }
        />

        <input
          placeholder="Bank name"
          className="border rounded px-4 py-2"
          value={form.bank_name}
          onChange={(e) =>
            update("bank_name", e.target.value)
          }
        />

        <input
          placeholder="Branch name"
          className="border rounded px-4 py-2"
          value={form.branch_name}
          onChange={(e) =>
            update("branch_name", e.target.value)
          }
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex justify-center">
        <Button disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
