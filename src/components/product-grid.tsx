"use client";

import { useState } from "react";
import ProductCard from "./product-card";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Domaći paradajz",
    description: "Sveži paradajz iz našeg plastenika",
    price: 180,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
  },
  {
    id: 2,
    name: "Krastavac",
    description: "Sveži krastavci iz bašte",
    price: 150,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&q=80",
  },
  {
    id: 3,
    name: "Mladi luk",
    description: "Sveži mladi luk iz bašte",
    price: 80,
    unit: "veza",
    image:
      "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=500&q=80",
  },
  {
    id: 4,
    name: "Domaći krompir",
    description: "Organski krompir sa naše farme",
    price: 120,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80",
  },
  {
    id: 5,
    name: "Paprika",
    description: "Slatka paprika iz našeg plastenika",
    price: 200,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80",
  },
  {
    id: 6,
    name: "Šargarepa",
    description: "Sveža šargarepa iz bašte",
    price: 130,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80",
  },
];

interface ProductGridProps {
  onAddToCart?: (product: any, quantity: number) => void;
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    const quantity = quantities[productId] || 0;

    if (product && onAddToCart) {
      onAddToCart(product, quantity);

      // Reset quantity after adding to cart
      handleQuantityChange(productId, 0);
    } else {
      console.log(
        `Added product ${productId} to cart with quantity ${quantity}`,
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-amatic font-bold text-seoskaBrown mb-6">
        Naši proizvodi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 0}
            onQuantityChange={(quantity) =>
              handleQuantityChange(product.id, quantity)
            }
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
