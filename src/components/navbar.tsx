"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo/logo.png"
              alt="Seoska korpa"
              className="h-16 w-auto"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-seoskaGreen transition-colors"
              aria-label={isMenuOpen ? "Zatvori meni" : "Otvori meni"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
            >
              Početna
            </Link>
            <Link
              href="/nase-korpe"
              className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
            >
              Naše korpe
            </Link>
            <Link
              href="/sastavi-korpu"
              className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
            >
              Sastavi svoju korpu
            </Link>
            <Link
              href="/kako-funkcionise"
              className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
            >
              Kako funkcioniše
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
            >
              Kontakt
            </Link>
            <Link href="/sastavi-korpu">
              <Button className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand">
                Poruči odmah
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Početna
              </Link>
              <Link
                href="/nase-korpe"
                className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Naše korpe
              </Link>
              <Link
                href="/sastavi-korpu"
                className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sastavi svoju korpu
              </Link>
              <Link
                href="/kako-funkcionise"
                className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kako funkcioniše
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
              <div className="px-4 py-2">
                <Link href="/sastavi-korpu">
                  <Button className="w-full bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand">
                    Poruči odmah
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
