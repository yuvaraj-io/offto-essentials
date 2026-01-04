    "use server";

export type FormState = {
  errors?: {
    name?: string;
    email?: string;
    pincode?: string;
    address?: string;
  };
  success?: boolean;
};

export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const pincode = formData.get("pincode") as string;
  const address = formData.get("address") as string;

  const errors: FormState["errors"] = {};

  if (!name || name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  if (!address || address.length < 10) {
    errors.address = "Address must be at least 10 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // ✅ success case (DB call later)
  return { success: true };
}
