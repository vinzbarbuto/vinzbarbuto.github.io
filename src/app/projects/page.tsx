import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLayout from "@/components/SectionLayout";
import { projects } from "@/data/projects";
import styles from "../page.module.css";

export const metadata: Metadata = {
    title: "Projects | Vincenzo Barbuto",
    description: "Research and open-source projects by Vincenzo Barbuto.",
};

export default function ProjectsPage() {
    return (
        <SectionLayout
            title="Projects"
            subtitle="My professional and academic projects, including open-source contributions."
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id} className={styles.previewCard}>
                        {/* Optimized Image Container */}
                        <div className={styles.previewImageWrapper}>
                            <Image
                                src={project.image || "/placeholder.webp"}
                                alt={project.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Content Container */}
                        <div className={styles.previewContent}>
                            <h3 className={styles.previewTitle}>{project.title}</h3>

                            <p className={styles.previewDesc}>
                                {project.description}
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto", paddingTop: "1rem" }}>
                                {project.tags.map(tag => (
                                    <span key={tag} className={styles.interestItem} style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", margin: 0 }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </SectionLayout>
    );
}
