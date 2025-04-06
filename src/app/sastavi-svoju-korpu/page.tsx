"use client";

import { useState } from "react";
import ProductGrid from "@/components/product-grid";
import BasketSummary from "@/components/basket-summary";

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export default function SastaviSvojuKorpuPage() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const handleAddToCart = (product: any, quantity: number) => {
    if (quantity <= 0) return;

    // Check if the product is already in the basket
    const existingItemIndex = basketItems.findIndex(
      (item) => item.id === product.id,
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already exists in basket
      const updatedItems = [...basketItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setBasketItems(updatedItems);
    } else {
      // Add new product to basket
      setBasketItems([
        ...basketItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          unit: product.unit,
          image: product.image,
        },
      ]);
    }
  };

  const handleRemoveItem = (id: number) => {
    setBasketItems(basketItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setBasketItems(
      basketItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <main className="bg-seoskaBeige min-h-screen pb-16">
      {/* Hero section */}
      <section className="bg-seoskaGreen/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-amatic font-bold text-seoskaBrown mb-4">
            Sastavi svoju korpu
          </h1>
          <p className="text-lg md:text-xl font-quicksand text-gray-700 max-w-2xl mx-auto">
            Izaberi svoje omiljene proizvode i mi ćemo ih spakovati za tebe!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product grid section */}
          <div className="w-full lg:w-2/3">
            <ProductGrid onAddToCart={handleAddToCart} />
          </div>

          {/* Basket summary */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <BasketSummary
              items={basketItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
