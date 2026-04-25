import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Publications",
    description:
        "Peer-reviewed publications by Vincenzo Barbuto on Edge AI, Edge Intelligence, Digital Twins, and Cyber-Physical Systems.",
    alternates: { canonical: "/publications" },
    openGraph: {
        title: "Publications | Vincenzo Barbuto",
        description:
            "Peer-reviewed research by Vincenzo Barbuto on Edge AI, Digital Twins, and Cyber-Physical Systems.",
        url: "/publications",
        type: "website",
    },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
