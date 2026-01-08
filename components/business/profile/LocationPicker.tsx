"use client";

interface Props {
  latitude: number | null;
  longitude: number | null;
  onChange: (lat: number, lng: number) => void;
}

export default function LocationPicker({
  latitude,
  longitude,
  onChange
}: Props) {
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      onChange(pos.coords.latitude, pos.coords.longitude);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={latitude ?? ""}
          readOnly
          placeholder="Latitude"
          className="border rounded p-2 w-full"
        />
        <input
          value={longitude ?? ""}
          readOnly
          placeholder="Longitude"
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleDetectLocation}
        className="text-sm text-blue-600"
      >
        Use current location
      </button>

      <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        Map placeholder (click → update lat/lng)
      </div>
    </div>
  );
}
