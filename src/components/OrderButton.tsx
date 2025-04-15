"use client";

import { useEffect, useState } from "react";
import { isOrdersEnabled } from "@/utils/settings";
import { Button } from "@/components/ui/button";

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function OrderButton({
  className = "",
  onClick = () => {},
  children = "Poruči",
}: OrderButtonProps) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      setIsLoading(true);
      try {
        const result = await isOrdersEnabled();
        setEnabled(result);
      } catch (error) {
        console.error("Error checking if orders are enabled:", error);
        setEnabled(true); // Default to enabled if there's an error
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, []);

  return (
    <Button
      className={`bg-seoskaGreen hover:bg-seoskaGreen/90 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-all ${className}`}
      disabled={enabled === false || isLoading}
      onClick={onClick}
    >
      {enabled === false ? (
        <span className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9L9 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Poručivanje nije dostupno
        </span>
      ) : isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Učitavanje...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0001 12V22H4.00006V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 7H2V12H22V7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7H16.2C16.6774 7 17.1353 6.78929 17.4728 6.41421C17.8104 6.03914 18 5.53043 18 5C18 4.46957 17.8104 3.96086 17.4728 3.58579C17.1353 3.21071 16.6774 3 16.2 3C13 3 12 7 12 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7H7.8C7.32261 7 6.86477 6.78929 6.52721 6.41421C6.18964 6.03914 6 5.53043 6 5C6 4.46957 6.18964 3.96086 6.52721 3.58579C6.86477 3.21071 7.32261 3 7.8 3C11 3 12 7 12 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {children}
        </span>
      )}
    </Button>
  );
}
