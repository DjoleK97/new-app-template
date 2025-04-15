"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  quantity = 0,
  onQuantityChange,
  onAddToCart,
}: ProductCardProps) {
  const { name, description, price, unit, image } = product;

  const handleIncrement = () => {
    if (typeof onQuantityChange === "function") {
      onQuantityChange(Math.min(quantity + 1, 10));
    }
  };

  const handleDecrement = () => {
    if (typeof onQuantityChange === "function") {
      onQuantityChange(Math.max(quantity - 1, 0));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-quicksand font-semibold text-seoskaBrown">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <p className="text-seoskaGreen font-semibold mt-2">
          {price} RSD / {unit}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none"
              aria-label="Smanji količinu"
            >
              -
            </button>
            <span className="px-3 py-1 text-center w-10">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none"
              aria-label="Povećaj količinu"
            >
              +
            </button>
          </div>
          <Button
            onClick={() =>
              typeof onAddToCart === "function" ? onAddToCart() : null
            }
            disabled={quantity === 0}
            variant="seoskaGreen"
            className="group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1.5 group-hover:scale-110 transition-transform"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dodaj
          </Button>
        </div>
      </div>
    </div>
  );
}
