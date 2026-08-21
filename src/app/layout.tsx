import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMEN | Nocturnal Elegance - Premium Luxury Sneakers",
  description: "Discover the exclusive LUMEN sneaker vault. Shop limited edition, ultra-premium footwear designed for nocturnal elegance and bespoke fitting.",
  keywords: ["luxury sneakers", "lumen", "premium footwear", "exclusive shoes", "nocturnal elegance", "bespoke sneakers"],
  openGraph: {
    title: "LUMEN | Luxury Sneaker Store",
    description: "Discover the exclusive LUMEN sneaker vault. Shop limited edition, ultra-premium footwear designed for nocturnal elegance.",
    type: "website",
    locale: "en_US",
    siteName: "LUMEN",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMEN | Nocturnal Elegance",
    description: "Shop limited edition, ultra-premium footwear designed for nocturnal elegance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-brand-dark text-brand-light antialiased flex flex-col">
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
