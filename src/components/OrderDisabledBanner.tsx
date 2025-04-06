"use client";

import { useEffect, useState } from "react";
import { isOrdersEnabled } from "@/utils/settings";
import { AlertCircle } from "lucide-react";

export default function OrderDisabledBanner() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      try {
        console.log("Checking if orders are enabled...");
        const result = await isOrdersEnabled();
        console.log("Orders enabled result:", result);

        if (isMounted) {
          setEnabled(result);
          setDebugInfo(`Orders enabled: ${result}`);
        }
      } catch (error) {
        console.error("Error in OrderDisabledBanner:", error);
        if (isMounted) {
          setDebugInfo(
            `Error: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }
    };

    check();

    // Set up polling to check every 30 seconds
    const intervalId = setInterval(check, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Always show the banner in development mode for debugging
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return (
      <div className="w-full bg-red-500 text-white text-center py-2 px-4 font-semibold z-[9999] flex items-center justify-center gap-2 shadow-md fixed top-0 left-0 right-0">
        <AlertCircle className="h-5 w-5" />
        <span>
          Debug: {debugInfo || "Loading..."} | Enabled:{" "}
          {enabled === null ? "null" : String(enabled)}
        </span>
      </div>
    );
  }

  // Only show the banner when orders are disabled (enabled === false)
  if (enabled === null || enabled === true) return null;

  return (
    <div className="w-full bg-red-500 text-white text-center py-2 px-4 font-semibold z-[9999] flex items-center justify-center gap-2 shadow-md fixed top-0 left-0 right-0">
      <AlertCircle className="h-5 w-5" />
      <span>Porudžbine su trenutno onemogućene.</span>
    </div>
  );
}
