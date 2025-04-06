"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/AddToCartButton";
import { isAuthenticated } from "@/utils/auth";

/**
 * Example component demonstrating cart functionality
 */
export default function CartExample() {
  const {
    items,
    isLoading,
    error,
    updateQuantity,
    removeItem,
    emptyCart,
    itemCount,
  } = useCart();
  const [userStatus, setUserStatus] = useState<string>("");

  // Check if user is authenticated
  const checkAuthStatus = async () => {
    const authenticated = await isAuthenticated();
    setUserStatus(authenticated ? "Authenticated User" : "Guest User");
  };

  // Sample product for demonstration
  const sampleProduct = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Domaći paradajz",
    price: 180,
    unit: "kg",
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cart Example</h2>

      <div className="mb-6">
        <Button onClick={checkAuthStatus} className="mb-2">
          Check Authentication Status
        </Button>
        {userStatus && (
          <p className="text-sm font-medium">
            Status: <span className="text-seoskaGreen">{userStatus}</span>
          </p>
        )}
      </div>

      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">{sampleProduct.name}</h3>
        <p className="text-sm mb-4">
          {sampleProduct.price} RSD / {sampleProduct.unit}
        </p>

        <AddToCartButton
          productId={sampleProduct.id}
          unit={sampleProduct.unit}
          onSuccess={() => alert("Product added to cart!")}
          onError={(err) => alert(`Error: ${err.message}`)}
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          Cart Contents ({itemCount} items)
        </h3>

        {isLoading ? (
          <p>Loading cart...</p>
        ) : error ? (
          <p className="text-red-500">Error loading cart: {error.message}</p>
        ) : items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p className="font-medium">Product ID: {item.product_id}</p>
                  <p className="text-sm">
                    {item.quantity} {item.unit}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      item.id && updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </Button>

                  <span>{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      item.id && updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => item.id && removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <Button variant="outline" className="w-full" onClick={emptyCart}>
          Clear Cart
        </Button>
      )}
    </div>
  );
}
