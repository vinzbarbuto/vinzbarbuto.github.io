import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import ScrollProgress from "@/components/ScrollProgress";
import { profile } from "@/data/profile";
import "./globals.css";

// Display + body: one committed variable sans with inktraps and a grade axis.
// Geist Mono carries instrument-label texture on eyebrows, badges, and metadata.
const bricolage = Bricolage_Grotesque({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://vincenzobarbuto.com";
const SITE_TITLE = "Vincenzo Barbuto — Research Fellow in Edge AI & Cyber-Physical Systems";
const SITE_DESCRIPTION =
  "Vincenzo Barbuto is a Research Fellow at DIMES, University of Calabria, working on Edge AI, Edge Intelligence, Digital Twins, and Cyber-Physical Systems. Personal academic website with publications, projects, and talks.";
const OG_IMAGE = "https://res.cloudinary.com/dgec2pai8/image/upload/v1774537873/profile_oioxa3.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Vincenzo Barbuto",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Vincenzo Barbuto",
  authors: [{ name: "Vincenzo Barbuto", url: SITE_URL }],
  creator: "Vincenzo Barbuto",
  publisher: "Vincenzo Barbuto",
  keywords: [
    "Vincenzo Barbuto",
    "Vincenzo Barbuto UniCal",
    "Vincenzo Barbuto Calabria",
    "Vincenzo Barbuto DIMES",
    "Vincenzo Barbuto researcher",
    "Vincenzo Barbuto Edge AI",
    "Vincenzo Barbuto Digital Twins",
    "Vincenzo Barbuto PhD",
    "Edge AI",
    "Edge Intelligence",
    "Digital Twins",
    "Cyber-Physical Systems",
    "Internet of Things",
    "IoT",
    "Lingua Franca",
    "DIMES",
    "University of Calabria",
    "UniCal",
    "Research Fellow",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vincenzo Barbuto",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 1200,
        alt: "Vincenzo Barbuto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: profile.role,
  email: profile.email,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: profile.institution,
    url: "https://dimes.unical.it",
  },
  alumniOf: profile.education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.institution,
  })),
  knowsAbout: profile.interests,
  description: profile.bio,
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.scholar,
    profile.socials.scopus,
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: profile.name, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />

        {/* Global aurora background — mouse parallax + grain */}
        <AuroraBackground />

        {/* Top-of-page scroll progress bar */}
        <ScrollProgress />

        <Navbar />
        <main style={{ minHeight: "100vh", paddingTop: "4rem" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
