"use client";

import { useState } from "react";
import { BusinessProfileFormData } from "./types";
import { validateBusinessProfile } from "./validators";
import LocationPicker from "./LocationPicker";

interface Props {
  initialData?: BusinessProfileFormData;
  onSubmit: (data: BusinessProfileFormData) => Promise<void>;
  submitLabel?: string;
  disableName?: boolean;
}

export default function BusinessProfileForm({
  disableName,
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

  const [errors, setErrors] = useState<
    Partial<Record<keyof BusinessProfileFormData, string>>
  >({});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof BusinessProfileFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateBusinessProfile(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pt-10">
      {/* Name */}
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Business Name"
          disabled={disableName}
          className="w-full border rounded p-3"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-3"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded p-3"
        />
        {errors.phone_number && (
          <p className="text-sm text-red-600 mt-1">
            {errors.phone_number}
          </p>
        )}
      </div>

      {/* About */}
      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        placeholder="About"
        className="w-full border rounded p-3"
      />

      {/* Address */}
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border rounded p-3"
      />

      <input
        name="landmark"
        value={form.landmark}
        onChange={handleChange}
        placeholder="Landmark"
        className="w-full border rounded p-3"
      />

      <div>
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="w-full border rounded p-3"
        />
        {errors.pincode && (
          <p className="text-sm text-red-600 mt-1">
            {errors.pincode}
          </p>
        )}
      </div>

      <LocationPicker
        latitude={form.latitude ?? null}
        longitude={form.longitude ?? null}
        onChange={(lat, lng) =>
          setForm((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng
          }))
        }
      />

      <button
        suppressHydrationWarning
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
