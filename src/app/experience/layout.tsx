import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience",
    description:
        "Academic and professional experience of Vincenzo Barbuto — research, teaching, and academic service in Edge AI, Digital Twins, and Cyber-Physical Systems.",
    alternates: { canonical: "/experience" },
    openGraph: {
        title: "Experience | Vincenzo Barbuto",
        description:
            "Academic and professional experience of Vincenzo Barbuto.",
        url: "/experience",
        type: "website",
    },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
