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
      className={`bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-all ${className}`}
    >
      {ordersEnabled === false ? (
        "Poručivanje nije dostupno"
      ) : isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Dodaje se...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 11V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 11V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Dodaj u korpu
        </span>
      )}
    </Button>
  );
}
