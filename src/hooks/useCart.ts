"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CartItem,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from "@/lib/cart";
import { createClient } from "../../supabase/client";

/**
 * Custom hook for managing cart state and operations
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize Supabase client for realtime subscription
  const supabase = createClient();

  // Fetch cart items
  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cartItems = await getCartItems();
      setItems(cartItems);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching cart items:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      try {
        await updateCartItemQuantity(cartItemId, quantity);
        // The realtime subscription will update the items state
      } catch (err) {
        console.error("Error updating cart item quantity:", err);
        throw err;
      }
    },
    [],
  );

  // Remove item from cart
  const removeItem = useCallback(async (cartItemId: string) => {
    try {
      await removeCartItem(cartItemId);
      // The realtime subscription will update the items state
    } catch (err) {
      console.error("Error removing cart item:", err);
      throw err;
    }
  }, []);

  // Clear all items from cart
  const emptyCart = useCallback(async () => {
    try {
      await clearCart();
      // The realtime subscription will update the items state
    } catch (err) {
      console.error("Error clearing cart:", err);
      throw err;
    }
  }, []);

  // Calculate cart totals
  const cartTotal = items.reduce((sum, item) => {
    // This assumes you have a price field or can calculate the price
    // You might need to adjust this based on your actual data structure
    const itemPrice = item.price || 0; // Add price to CartItem interface if needed
    return sum + itemPrice * item.quantity;
  }, 0);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Set up realtime subscription
  useEffect(() => {
    fetchCartItems();

    // Subscribe to changes in the cart_items table
    const subscription = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cart_items" },
        () => {
          fetchCartItems();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchCartItems, supabase]);

  return {
    items,
    isLoading,
    error,
    updateQuantity,
    removeItem,
    emptyCart,
    cartTotal,
    itemCount,
    refreshCart: fetchCartItems,
  };
}
