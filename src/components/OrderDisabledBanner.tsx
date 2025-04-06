"use client";

import { useEffect, useState } from "react";
import { isOrdersEnabled } from "@/utils/settings";
import { AlertCircle } from "lucide-react";

export default function OrderDisabledBanner() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const result = await isOrdersEnabled();
      setEnabled(result);
    };
    check();
  }, []);

  if (enabled === null || enabled) return null;

  return (
    <div className="bg-red-100 border border-red-200 text-red-800 text-center p-3 font-semibold rounded-md my-4 flex items-center justify-center gap-2">
      <AlertCircle className="h-5 w-5" />
      <span>Porudžbine su trenutno onemogućene.</span>
    </div>
  );
}
