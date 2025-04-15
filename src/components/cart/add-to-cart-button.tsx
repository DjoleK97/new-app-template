"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "./cart-context";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  price: number;
  image_url: string;
  unit: string;
  className?: string;
};

export default function AddToCartButton({
  productId,
  name,
  price,
  image_url,
  unit,
  className = "",
}: AddToCartButtonProps) {
  const { addItem, removeItem } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Create the cart item
    const item: CartItem = {
      id: productId,
      name,
      price,
      quantity: 1,
      image_url,
      unit,
    };

    // Add to cart
    addItem(item);

    // Show toast notification
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-seoskaGreen" />
          <span>Proizvod dodat u korpu</span>
        </div>
      ),
      description: name,
      action: (
        <ToastAction altText="Poništi" onClick={() => removeItem(productId)}>
          Poništi
        </ToastAction>
      ),
    });

    // Animate the button
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);

    // Animate product image flying to cart
    animateImageToCart();
  };

  const animateImageToCart = () => {
    // Get product image element
    const productImage = document.querySelector(
      `[data-product-id="${productId}"]`,
    );
    if (!productImage) return;

    // Get cart icon position
    const cartIcon = document.querySelector(".cart-icon");
    if (!cartIcon) return;

    // Create flying image element
    const flyingImage = document.createElement("img");
    flyingImage.src = image_url;
    flyingImage.className =
      "fixed pointer-events-none z-50 rounded-md object-cover shadow-md";
    flyingImage.style.width = "50px";
    flyingImage.style.height = "50px";

    // Get positions
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Set initial position
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.left = `${productRect.left}px`;

    // Add to DOM
    document.body.appendChild(flyingImage);

    // Animate
    setTimeout(() => {
      flyingImage.style.transition = "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)";
      flyingImage.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
      flyingImage.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
      flyingImage.style.opacity = "0.5";
      flyingImage.style.transform = "scale(0.3)";

      // Remove after animation
      setTimeout(() => {
        document.body.removeChild(flyingImage);
      }, 800);
    }, 10);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant="seoskaGreen"
      className={`font-medium transition-all ${className} ${isAdding ? "bg-seoskaGreen/80" : ""}`}
      disabled={isAdding}
    >
      {isAdding ? (
        <Check className="mr-2 h-4 w-4 animate-bounce" />
      ) : (
        <ShoppingCart className="mr-2 h-4 w-4" />
      )}
      {isAdding ? "Dodato" : "Dodaj u korpu"}
    </Button>
  );
}
