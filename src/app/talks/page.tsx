import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { talks } from "@/data/talks";
import TalksClient from "@/components/TalksClient";

export const metadata: Metadata = {
    title: "Talks",
    description:
        "Invited talks and conference presentations by Vincenzo Barbuto on Edge AI, Digital Twins, and Cyber-Physical Systems.",
    alternates: { canonical: "/talks" },
    openGraph: {
        title: "Talks | Vincenzo Barbuto",
        description: "Invited talks and presentations by Vincenzo Barbuto.",
        url: "/talks",
        type: "website",
    },
};

export default function TalksPage() {
    return (
        <SectionLayout
            title="Talks"
            subtitle="Presentations I have given at conferences, seminars, and other events."
        >
            <TalksClient talks={talks} />
        </SectionLayout>
    );
}
