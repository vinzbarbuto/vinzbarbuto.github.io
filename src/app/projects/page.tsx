import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { projects } from "@/data/projects";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Research and open-source projects by Vincenzo Barbuto in Edge AI, Digital Twins, and Cyber-Physical Systems.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "Projects | Vincenzo Barbuto",
        description: "Research and open-source projects by Vincenzo Barbuto.",
        url: "/projects",
        type: "website",
    },
};

export default function ProjectsPage() {
    return (
        <SectionLayout
            title="Projects"
            subtitle="My professional and academic projects, including open-source contributions."
        >
            <ProjectsClient projects={projects} />
        </SectionLayout>
    );
}
