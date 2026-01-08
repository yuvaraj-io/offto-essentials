export interface SimServiceFormData {
  name: string;

  e_sim: boolean;

  passport_required: boolean;
  aadhar_required: boolean;
  photo_required: boolean;

  activation_time: string;

  home_delivery_option: boolean;

  pickup_latitude: number | null;
  pickup_longitude: number | null;

  sim_replace_availability: boolean;
}
