import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vincenzo Barbuto | Research Fellow",
  description: "Personal academic website of Vincenzo Barbuto, Research Fellow in Edge AI & Cyber-Physical Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${outfit.variable}`} suppressHydrationWarning>

        {/* Global Dynamic Aura Background */}
        <div className="global-fluid-bg">
          <div className="global-blob global-blob-1"></div>
          <div className="global-blob global-blob-2"></div>
          <div className="global-blob global-blob-3"></div>
        </div>

        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "4rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
