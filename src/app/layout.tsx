import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalMessage from "@/components/global-message";
import OrderDisabledBanner from "@/components/OrderDisabledBanner";
import { CartProvider } from "@/components/cart/cart-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Seoska Korpa - Priroda iz naše bašte",
  description:
    "Domaći proizvodi uzgajani sa ljubavlju i pažnjom. Dostavljamo sveže namirnice direktno do vašeg praga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className="font-quicksand pt-10">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <OrderDisabledBanner />
            <GlobalMessage />
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
