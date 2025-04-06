"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { isOrdersEnabled } from "@/utils/settings";
import { getSessionId } from "@/utils/session";

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

  console.log("AddToCartButton mounted for product:", productId);

  useEffect(() => {
    const checkOrdersStatus = async () => {
      try {
        console.log("Checking if orders are enabled...");
        const enabled = await isOrdersEnabled();
        console.log("Orders enabled status:", enabled);
        setOrdersEnabled(enabled);
      } catch (error) {
        console.error("Error checking orders status:", error);
        setOrdersEnabled(true); // Default to enabled if there's an error
      }
    };

    checkOrdersStatus();

    // Only log session ID on client side to avoid hydration issues
    if (typeof window !== "undefined") {
      // Use setTimeout to ensure this runs after hydration
      setTimeout(() => {
        const sessionId = getSessionId();
        console.log("Current session ID:", sessionId);
      }, 0);
    }
  }, []);

  const handleAddToCart = async () => {
    console.log("Clicked Add to Cart button");

    if (ordersEnabled === false) {
      console.log("Orders are disabled, not proceeding");
      return;
    }

    setIsLoading(true);
    console.log("Calling addToCart with:", {
      productId,
      quantity: initialQuantity,
      unit,
    });

    try {
      await addToCart(productId, initialQuantity, unit);
      console.log("✅ Proizvod uspešno dodat u korpu");
      alert("Proizvod je dodat u korpu!");
      // Temporarily comment out onSuccess to avoid silent overrides
      // onSuccess?.();
    } catch (error) {
      console.error("❌ Greška prilikom dodavanja u korpu:", error);
      let errorMessage = "";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null) {
        try {
          // Try to extract more detailed error information
          const errorObj = error as any;
          if (errorObj.code && errorObj.message) {
            errorMessage = `Code: ${errorObj.code}, Message: ${errorObj.message}`;
          } else {
            errorMessage = JSON.stringify(error);
          }
        } catch {
          errorMessage = JSON.stringify(error);
        }
      } else {
        errorMessage = String(error);
      }

      console.error("Error details:", errorMessage);
      alert("Došlo je do greške prilikom dodavanja u korpu: " + errorMessage);
      // Temporarily comment out onError to avoid silent overrides
      // onError?.(error as Error);
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
