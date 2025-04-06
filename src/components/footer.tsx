import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* O nama Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">O nama</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Naša priča
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Domaćinstva
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Proizvodi Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Proizvodi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Voće
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Povrće
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Mlečni proizvodi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600">
                  Domaći proizvodi
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacije Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigacija</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Početna
                </Link>
              </li>
              <li>
                <Link
                  href="/nase-korpe"
                  className="text-gray-600 hover:text-green-600"
                >
                  Naše korpe
                </Link>
              </li>
              <li>
                <Link
                  href="/kako-funkcionise"
                  className="text-gray-600 hover:text-green-600"
                >
                  Kako naručiti
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-600 hover:text-green-600"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Pravne informacije Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Društvene mreže
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 flex items-center gap-2"
                >
                  <img
                    src="/images/icons/instagram.svg"
                    alt="Instagram"
                    className="w-4 h-4"
                  />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 flex items-center gap-2"
                >
                  <img
                    src="/images/icons/facebook.svg"
                    alt="Facebook"
                    className="w-4 h-4"
                  />
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {currentYear} Seoska korpa – Sva prava zadržana.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">Facebook</span>
              <img
                src="/images/icons/facebook.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">Instagram</span>
              <img
                src="/images/icons/instagram.svg"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">Twitter</span>
              <img
                src="/images/icons/twitter.svg"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">LinkedIn</span>
              <img
                src="/images/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
