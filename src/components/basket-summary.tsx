"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { isOrdersEnabled } from "@/utils/settings";
import OrderDisabledBanner from "./OrderDisabledBanner";

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface BasketSummaryProps {
  items: BasketItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
}

export default function BasketSummary({
  items = [],
  onRemoveItem,
  onUpdateQuantity,
}: BasketSummaryProps) {
  const [ordersEnabled, setOrdersEnabled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOrdersStatus = async () => {
      setIsLoading(true);
      try {
        const enabled = await isOrdersEnabled();
        setOrdersEnabled(enabled);
      } catch (error) {
        console.error("Error checking orders status:", error);
        setOrdersEnabled(true); // Default to enabled if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    checkOrdersStatus();
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        <h2 className="text-2xl font-amatic font-bold text-seoskaBrown mb-4">
          Tvoja korpa
        </h2>
        <p className="text-gray-500 italic mb-4">
          Dodaj proizvode u korpu da vidiš sadržaj i ukupnu cenu.
        </p>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="flex justify-between font-semibold text-lg">
            <span>Ukupno:</span>
            <span>0 RSD</span>
          </p>
        </div>
        <Button
          className="w-full bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand py-3 px-4 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Završi porudžbinu
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-2xl font-amatic font-bold text-seoskaBrown mb-4">
        Tvoja korpa
      </h2>

      <OrderDisabledBanner />

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start border-b border-gray-100 pb-3"
          >
            <div className="flex-1">
              <h3 className="font-quicksand font-medium text-seoskaBrown">
                {item.name}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  {item.price} RSD / {item.unit}
                </span>
                <span className="mx-2 text-gray-400">×</span>
                <div className="flex items-center">
                  {onUpdateQuantity && (
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(item.quantity - 1, 0),
                        )
                      }
                      className="px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md focus:outline-none"
                      aria-label="Smanji količinu"
                      disabled={ordersEnabled === false}
                    >
                      -
                    </button>
                  )}
                  <span className="px-2 text-sm">{item.quantity}</span>
                  {onUpdateQuantity && (
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.min(item.quantity + 1, 10),
                        )
                      }
                      className="px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md focus:outline-none"
                      aria-label="Povećaj količinu"
                      disabled={ordersEnabled === false}
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium text-seoskaGreen">
                {item.price * item.quantity} RSD
              </span>
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                  disabled={ordersEnabled === false}
                >
                  Ukloni
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="flex justify-between font-semibold text-lg">
          <span>Ukupno:</span>
          <span>{totalPrice} RSD</span>
        </p>
      </div>

      <Button
        className="w-full bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand py-3 px-4 rounded-md mt-4"
        disabled={ordersEnabled === false || isLoading}
      >
        {ordersEnabled === false
          ? "Poručivanje nije dostupno"
          : isLoading
            ? "Učitavanje..."
            : "Završi porudžbinu"}
      </Button>
    </div>
  );
}
