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
    <section className="py-16 bg-seoskaWarmBeige/30">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-seoskaEarth/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-seoskaAccentLight/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-seoskaWarmGreen/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          {/* Hand-drawn decorative element */}
          <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12,3 C16.5,3 20,6.5 20,11 C20,15.5 16.5,19 12,19 C7.5,19 4,15.5 4,11 C4,6.5 7.5,3 12,3 Z"
                stroke="#8AAD75"
                strokeWidth="0.5"
                strokeDasharray="4 2"
                fill="none"
              />
              <path
                d="M8,9 C9,10.5 10.5,11 12,11 C13.5,11 15,10.5 16,9"
                stroke="#8AAD75"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-4 text-seoskaWarmBrown relative z-10">
            Priče iz domaćinstava
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upoznajte porodice koje sa ljubavlju uzgajaju proizvode koje
            donosimo na vaš sto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-seoskaWarmBeige/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group border border-seoskaEarth/10 hover:border-seoskaWarmGreen/30"
              >
                <div className="relative h-56 w-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    <h3 className="text-xl font-semibold text-white">
                      {story.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {story.description.split(". ")[0]}.
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    {story.description.split(". ").slice(1).join(". ")}
                  </p>
                  <button className="mt-4 text-seoskaWarmGreen font-medium hover:text-seoskaAccent flex items-center gap-1 group-hover:gap-2 transition-all rounded-full py-1 px-2 hover:bg-seoskaWarmBeige">
                    Pročitaj više
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
