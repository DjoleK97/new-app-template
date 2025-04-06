export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-12">
          Kontaktirajte nas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Informacije</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="/images/icons/map-pin.svg"
                    alt="Location"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Adresa</h4>
                  <p className="text-gray-600">
                    Zelena dolina 123, 21000 Novi Sad, Srbija
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="/images/icons/phone.svg"
                    alt="Phone"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-gray-600">+381 64 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="/images/icons/mail.svg"
                    alt="Email"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@seoskakorpa.rs</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <img
                    src="/images/icons/instagram.svg"
                    alt="Instagram"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Instagram</h4>
                  <p className="text-gray-600">@seoskakorpa</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Radno vreme</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Ponedeljak - Petak: 08:00 - 17:00
                </p>
                <p className="text-gray-600">Subota: 09:00 - 15:00</p>
                <p className="text-gray-600">Nedelja: Zatvoreno</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Pošaljite nam poruku
            </h3>

            <form className="space-y-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Unesite vašu poruku ovde..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Pošalji
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
