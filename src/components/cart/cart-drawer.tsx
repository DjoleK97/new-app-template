"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./cart-context";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function CartDrawer() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Format price to Serbian Dinar
  const formatPrice = (price: number) => {
    return `${price.toLocaleString("sr-RS")} RSD`;
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="relative p-2 text-seoskaWarmBrown hover:text-seoskaGreen transition-colors cart-icon">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-seoskaAccent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-seoskaBeige border-t border-seoskaEarth/20 max-h-[85vh] overflow-auto">
        <DrawerHeader className="border-b border-seoskaEarth/20 bg-white">
          <DrawerTitle className="text-seoskaWarmBrown font-amatic text-2xl">
            Vaša korpa
          </DrawerTitle>
        </DrawerHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <ShoppingCart className="h-12 w-12 text-seoskaWarmBrown/30 mb-4" />
            <p className="text-seoskaWarmBrown font-medium mb-2">
              Vaša korpa je prazna
            </p>
            <p className="text-seoskaWarmBrown/70 text-sm mb-6">
              Dodajte proizvode u korpu da biste nastavili sa kupovinom
            </p>
            <DrawerClose asChild>
              <Button
                variant="seoskaGreen"
                className="font-medium rounded-full"
              >
                Nastavi kupovinu
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-seoskaEarth/10"
                  >
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-seoskaWarmBeige flex-shrink-0">
                      <Image
                        src={
                          item.image_url || "/images/products/placeholder.jpg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-seoskaWarmBrown truncate pr-6">
                        {item.name}
                      </h4>
                      <p className="text-sm text-seoskaWarmBrown/70">
                        {formatPrice(item.price)} / {item.unit}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-seoskaEarth/20 rounded-full overflow-hidden bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-seoskaWarmBeige text-seoskaWarmBrown"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1 text-sm font-medium text-seoskaWarmBrown min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-seoskaWarmBeige text-seoskaWarmBrown"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-seoskaEarth/20 bg-white p-4">
              <div className="flex justify-between mb-2 text-sm text-seoskaWarmBrown/70">
                <span>Ukupno proizvoda:</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex justify-between mb-4 font-semibold text-seoskaWarmBrown">
                <span>Ukupna cena:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <DrawerFooter className="px-0 pt-2 pb-0">
                <div className="grid grid-cols-2 gap-3">
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="border-seoskaWarmGreen text-seoskaWarmGreen hover:bg-seoskaWarmGreen/10"
                    >
                      Nastavi kupovinu
                    </Button>
                  </DrawerClose>
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="seoskaGreen"
                      className="w-full font-medium"
                    >
                      Plaćanje
                    </Button>
                  </Link>
                </div>
                <Link
                  href="/cart"
                  className="text-center text-sm text-seoskaWarmGreen hover:text-seoskaWarmGreen/80 mt-2 block"
                  onClick={() => setIsOpen(false)}
                >
                  Pregledaj punu korpu
                </Link>
              </DrawerFooter>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
