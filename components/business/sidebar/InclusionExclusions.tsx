"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useBusiness } from "@/context/BusinessContext";

export default function InclusionExclusionPage() {
  const { activeBusiness } = useBusiness();

  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!activeBusiness) return;

    const fetchData = async () => {
      const res = await fetch(
        `/api/business/inclusion-exclusion/get?business_profile_id=${activeBusiness.id}`
      );
      const data = await res.json();

      if (res.ok && data.data) {
        setInclusions(data.data.inclusions);
        setExclusions(data.data.exclusions);
      }

      setLoading(false);
    };

    fetchData();
  }, [activeBusiness]);

  const handleSave = async () => {
    if (!inclusions.trim() || !exclusions.trim()) {
      alert("Both fields are required");
      return;
    }

    setSaving(true);

    const res = await fetch(
      "/api/business/inclusion-exclusion/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_profile_id: activeBusiness?.id,
          inclusions,
          exclusions
        })
      }
    );

    setSaving(false);

    if (!res.ok) {
      alert("Failed to save");
      return;
    }

    alert("Saved successfully");
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-4xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">
          Inclusion & Exclusions
        </h1>
        <p className="text-sm text-gray-600">
          Write about your inclusion and exclusion
        </p>
      </div>

      {/* Inclusion */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Inclusion
        </label>
        <textarea
          className="w-full rounded border p-3 min-h-[120px]"
          value={inclusions}
          onChange={(e) => setInclusions(e.target.value)}
        />
      </div>

      {/* Exclusion */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Exclusion
        </label>
        <textarea
          className="w-full rounded border p-3 min-h-[120px]"
          value={exclusions}
          onChange={(e) => setExclusions(e.target.value)}
        />
      </div>

      {/* Save */}
      <div className="flex justify-center pt-6">
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
