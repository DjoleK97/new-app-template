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
      className="flex flex-col items-center justify-center p-6 bg-seoskaWarmBeige rounded-2xl hover:shadow-md transition-all border border-transparent hover:border-seoskaWarmGreen/30 group"
    >
      <div className="relative w-20 h-20 mb-4 bg-white p-4 rounded-full shadow-sm border border-seoskaEarth/10">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain p-1 group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="font-quicksand font-medium text-seoskaWarmBrown text-lg group-hover:text-seoskaWarmGreen transition-colors">
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
    <section className="py-16 bg-seoskaWarmBeige/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-amatic text-center mb-8 text-seoskaWarmBrown">
          Kategorije proizvoda
        </h2>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-seoskaEarth/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-seoskaAccentLight/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-seoskaLightGreen/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
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
      </div>
    </section>
  );
}
