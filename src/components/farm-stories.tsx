import Image from "next/image";

export default function FarmStories() {
  const stories = [
    {
      id: 1,
      title: "Porodica Petrović",
      description:
        "Paradajz iz Grocke. Već tri generacije uzgajamo organsko povrće na obroncima Fruške Gore. Naš paradajz je poznat po svom jedinstvenom ukusu.",
      image: "/images/farms/farm1.jpg",
      alt: "Porodica Petrović na svojoj farmi",
    },
    {
      id: 2,
      title: "Farma Sunčev breg",
      description:
        "Specijalizovani smo za proizvodnju organskog povrća. Naš paradajz i paprika su uzgajani na tradicionalan način, bez ikakvih hemikalija.",
      image: "/images/farms/farm2.jpg",
      alt: "Farma Sunčev breg",
    },
    {
      id: 3,
      title: "Pčelarstvo Medeni raj",
      description:
        "Naše pčele sakupljaju nektar sa livada punih divljeg cveća, stvarajući med koji je bogat prirodnim antioksidansima i mineralima.",
      image: "/images/farms/farm3.jpg",
      alt: "Pčelarstvo Medeni raj",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-4">
          Priče iz domaćinstava
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Upoznajte porodice koje sa ljubavlju uzgajaju proizvode koje donosimo
          na vaš sto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
                <button className="mt-4 text-green-600 font-medium hover:text-green-700">
                  Pročitaj više →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
