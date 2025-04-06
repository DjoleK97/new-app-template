"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md animate-in fade-in slide-in-from-top-5 duration-500">
      <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-start">
        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 text-green-500 hover:text-green-700"
          aria-label="Zatvori poruku"
        >
          ×
        </button>
      </div>
    </div>
  );
}
