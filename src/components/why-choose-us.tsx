import { Leaf, ShieldCheck, Truck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-amatic font-bold text-center mb-12">
          Zašto Seoska korpa?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Neprskano i sveže</h3>
            <p className="text-gray-600">
              Svi naši proizvodi su uzgajani bez upotrebe pesticida i veštačkih
              đubriva, garantujući vam 100% svež i prirodan kvalitet.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Porodična proizvodnja
            </h3>
            <p className="text-gray-600">
              Naši proizvodi dolaze iz malih porodičnih domaćinstava koja neguju
              tradiciju i kvalitet u svakom koraku proizvodnje.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lokalno i domaće</h3>
            <p className="text-gray-600">
              Podržavamo lokalne proizvođače i domaću proizvodnju, čime
              doprinosimo održivosti naše zajednice i očuvanju tradicije.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-4 rounded-full mb-4">
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
                className="h-8 w-8 text-green-600"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Plaćanje pouzećem</h3>
            <p className="text-gray-600">
              Plaćate tek kada primite vašu porudžbinu, što vam daje dodatnu
              sigurnost i poverenje u naše proizvode i uslugu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
