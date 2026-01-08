"use client";

import { useState } from "react";
import { BusinessProfileFormData } from "./types";
import { validateBusinessProfile } from "./validators";
import LocationPicker from "./LocationPicker";

interface Props {
  initialData?: BusinessProfileFormData;
  onSubmit: (data: BusinessProfileFormData) => Promise<void>;
  submitLabel?: string;
}

export default function BusinessProfileForm({
  initialData,
  onSubmit,
  submitLabel = "Save"
}: Props) {
  const [form, setForm] = useState<BusinessProfileFormData>({
    name: "",
    email: "",
    phone_number: "",
    about: "",
    address: "",
    landmark: "",
    pincode: "",
    latitude: null,
    longitude: null,
    ...initialData
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const validationErrors = validateBusinessProfile(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Business Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" />

      <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" />

      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" />
      <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />

      <LocationPicker
        latitude={form.latitude ?? null}
        longitude={form.longitude ?? null}
        onChange={(lat, lng) =>
          setForm({ ...form, latitude: lat, longitude: lng })
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
