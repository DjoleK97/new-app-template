import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-seoskaWarmBeige/50 border-t border-seoskaEarth/10 relative overflow-hidden">
      {/* Decorative background illustration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C30,20 70,20 100,0 L100,100 H0 Z" fill="#8AAD75"></path>
          <path
            d="M0,10 C30,30 70,30 100,10"
            stroke="#A9B18F"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="4 2"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* O nama Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-l-4 hover:border-l-seoskaWarmGreen border border-seoskaEarth/10">
            <h3 className="font-amatic text-2xl font-bold text-seoskaWarmBrown mb-4">
              O nama
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Naša priča
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Domaćinstva
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Proizvodi Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-l-4 hover:border-l-seoskaWarmGreen border border-seoskaEarth/10">
            <h3 className="font-amatic text-2xl font-bold text-seoskaWarmBrown mb-4">
              Proizvodi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Voće
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Povrće
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Mlečni proizvodi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Domaći proizvodi
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigacija Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-l-4 hover:border-l-seoskaWarmGreen border border-seoskaEarth/10">
            <h3 className="font-amatic text-2xl font-bold text-seoskaWarmBrown mb-4">
              Navigacija
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Početna
                </Link>
              </li>
              <li>
                <Link
                  href="/nase-korpe"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Naše korpe
                </Link>
              </li>
              <li>
                <Link
                  href="/kako-funkcionise"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Kako naručiti
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-700 hover:text-seoskaWarmGreen transition-colors flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Društvene mreže Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-l-4 hover:border-l-seoskaWarmGreen border border-seoskaEarth/10">
            <h3 className="font-amatic text-2xl font-bold text-seoskaWarmBrown mb-4">
              Društvene mreže
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="#"
                className="flex flex-col items-center p-3 bg-seoskaWarmBeige rounded-lg hover:bg-seoskaWarmGreen/20 transition-colors"
              >
                <img
                  src="/images/icons/instagram.svg"
                  alt="Instagram"
                  className="w-8 h-8 mb-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Instagram
                </span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center p-3 bg-seoskaWarmBeige rounded-lg hover:bg-seoskaWarmGreen/20 transition-colors"
              >
                <img
                  src="/images/icons/facebook.svg"
                  alt="Facebook"
                  className="w-8 h-8 mb-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Facebook
                </span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center p-3 bg-seoskaWarmBeige rounded-lg hover:bg-seoskaWarmGreen/20 transition-colors"
              >
                <img
                  src="/images/icons/twitter.svg"
                  alt="Twitter"
                  className="w-8 h-8 mb-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Twitter
                </span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center p-3 bg-seoskaWarmBeige rounded-lg hover:bg-seoskaWarmGreen/20 transition-colors"
              >
                <img
                  src="/images/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-8 h-8 mb-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  LinkedIn
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-seoskaEarth/10 bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-gray-700 mb-4 md:mb-0 font-medium">
            © {currentYear} Seoska korpa – Sva prava zadržana.
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-seoskaWarmBeige p-2 rounded-full hover:bg-seoskaWarmGreen/20 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <img
                src="/images/icons/facebook.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a
              href="#"
              className="bg-seoskaWarmBeige p-2 rounded-full hover:bg-seoskaWarmGreen/20 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <img
                src="/images/icons/instagram.svg"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a
              href="#"
              className="bg-seoskaWarmBeige p-2 rounded-full hover:bg-seoskaWarmGreen/20 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <img
                src="/images/icons/twitter.svg"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a
              href="#"
              className="bg-seoskaWarmBeige p-2 rounded-full hover:bg-seoskaWarmGreen/20 transition-colors"
            >
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
