import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Use Inter (from your JS version)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elevate Events GmbH - Luxury Lounge & Events",
  description:
    "Experience the pinnacle of nightlife. The evolution of Tribe Music & Smoking Lounge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-charcoal text-beige`}>
        <Header />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
