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
        variant="seoskaGreen"
        size="lg"
        className="w-full font-quicksand mt-4"
        disabled={ordersEnabled === false || isLoading}
      >
        {ordersEnabled === false ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 9L9 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Poručivanje nije dostupno
          </span>
        ) : isLoading ? (
          <span className="flex items-center justify-center gap-2">
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
            Učitavanje...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Završi porudžbinu
          </span>
        )}
      </Button>
    </div>
  );
}
