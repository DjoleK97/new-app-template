"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4e8] via-white to-[#e8f0dd] opacity-70" />

      <div className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="font-['Amatic_SC'] text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Priroda iz{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C9D65] to-[#5a7a43]">
                  naše bašte
                </span>{" "}
                direktno u tvoju korpu
              </h1>

              <p className="font-['Quicksand'] text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Domaći proizvodi uzgajani sa ljubavlju i pažnjom. Dostavljamo
                sveže namirnice direktno do vašeg praga.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <Link href="/sastavi-korpu">
                  <Button className="inline-flex items-center px-8 py-4 text-white bg-[#7C9D65] hover:bg-[#6a8a53] transition-colors text-lg font-medium">
                    Sastavi svoju korpu
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link
                  href="/nase-korpe"
                  className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  Pogledaj naše korpe
                </Link>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#7C9D65]" />
                  <span>100% neprskani proizvodi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#7C9D65]" />
                  <span>Besplatna dostava</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#7C9D65]" />
                  <span>Podrška lokalnim farmerima</span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2 relative">
              <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/basket-hero.png"
                  alt="Sveža organska korpa povrća"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                <div className="text-[#7C9D65] font-bold text-lg">
                  Novo u ponudi!
                </div>
                <div className="text-sm">Sezonsko voće i povrće</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
