import { Leaf, ShieldCheck, Truck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative background illustration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,30 Q25,10 50,30 T100,30 V100 H0 Z" fill="#8AAD75"></path>
          <path
            d="M0,40 Q25,20 50,40 T100,40"
            stroke="#A9B18F"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="4 2"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-12 text-seoskaWarmBrown">
          Zašto Seoska korpa?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:bg-seoskaWarmBeige border border-seoskaEarth/10 hover:border-seoskaWarmGreen/20 group">
            <div className="bg-seoskaWarmGreen/10 p-4 rounded-full mb-4 group-hover:scale-105 transition-transform">
              <Leaf className="h-8 w-8 text-seoskaWarmGreen" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-seoskaWarmBrown group-hover:text-seoskaWarmGreen transition-colors">
              Neprskano i sveže
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Svi naši proizvodi su uzgajani bez pesticida i veštačkih đubriva.
              <br />
              100% svež i prirodan kvalitet.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:bg-seoskaWarmBeige border border-seoskaEarth/10 hover:border-seoskaWarmGreen/20 group">
            <div className="bg-seoskaWarmGreen/10 p-4 rounded-full mb-4 group-hover:scale-105 transition-transform">
              <Truck className="h-8 w-8 text-seoskaWarmGreen" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-seoskaWarmBrown group-hover:text-seoskaWarmGreen transition-colors">
              Porodična proizvodnja
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Naši proizvodi dolaze iz malih porodičnih domaćinstava koja neguju
              tradiciju i kvalitet u svakom koraku proizvodnje.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:bg-seoskaWarmBeige border border-seoskaEarth/10 hover:border-seoskaWarmGreen/20 group">
            <div className="bg-seoskaWarmGreen/10 p-4 rounded-full mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-8 w-8 text-seoskaWarmGreen" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-seoskaWarmBrown group-hover:text-seoskaWarmGreen transition-colors">
              Lokalno i domaće
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Podržavamo lokalne proizvođače i domaću proizvodnju, čime
              doprinosimo održivosti naše zajednice i očuvanju tradicije.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:bg-seoskaWarmBeige border border-seoskaEarth/10 hover:border-seoskaWarmGreen/20 group">
            <div className="bg-seoskaWarmGreen/10 p-4 rounded-full mb-4 group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-seoskaWarmGreen"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-seoskaWarmBrown group-hover:text-seoskaWarmGreen transition-colors">
              Plaćanje pouzećem
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Plaćate tek kada primite vašu porudžbinu, što vam daje dodatnu
              sigurnost i poverenje u naše proizvode i uslugu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
