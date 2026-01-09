"use client";

import { useEffect, useState } from "react";
import { useBusiness } from "@/context/BusinessContext";

const AGREEMENTS = [
  {
    title: "1. Complimentary Activity Requirement",
    text:
      "I understand that to apply for Offto Verify, I must offer the activity free of charge to the assigned Offtovalor."
  },
  {
    title: "2. Scope of Access",
    text:
      "I agree to allow the Offtovalor to fully experience the activity."
  },
  {
    title: "3. No Hidden Fees",
    text:
      "I confirm that no fees of any kind will be collected."
  },
  {
    title: "4. Safety & Standards",
    text:
      "I agree to maintain all safety measures and standards."
  },
  {
    title: "5. Professional Conduct",
    text:
      "I will ensure respectful and professional conduct."
  },
  {
    title: "6. Scheduling & Availability",
    text:
      "I will provide up to 5 date options for verification."
  },
  {
    title: "7. Media & Verification Rights",
    text:
      "I understand Offto may use visuals for verification."
  },
  {
    title: "8. No Guarantee of Approval",
    text:
      "I understand verification is not guaranteed."
  },
  {
    title: "9. Future Reverification",
    text:
      "I agree Offto may schedule future verifications."
  },
  {
    title: "10. Termination of Verification",
    text:
      "Offto reserves the right to revoke verified status."
  }
];

export default function OfftoVerify() {
  const { activeBusiness } = useBusiness();

  const [checked, setChecked] = useState<boolean[]>(
    Array(AGREEMENTS.length).fill(false)
  );
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- FETCH STATUS ---------- */
  useEffect(() => {
    if (!activeBusiness) return;

    const fetchStatus = async () => {
      const res = await fetch(
        `/api/business/offto-verify/status?business_profile_id=${activeBusiness.id}`
      );
      const data = await res.json();

      if (data.is_verified) {
        setIsVerified(true);
        setChecked(Array(AGREEMENTS.length).fill(true));
        setFinalConfirm(true);
      }

      setLoading(false);
    };

    fetchStatus();
  }, [activeBusiness]);

  const allChecked =
    checked.every(Boolean) && finalConfirm;

  const handleApply = async () => {
    setSubmitting(true);

    const res = await fetch(
      "/api/business/offto-verify/apply",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_profile_id: activeBusiness?.id
        })
      }
    );

    setSubmitting(false);

    if (!res.ok) {
      alert("Failed to apply for verification");
      return;
    }

    setIsVerified(true);
    alert("Applied for Offto Verify successfully");
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="mx-auto py-10 bg-white max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium">Offto</span>
            <span className="bg-[#0658A8] text-white px-4 py-1 rounded">
              Verify
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Apply for Offto verification and gain trust among customers
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-6 text-sm text-gray-700">
        {AGREEMENTS.map((item, index) => (
          <label
            key={item.title}
            className="flex gap-4 items-start"
          >
            <input
              type="checkbox"
              checked={checked[index]}
              disabled={isVerified}
              onChange={() => {
                const copy = [...checked];
                copy[index] = !copy[index];
                setChecked(copy);
              }}
              className="mt-1"
            />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600">{item.text}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Final Confirmation */}
      <div className="mt-10">
        <h3 className="font-medium mb-4">
          Final Confirmation
        </h3>

        <label className="flex gap-4 items-start text-sm">
          <input
            type="checkbox"
            checked={finalConfirm}
            disabled={isVerified}
            onChange={() =>
              setFinalConfirm(!finalConfirm)
            }
            className="mt-1"
          />
          <p>
            I agree to provide a complimentary experience
            and accept all Offto Verify terms.
          </p>
        </label>
      </div>

      {/* Submit */}
      {!isVerified && (
        <div className="flex justify-center mt-12">
          <button
            disabled={!allChecked || submitting}
            onClick={handleApply}
            className={`border px-8 py-2 rounded-md
              ${
                allChecked
                  ? "hover:bg-gray-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
          >
            {submitting
              ? "Applying..."
              : "Apply for Offto Verify"}
          </button>
        </div>
      )}
    </div>
  );
}
