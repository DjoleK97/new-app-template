"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient with softer, warmer contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-seoskaWarmBeige via-white to-seoskaEarth opacity-70" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-seoskaAccentLight rounded-full blur-3xl opacity-20 -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-seoskaLightGreen rounded-full blur-3xl opacity-20 -ml-20 -mb-20" />

      <div className="relative pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="font-amatic text-5xl sm:text-7xl font-bold text-seoskaWarmBrown mb-6 tracking-tight leading-tight">
                Priroda iz{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-seoskaWarmGreen to-seoskaOlive">
                  naše bašte
                </span>{" "}
                direktno u tvoju korpu
              </h1>

              <p className="font-quicksand text-xl text-gray-700 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Domaći proizvodi uzgajani sa ljubavlju i pažnjom.
                <br />
                Dostavljamo sveže namirnice direktno do vašeg praga.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
                <Link href="/sastavi-korpu">
                  <Button
                    variant="seoskaGreen"
                    size="xl"
                    className="font-medium text-lg shadow-md hover:shadow-lg group rounded-full transition-all"
                  >
                    Sastavi svoju korpu
                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/nase-korpe">
                  <Button
                    variant="outline"
                    size="xl"
                    className="text-seoskaWarmGreen border-seoskaWarmGreen hover:bg-seoskaWarmBeige text-lg font-medium group rounded-full transition-all"
                  >
                    Pogledaj naše korpe
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>

              <div className="mt-12 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-seoskaEarth/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-2 hover:bg-seoskaWarmBeige rounded-lg transition-colors">
                    <div className="bg-seoskaWarmGreen/20 p-2 rounded-full">
                      <Check className="w-5 h-5 text-seoskaWarmGreen" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      100% neprskani proizvodi
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-seoskaWarmBeige rounded-lg transition-colors">
                    <div className="bg-seoskaWarmGreen/20 p-2 rounded-full">
                      <Check className="w-5 h-5 text-seoskaWarmGreen" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Besplatna dostava
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-seoskaWarmBeige rounded-lg transition-colors">
                    <div className="bg-seoskaWarmGreen/20 p-2 rounded-full">
                      <Check className="w-5 h-5 text-seoskaWarmGreen" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      Podrška lokalnim farmerima
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              {/* Enhanced figure-ground contrast with decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-seoskaWarmGreen/10 rounded-full z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-seoskaAccentLight/30 rounded-full z-0"></div>

              {/* Hand-drawn decorative element */}
              <div className="absolute top-1/4 -left-5 z-0 text-seoskaEarth/30 transform -rotate-12">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-70"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                  />
                  <path
                    d="M8 12C8 9.79086 9.79086 8 12 8"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16C14.2091 16 16 14.2091 16 12"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="relative h-[350px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg bg-white p-4 z-10 border border-seoskaEarth/10">
                <Image
                  src="/images/hero/basket-hero.png"
                  alt="Sveža organska korpa povrća"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-seoskaAccent text-white p-4 rounded-2xl shadow-lg z-20 border border-white/20">
                <div className="font-bold text-lg">Novo u ponudi!</div>
                <div className="text-sm font-medium">
                  Sezonsko voće i povrće
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
