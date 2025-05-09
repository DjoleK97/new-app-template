"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { createClient } from "../../supabase/client";
import { CartDrawer } from "./cart/cart-drawer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render auth buttons or user profile based on auth state
  const renderAuthSection = () => {
    if (loading) {
      // Return a placeholder with the same width to prevent layout shift
      return <div className="w-[120px] h-8"></div>;
    }

    if (user) {
      return <UserProfile />;
    }

    return (
      <>
        <Link
          href="/sign-in"
          className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
        >
          Prijava
        </Link>
        <Link
          href="/sign-up"
          className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
        >
          Registracija
        </Link>
      </>
    );
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

          {/* Mobile Menu Button and Cart Icon */}
          <div className="md:hidden flex items-center gap-4">
            <CartDrawer />
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

            {/* Cart, Order button and auth section in correct order */}
            <div className="flex items-center space-x-4">
              <CartDrawer />
              <Link href="/sastavi-korpu">
                <Button className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand">
                  Poruči odmah
                </Button>
              </Link>
              {renderAuthSection()}
            </div>
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

              {/* Auth section for mobile */}
              <div className="px-4 py-2 flex flex-col space-y-4">
                <Link href="/sastavi-korpu">
                  <Button className="w-full bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-quicksand">
                    Poruči odmah
                  </Button>
                </Link>

                {loading ? (
                  <div className="h-8"></div>
                ) : user ? (
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      Moj nalog
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Prijava
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-gray-700 hover:text-seoskaGreen font-quicksand transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registracija
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
