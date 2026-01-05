"use client";

import { useActionState, useState } from "react";
import { submitForm, FormState } from "@/actions/submit-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: FormState = {};

type FormValues = {
  name: string;
  email: string;
  pincode: string;
  address: string;
};

type FieldErrors = Partial<FormValues>;

export default function AddressForm() {
  const [state, formAction] = useActionState(submitForm, initialState);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    pincode: "",
    address: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(name: string, value: string) {
    let error = "";

    if (name === "name" && value.length < 3) {
      error = "Name must be at least 3 characters";
    }

    if (name === "email" && !value.includes("@")) {
      error = "Invalid email address";
    }

    if (name === "pincode" && !/^\d{6}$/.test(value)) {
      error = "Pincode must be 6 digits";
    }

    if (name === "address" && value.length < 10) {
      error = "Address must be at least 10 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  }

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <Input
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}

      <Input
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}

      <Input
        name="pincode"
        placeholder="Pincode"
        value={values.pincode}
        onChange={handleChange}
      />
      {errors.pincode && (
        <p className="text-sm text-destructive">{errors.pincode}</p>
      )}

      <Input
        name="address"
        placeholder="Address"
        value={values.address}
        onChange={handleChange}
      />
      {errors.address && (
        <p className="text-sm text-destructive">{errors.address}</p>
      )}

      {/* Server-side errors (on submit) */}
      {state.errors && (
        <p className="text-sm text-destructive">
          Please fix the errors before submitting
        </p>
      )}

      <Button type="submit">Submit</Button>

      {state.success && (
        <p className="text-sm text-green-600">
          Form submitted successfully
        </p>
      )}
    </form>
  );
}
