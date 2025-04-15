"use client";

import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import AddToCartButton from "./AddToCartButton";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  is_featured: boolean;
  stock_quantity: number;
  unit: string;
  created_at: string;
};

type ProductCardProps = {
  id: string;
  name: string;
  note: string;
  price: string;
  imageSrc: string;
};

function ProductCard({ id, name, note, price, imageSrc }: ProductCardProps) {
  const handleAddToCartClick = () => {
    console.log("Manual button clicked for product:", id);
    alert(`Clicked Add to Cart for ${name}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-seoskaEarth/10 hover:shadow-lg transition-all group hover:border-seoskaWarmGreen/30">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute top-3 right-3 z-10 bg-seoskaAccent text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
          {note}
        </div>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Decorative corner element */}
        <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
          <div className="absolute w-16 h-16 bg-seoskaWarmBeige/70 rotate-45 transform origin-bottom-left"></div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-quicksand font-semibold text-lg text-seoskaWarmBrown mb-2">
          {name}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-seoskaWarmGreen text-lg">
            {price}
          </span>

          {/* Regular button for testing */}
          <Button
            onClick={handleAddToCartClick}
            variant="seoskaGreen"
            className="font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
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

          {/* Uncomment to test with AddToCartButton component */}
          {/* <AddToCartButton
            productId={id}
            unit="kom"
            className="text-sm px-4 py-2"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const supabase = createClient();

        // First try to fetch products that are marked as featured
        let { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_featured", true);

        // If no featured products found, fetch all products as fallback
        if (!error && (!data || data.length === 0)) {
          console.log(
            "No featured products found, fetching all products as fallback",
          );
          const result = await supabase.from("products").select("*").limit(6);

          data = result.data;
          error = result.error;
        }

        if (error) {
          console.error("Database error:", error);
          throw error;
        }

        if (data) {
          // Map the database products to the format expected by ProductCard
          const formattedProducts = data.map((product: Product) => ({
            id: product.id,
            name: product.name,
            note:
              product.description.substring(0, 20) +
              (product.description.length > 20 ? "..." : ""),
            price: `${product.price} RSD`,
            imageSrc: product.image_url || "/images/products/placeholder.jpg",
          }));

          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-seoskaWarmBeige/50">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-seoskaEarth/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-seoskaWarmGreen/10 rounded-full -ml-10 -mt-10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-seoskaAccentLight/20 rounded-full -mr-10 -mb-10 blur-2xl"></div>

          <h2 className="text-3xl md:text-4xl font-bold font-amatic text-center mb-8 text-seoskaWarmBrown relative z-10">
            Istaknuti proizvodi
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-seoskaWarmBeige p-4 rounded-xl relative z-10">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Pretraži proizvode..."
                className="w-full pl-10 pr-4 py-3 border border-seoskaEarth/20 rounded-full focus:outline-none focus:ring-2 focus:ring-seoskaWarmGreen focus:border-transparent shadow-sm"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-seoskaWarmGreen"
                size={18}
              />
            </div>

            <Button
              variant="outline"
              className="border-seoskaWarmGreen text-seoskaWarmGreen hover:bg-seoskaWarmBeige flex items-center gap-2 py-3 rounded-full"
            >
              <SlidersHorizontal size={16} />
              Filteri
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-seoskaWarmGreen border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-seoskaWarmBrown">
                Učitavanje proizvoda...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-seoskaWarmBrown">
              <p>Trenutno nema istaknutih proizvoda.</p>
              <p className="mt-2 text-sm">
                Dodajte proizvode kroz admin panel i označite ih kao istaknute.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  note={product.note}
                  price={product.price}
                  imageSrc={product.imageSrc}
                />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Button
              variant="seoskaGreen"
              size="xl"
              className="font-medium group transition-all rounded-full"
            >
              Pogledaj sve proizvode
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
