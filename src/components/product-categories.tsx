import Link from "next/link";

type CategoryProps = {
  title: string;
  emoji: string;
  href: string;
};

function CategoryCard({ title, emoji, href }: CategoryProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-seoskaGreen group"
    >
      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
        {emoji}
      </span>
      <h3 className="font-quicksand font-medium text-gray-800 group-hover:text-seoskaGreen transition-colors">
        {title}
      </h3>
    </Link>
  );
}

export default function ProductCategories() {
  const categories = [
    { title: "Povrće", emoji: "🥦", href: "/kategorije/povrce" },
    { title: "Jaja", emoji: "🥚", href: "/kategorije/jaja" },
    { title: "Brašno", emoji: "🌽", href: "/kategorije/brasno" },
    { title: "Naše korpe", emoji: "🧺", href: "/nase-korpe" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              emoji={category.emoji}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
