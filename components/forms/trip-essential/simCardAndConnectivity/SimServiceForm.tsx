"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationPicker from "@/components/business/profile/LocationPicker";
import { SimServiceFormData } from "./types";

interface Props {
  onSubmit: (data: SimServiceFormData) => Promise<void>;
  submitLabel?: string;
}

export default function SimServiceForm({
  onSubmit,
  submitLabel = "Save SIM Service"
}: Props) {
  const [form, setForm] = useState<SimServiceFormData>({
    name: "",
    e_sim: false,
    passport_required: false,
    aadhar_required: false,
    photo_required: false,
    activation_time: "",
    home_delivery_option: false,
    pickup_latitude: null,
    pickup_longitude: null,
    sim_replace_availability: false
  });

  const [loading, setLoading] = useState(false);

  const update = (
    key: keyof SimServiceFormData,
    value: any
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">

      {/* SIM Provider Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          SIM provider name
        </label>
        <input
          className="w-full border-b outline-none py-1"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      {/* SIM Type */}
      <div>
        <p className="text-sm font-medium mb-2">
          SIM type (Physical SIM / eSIM)
        </p>
        <label className="mr-6">
          <input
            type="checkbox"
            checked={!form.e_sim}
            onChange={() => update("e_sim", false)}
          />{" "}
          Physical SIM
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.e_sim}
            onChange={() => update("e_sim", true)}
          />{" "}
          eSIM
        </label>
      </div>

      {/* Required Documents */}
      <div>
        <p className="text-sm font-medium mb-2">
          Required documents
        </p>

        <label className="mr-4">
          <input
            type="checkbox"
            checked={form.passport_required}
            onChange={(e) =>
              update("passport_required", e.target.checked)
            }
          />{" "}
          Passport
        </label>

        <label className="mr-4">
          <input
            type="checkbox"
            checked={form.aadhar_required}
            onChange={(e) =>
              update("aadhar_required", e.target.checked)
            }
          />{" "}
          Aadhaar
        </label>

        <label>
          <input
            type="checkbox"
            checked={form.photo_required}
            onChange={(e) =>
              update("photo_required", e.target.checked)
            }
          />{" "}
          Photo
        </label>
      </div>

      {/* Activation Time */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Activation time
        </label>
        <input
          className="border-b outline-none py-1 w-48"
          placeholder="e.g. 30 minutes"
          value={form.activation_time}
          onChange={(e) =>
            update("activation_time", e.target.value)
          }
        />
      </div>

      {/* Pickup Location (REUSED COMPONENT) */}
      <div>
        <p className="text-sm font-medium mb-2">
          Pickup location
        </p>

        <LocationPicker
          latitude={form.pickup_latitude}
          longitude={form.pickup_longitude}
          onChange={(lat, lng) => {
            update("pickup_latitude", lat);
            update("pickup_longitude", lng);
          }}
        />
      </div>

      {/* Home Delivery */}
      <div>
        <p className="text-sm font-medium mb-2">
          Home delivery option
        </p>

        <label className="mr-6">
          <input
            type="radio"
            checked={form.home_delivery_option}
            onChange={() =>
              update("home_delivery_option", true)
            }
          />{" "}
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={!form.home_delivery_option}
            onChange={() =>
              update("home_delivery_option", false)
            }
          />{" "}
          No
        </label>
      </div>

      {/* SIM Replacement */}
      <div>
        <p className="text-sm font-medium mb-2">
          SIM replacement availability
        </p>

        <label className="mr-6">
          <input
            type="radio"
            checked={form.sim_replace_availability}
            onChange={() =>
              update("sim_replace_availability", true)
            }
          />{" "}
          Yes
        </label>

        <label>
          <input
            type="radio"
            checked={!form.sim_replace_availability}
            onChange={() =>
              update("sim_replace_availability", false)
            }
          />{" "}
          No
        </label>
      </div>

      {/* Submit */}
      <Button
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
}
