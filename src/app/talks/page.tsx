import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { talks } from "@/data/talks";
import TalksClient from "@/components/TalksClient";

export const metadata: Metadata = {
    title: "Talks | Vincenzo Barbuto",
    description: "Invited talks, presentations, and workshops by Vincenzo Barbuto.",
};

export default function TalksPage() {
    return (
        <SectionLayout
            title="Talks & Workshops"
            subtitle="Presentations I have given at conferences, seminars, and other events."
        >
            <TalksClient talks={talks} />
        </SectionLayout>
    );
}
