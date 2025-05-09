import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BasketProps {
  id: string;
  name: string;
  description: string;
  contents: string[];
  price: string;
  image: string;
  persons: string;
}

const baskets: BasketProps[] = [
  {
    id: "mala",
    name: "Mala korpa",
    description: "Idealna za 1-2 osobe",
    contents: [
      "Paradajz (500g)",
      "Krastavac (2 kom)",
      "Zelena salata (1 glavica)",
      "Mladi luk (1 veza)",
      "Šargarepa (500g)",
      "Krompir (1kg)",
      "Jabuke (1kg)",
    ],
    price: "1500 RSD",
    image: "/images/baskets/small-basket.jpg",
    persons: "1-2 osobe",
  },
  {
    id: "velika",
    name: "Velika korpa",
    description: "Savršena za 2-3 osobe",
    contents: [
      "Paradajz (1kg)",
      "Krastavac (3 kom)",
      "Zelena salata (2 glavice)",
      "Mladi luk (2 veze)",
      "Šargarepa (1kg)",
      "Krompir (2kg)",
      "Jabuke (1.5kg)",
      "Paprika (500g)",
      "Tikvice (2 kom)",
    ],
    price: "2500 RSD",
    image: "/images/baskets/large-basket.jpg",
    persons: "2-3 osobe",
  },
  {
    id: "porodicna",
    name: "Porodična korpa",
    description: "Obilna korpa za 4-5 osoba",
    contents: [
      "Paradajz (2kg)",
      "Krastavac (5 kom)",
      "Zelena salata (3 glavice)",
      "Mladi luk (3 veze)",
      "Šargarepa (1.5kg)",
      "Krompir (3kg)",
      "Jabuke (2kg)",
      "Paprika (1kg)",
      "Tikvice (3 kom)",
      "Kupus (1 glavica)",
      "Brokoli (1 kom)",
      "Crni luk (1kg)",
    ],
    price: "3800 RSD",
    image: "/images/baskets/family-basket.jpg",
    persons: "4-5 osoba",
  },
];

const BasketCard: React.FC<BasketProps> = ({
  name,
  description,
  contents,
  price,
  image,
  persons,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 sm:h-56 md:h-64">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow bg-seoskaLightGreen">
        <h3 className="text-xl font-bold text-seoskaBrown mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-sm font-medium text-seoskaBrown mb-2">{persons}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-seoskaBrown mb-1">Sadržaj:</h4>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {contents.slice(0, 5).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            {contents.length > 5 && (
              <li className="text-seoskaGreen font-medium">
                + još {contents.length - 5} namirnica
              </li>
            )}
          </ul>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-seoskaBrown">{price}</span>
          </div>
          <Button variant="seoskaGreen" className="w-full group">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 group-hover:scale-110 transition-transform"
            >
              <path
                d="M3 6H5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dodaj u korpu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function NaseKorpePage() {
  return (
    <div className="bg-seoskaBeige min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-amatic text-seoskaBrown mb-4">
            Naše korpe
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Izaberite jednu od naših pažljivo sastavljenih korpi svežeg voća i
            povrća, direktno sa naših farmi do vašeg stola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {baskets.map((basket) => (
            <BasketCard key={basket.id} {...basket} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
