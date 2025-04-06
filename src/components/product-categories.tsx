import Link from "next/link";
import Image from "next/image";

type CategoryProps = {
  title: string;
  icon: string;
  href: string;
};

function CategoryCard({ title, icon, href }: CategoryProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-seoskaGreen group"
    >
      <div className="relative w-16 h-16 mb-3">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="font-quicksand font-medium text-gray-800 group-hover:text-seoskaGreen transition-colors">
        {title}
      </h3>
    </Link>
  );
}

export default function ProductCategories() {
  const categories = [
    {
      title: "Povrće",
      icon: "/images/categories/vegetable.svg",
      href: "/kategorije/povrce",
    },
    {
      title: "Jaja",
      icon: "/images/categories/eggs.svg",
      href: "/kategorije/jaja",
    },
    {
      title: "Brašno",
      icon: "/images/categories/flour.svg",
      href: "/kategorije/brasno",
    },
    {
      title: "Naše korpe",
      icon: "/images/categories/basket.svg",
      href: "/nase-korpe",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
