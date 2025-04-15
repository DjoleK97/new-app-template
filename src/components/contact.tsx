import { Button } from "./ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-seoskaWarmBeige/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-8 text-seoskaWarmBrown">
          Kontaktirajte nas
        </h2>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-seoskaEarth/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-seoskaWarmBeige/50 p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-seoskaAccentLight/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-seoskaWarmGreen/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

              <h3 className="text-2xl font-amatic font-bold mb-6 text-seoskaWarmBrown relative z-10">
                Informacije
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-seoskaWarmGreen p-3 rounded-full mr-4 shadow-sm">
                    <img
                      src="/images/icons/map-pin.svg"
                      alt="Location"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seoskaWarmBrown">
                      Adresa
                    </h4>
                    <p className="text-gray-700">
                      Zelena dolina 123, 21000 Novi Sad, Srbija
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-seoskaWarmGreen p-3 rounded-full mr-4 shadow-sm">
                    <img
                      src="/images/icons/phone.svg"
                      alt="Phone"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seoskaWarmBrown">
                      Telefon
                    </h4>
                    <p className="text-gray-700">+381 64 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-seoskaWarmGreen p-3 rounded-full mr-4 shadow-sm">
                    <img
                      src="/images/icons/mail.svg"
                      alt="Email"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seoskaWarmBrown">
                      Email
                    </h4>
                    <p className="text-gray-700">info@seoskakorpa.rs</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-seoskaWarmGreen p-3 rounded-full mr-4 shadow-sm">
                    <img
                      src="/images/icons/instagram.svg"
                      alt="Instagram"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seoskaWarmBrown">
                      Instagram
                    </h4>
                    <p className="text-gray-700">@seoskakorpa</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-seoskaEarth/10">
                <h3 className="text-xl font-semibold mb-4 text-seoskaWarmBrown">
                  Radno vreme
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 flex justify-between">
                    <span>Ponedeljak - Petak:</span> <span>08:00 - 17:00</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    <span>Subota:</span> <span>09:00 - 15:00</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    <span>Nedelja:</span> <span>Zatvoreno</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <h3 className="text-2xl font-amatic font-bold mb-6 text-seoskaWarmBrown">
                Pošaljite nam poruku
              </h3>

              <form className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ime i prezime
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-seoskaEarth/20 rounded-xl focus:ring-2 focus:ring-seoskaWarmGreen focus:border-seoskaWarmGreen shadow-sm"
                      placeholder="Vaše ime i prezime"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email adresa
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-seoskaEarth/20 rounded-xl focus:ring-2 focus:ring-seoskaWarmGreen focus:border-seoskaWarmGreen shadow-sm"
                      placeholder="vasa.adresa@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Naslov
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-seoskaEarth/20 rounded-xl focus:ring-2 focus:ring-seoskaWarmGreen focus:border-seoskaWarmGreen shadow-sm"
                      placeholder="Naslov vaše poruke"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Poruka
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-seoskaEarth/20 rounded-xl focus:ring-2 focus:ring-seoskaWarmGreen focus:border-seoskaWarmGreen shadow-sm"
                      placeholder="Unesite vašu poruku ovde..."
                    ></textarea>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="seoskaGreen"
                  size="lg"
                  className="w-full font-medium group rounded-full"
                >
                  Pošalji poruku
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
