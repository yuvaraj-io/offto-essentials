"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SimpleInput() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-sm space-y-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />

      <p className="text-sm text-muted-foreground">
        Value: {value}
      </p>
    </div>
  );
}
