"use client";

import { useEffect, useState } from "react";
import { isOrdersEnabled } from "@/utils/settings";
import { Button } from "@/components/ui/button";

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function OrderButton({
  className = "",
  onClick = () => {},
  children = "Poruči",
}: OrderButtonProps) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      setIsLoading(true);
      try {
        const result = await isOrdersEnabled();
        setEnabled(result);
      } catch (error) {
        console.error("Error checking if orders are enabled:", error);
        setEnabled(true); // Default to enabled if there's an error
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, []);

  return (
    <Button
      className={`bg-seoskaGreen hover:bg-seoskaGreen/90 text-white ${className}`}
      disabled={enabled === false || isLoading}
      onClick={onClick}
    >
      {enabled === false
        ? "Poručivanje nije dostupno"
        : isLoading
          ? "Učitavanje..."
          : children}
    </Button>
  );
}
