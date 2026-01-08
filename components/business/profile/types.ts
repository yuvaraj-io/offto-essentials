export interface BusinessProfileFormData {
  name: string;
  email: string;
  phone_number: string;
  about?: string;
  address?: string;
  landmark?: string;
  pincode?: string;
  latitude?: number | null;
  longitude?: number | null;
}
