"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "./product-card";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Domaći paradajz",
    description: "Sveži paradajz iz našeg plastenika",
    price: 180,
    unit: "kg",
    image: "/images/products/tomato.jpg",
  },
  {
    id: 2,
    name: "Krastavac",
    description: "Sveži krastavci iz bašte",
    price: 150,
    unit: "kg",
    image: "/images/products/cucumber.jpg",
  },
  {
    id: 3,
    name: "Mladi luk",
    description: "Sveži mladi luk iz bašte",
    price: 80,
    unit: "veza",
    image: "/images/products/onion.jpg",
  },
  {
    id: 4,
    name: "Domaći krompir",
    description: "Organski krompir sa naše farme",
    price: 120,
    unit: "kg",
    image: "/images/products/potato.jpg",
  },
  {
    id: 5,
    name: "Paprika",
    description: "Slatka paprika iz našeg plastenika",
    price: 200,
    unit: "kg",
    image: "/images/products/pepper.jpg",
  },
  {
    id: 6,
    name: "Šargarepa",
    description: "Sveža šargarepa iz bašte",
    price: 130,
    unit: "kg",
    image: "/images/products/carrot.jpg",
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
