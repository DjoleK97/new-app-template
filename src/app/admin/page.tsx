import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  ShoppingBasket,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Panel - Seoska Korpa",
  description: "Admin panel za upravljanje proizvodima, korpama i porudžbinama",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-seoskaBeige">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center text-seoskaBrown hover:text-seoskaGreen transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Nazad na sajt</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <h1 className="text-2xl font-amatic font-bold text-seoskaBrown">
              Admin panel
            </h1>
          </div>
          <div>
            <Button variant="outline" className="text-sm">
              Odjavi se
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Card */}
          <AdminCard
            title="Proizvodi"
            description="Upravljajte proizvodima, dodajte nove, uredite postojeće ili uklonite proizvode iz ponude."
            icon={<Package className="h-8 w-8 text-seoskaGreen" />}
            href="/admin/products"
          />

          {/* Baskets Card */}
          <AdminCard
            title="Korpe"
            description="Kreirajte i upravljajte predefinisanim korpama koje su dostupne kupcima."
            icon={<ShoppingBasket className="h-8 w-8 text-seoskaGreen" />}
            href="/admin/baskets"
          />

          {/* Orders Card */}
          <AdminCard
            title="Porudžbine"
            description="Pregledajte i upravljajte porudžbinama kupaca, pratite status isporuke."
            icon={<ClipboardList className="h-8 w-8 text-seoskaGreen" />}
            href="/admin/orders"
          />
        </div>
      </main>
    </div>
  );
}

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function AdminCard({ title, description, icon, href }: AdminCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-seoskaGreen transition-colors">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-3 text-seoskaBrown">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6 text-sm">{description}</p>
      <Link href={href}>
        <Button className="w-full bg-seoskaGreen hover:bg-seoskaGreen/90 text-white">
          Otvori
        </Button>
      </Link>
    </div>
  );
}
