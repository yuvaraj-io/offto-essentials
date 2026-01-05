import React from "react";

export default function OfftoVerify() {
  return (
    <div className="mx-auto py-10 bg-white">
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
            Apply for offto verification and gain trust among customers
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl">
            ✓
          </div>
        </div>
      </div>

      {/* Intro */}
      <p className="text-sm text-gray-600 mb-6 max-w-3xl">
        Before applying for Offto Verify, please read and agree to the
        following terms. These terms help ensure a fair and genuine
        verification process for your property through trusted
        Offtovalors (verified travelers on Offto).
      </p>

      <h3 className="font-medium mb-6">
        Agreement Checklist (Mandatory)
      </h3>

      {/* Checklist */}
      <div className="space-y-6 text-sm text-gray-700">
        {[
          {
            title: "1. Complimentary Activity Requirement",
            text:
              "I understand that to apply for Offto Verify, I must offer the activity free of charge to the assigned Offtovalor for verification. This includes any equipment, entry, or guide fees associated with the experience.",
          },
          {
            title: "2. Scope of Access",
            text:
              "I agree to allow the Offtovalor to fully experience the activity, including safety briefings, preparation areas, equipment use, and the complete session as a normal participant would.",
          },
          {
            title: "3. No Hidden Fees",
            text:
              "I confirm that no fees of any kind — including entry, booking, or service fees — will be collected from the Offtovalor or the Offto team for the complimentary verification.",
          },
          {
            title: "4. Safety & Standards",
            text:
              "I agree to maintain all safety measures, equipment quality, and staff professionalism during the activity. The activity should be conducted in the same safe and enjoyable manner as for paying participants.",
          },
          {
            title: "5. Professional Conduct",
            text:
              "I will ensure that all staff and facilitators maintain a respectful and professional attitude toward the visiting Offtovalor.",
          },
          {
            title: "6. Scheduling & Availability",
            text:
              "I will provide up to 5 date options for verification. Once confirmed, I agree not to cancel or postpone unless due to weather or unavoidable operational issues.",
          },
          {
            title: "7. Media & Verification Rights",
            text:
              "I understand that Offtovalors may capture photos or short clips during the activity (where safe and permitted). These visuals may be used by Offto for authenticity verification and promotional purposes.",
          },
          {
            title: "8. No Guarantee of Approval",
            text:
              "I understand that providing a complimentary activity does not guarantee verification approval. Final decision rests on the Offtovalor’s feedback and Offto’s quality review.",
          },
          {
            title: "9. Future Reverification",
            text:
              "I agree that Offto may schedule future verification sessions (every 6–12 months) under the same complimentary terms to maintain verified status.",
          },
          {
            title: "10. Termination of Verification",
            text:
              "I understand that Offto reserves the right to revoke verified status if misrepresentation, poor safety, or non-compliance is detected.",
          },
        ].map((item) => (
          <label
            key={item.title}
            className="flex gap-4 items-start"
          >
            <input type="checkbox" className="mt-1" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600">{item.text}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Final Confirmation */}
      <div className="mt-10">
        <h3 className="font-medium mb-4">Final Confirmation</h3>

        <label className="flex gap-4 items-start text-sm text-gray-700">
          <input type="checkbox" className="mt-1" />
          <p>
            I agree to provide a complimentary stay of minimum 1 day
            and accept all Offto Verify terms and conditions.
          </p>
        </label>
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-12">
        <button className="border px-8 py-2 rounded-md hover:bg-gray-50">
          Apply for offto verify
        </button>
      </div>
    </div>
  );
}
