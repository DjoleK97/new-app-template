"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";

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

  const handleAddToCart = async () => {
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
      disabled={isLoading}
      className={`bg-seoskaGreen hover:bg-seoskaGreen/90 text-white ${className}`}
    >
      {isLoading ? "Dodaje se..." : "Dodaj u korpu"}
    </Button>
  );
}
