import { ShoppingBasket, Package, Truck } from "lucide-react";

type StepProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
};

type StepProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isLast?: boolean;
};

function OrderStep({
  icon,
  title,
  description,
  step,
  isLast = false,
}: StepProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm relative hover:shadow-md transition-all border border-seoskaEarth/10 hover:border-seoskaWarmGreen/20 group">
      {/* Hand-drawn decorative circle behind icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-seoskaEarth/20 opacity-70"></div>

      <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-seoskaWarmGreen to-seoskaOlive text-white rounded-full mb-4 shadow-md z-10 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div className="absolute top-0 right-0 bg-seoskaAccent text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mt-2 mr-2 group-hover:bg-seoskaWarmBrown transition-colors">
        {step}
      </div>
      <h3 className="text-xl font-semibold font-quicksand mb-3 text-seoskaWarmBrown group-hover:text-seoskaWarmGreen transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-seoskaWarmGreen z-20 group-hover:translate-x-[60%] transition-transform">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-sm"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function HowToOrder() {
  const steps = [
    {
      icon: <ShoppingBasket size={28} />,
      title: "Izaberi svoje omiljene proizvode",
      description:
        "Pregledaj našu ponudu i odaberi proizvode koje želiš da poručiš.",
    },
    {
      icon: <Package size={28} />,
      title: "Mi ih beremo i pakujemo s pažnjom",
      description:
        "Sveže ubrano povrće i proizvodi se pažljivo pakuju za tebe.",
    },
    {
      icon: <Truck size={28} />,
      title: "Dostavljamo na dogovorenu lokaciju",
      description: "Tvoja korpa stiže na dogovorenu adresu u zakazano vreme.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-amatic text-center mb-8 text-seoskaWarmBrown">
          Kako naručiti
        </h2>

        <div className="bg-seoskaWarmBeige/50 p-8 rounded-3xl relative overflow-hidden">
          {/* Custom hand-drawn illustration background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C30,10 70,10 100,0 L100,100 C70,90 30,90 0,100 Z"
                fill="#8AAD75"
                fillOpacity="0.2"
              ></path>
              <path
                d="M0,0 C20,5 80,5 100,0 L100,100 C80,95 20,95 0,100 Z"
                stroke="#A9B18F"
                strokeWidth="0.5"
                strokeDasharray="3 2"
                fill="none"
              ></path>
            </svg>
          </div>

          {/* Connecting line for continuity - styled as hand-drawn */}
          <div
            className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-seoskaWarmGreen/30 z-0 transform -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, transparent, transparent 5px, currentColor 5px, currentColor 10px)",
            }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <OrderStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={index + 1}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
