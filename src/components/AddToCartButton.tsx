"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { isOrdersEnabled } from "@/utils/settings";

interface AddToCartButtonProps {
  productId: string;
  initialQuantity?: number;
  unit: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * A reusable button component for adding products to cart
 */
export default function AddToCartButton({
  productId,
  initialQuantity = 1,
  unit,
  className = "",
  onSuccess,
  onError,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [ordersEnabled, setOrdersEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOrdersStatus = async () => {
      try {
        const enabled = await isOrdersEnabled();
        setOrdersEnabled(enabled);
      } catch (error) {
        console.error("Error checking orders status:", error);
        setOrdersEnabled(true); // Default to enabled if there's an error
      }
    };

    checkOrdersStatus();
  }, []);

  const handleAddToCart = async () => {
    if (ordersEnabled === false) return;

    setIsLoading(true);

    try {
      await addToCart(productId, initialQuantity, unit);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || ordersEnabled === false}
      className={`bg-seoskaGreen hover:bg-seoskaGreen/90 text-white ${className}`}
    >
      {ordersEnabled === false
        ? "Poručivanje nije dostupno"
        : isLoading
          ? "Dodaje se..."
          : "Dodaj u korpu"}
    </Button>
  );
}
