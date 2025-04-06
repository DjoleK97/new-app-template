import { ShoppingBasket, Package, Truck } from "lucide-react";

type StepProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
};

function OrderStep({ icon, title, description, step }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 flex items-center justify-center bg-seoskaGreen/10 text-seoskaGreen rounded-full mb-4">
        {icon}
      </div>
      <div className="text-sm font-medium text-seoskaGreen mb-2">
        Korak {step}
      </div>
      <h3 className="text-xl font-semibold font-quicksand mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-amatic text-center mb-12">
          Kako naručiti
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <OrderStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
