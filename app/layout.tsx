import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageFadeIn from "@/components/ui/PageFadeIn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sensora | Marketing Sensorial",
  description:
    "Conheça as velas aromáticas, sprays de ambiente, difusores de aroma e coleções da Sensora.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-white text-slate-900">
        <PageFadeIn>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PageFadeIn>
      </body>
    </html>
  );
}
