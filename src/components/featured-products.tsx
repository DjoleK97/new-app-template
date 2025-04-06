import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

type ProductProps = {
  name: string;
  note: string;
  price: string;
  imageSrc: string;
};

function ProductCard({ name, note, price, imageSrc }: ProductProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={imageSrc} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-quicksand font-medium text-lg text-gray-800">
          {name}
        </h3>
        <p className="text-sm text-seoskaGreen mb-2">{note}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-gray-800">{price}</span>
          <Button className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white text-sm px-3 py-1 h-auto">
            Dodaj u korpu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const products = [
    {
      name: "Paradajz",
      note: "Ubran danas",
      price: "180 RSD",
      imageSrc:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
    },
    {
      name: "Domaća jaja",
      note: "Sveža",
      price: "250 RSD",
      imageSrc:
        "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&q=80",
    },
    {
      name: "Kukuruzno brašno",
      note: "Domaće",
      price: "220 RSD",
      imageSrc:
        "https://images.unsplash.com/photo-1604599886859-7aa3e5a43de2?w=500&q=80",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-amatic text-center mb-8">
          Istaknuti proizvodi
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seoskaGreen focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filteri
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              note={product.note}
              price={product.price}
              imageSrc={product.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
