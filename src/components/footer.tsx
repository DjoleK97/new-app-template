import Link from "next/link";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-green-600 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
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
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-600">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
