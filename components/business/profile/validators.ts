import { BusinessProfileFormData } from "./types";

export function validateBusinessProfile(
  data: BusinessProfileFormData
) {
  const errors: Partial<Record<keyof BusinessProfileFormData, string>> = {};

  if (!data.name?.trim()) {
    errors.name = "Business name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  }

  if (!data.phone_number?.trim()) {
    errors.phone_number = "Phone number is required";
  }

  if (data.pincode && !/^\d{6}$/.test(data.pincode)) {
    errors.pincode = "Invalid pincode";
  }

  return errors;
}
