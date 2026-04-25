import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { projects } from "@/data/projects";
import { withBasePath } from "@/lib/basePath";

export function generateStaticParams() {
    return projects.map((proj) => ({
        id: proj.id,
    }));
}

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const proj = projects.find((p) => p.id === params.id);

    if (!proj) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Project not found.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "6rem 1.5rem" }}>
            {/* Back link */}
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)", textDecoration: "none", marginBottom: "2.5rem", fontWeight: "500", transition: "color 0.2s ease" }}>
                <ArrowLeft size={16} /> Back to Projects
            </Link>

            {/* Hero image — scales to natural aspect ratio */}
            {proj.image && (
                <div style={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    marginBottom: "3rem",
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}>
                    {/* Use a regular <img> so height is driven by the natural image size */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={withBasePath(proj.image)}
                        alt={proj.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "320px",
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                        }}
                    />
                </div>
            )}

            {/* Title */}
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "700", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem", lineHeight: "1.2" }}>
                {proj.title}
            </h1>

            {/* Meta row: period + tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "2.5rem" }}>
                {proj.period && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.9rem", fontSize: "0.85rem", backgroundColor: "rgba(255,255,255,0.05)", color: "var(--secondary)", borderRadius: "9999px", border: "1px solid var(--card-border)" }}>
                        <Calendar size={13} />
                        {proj.period}
                    </span>
                )}
                {proj.tags.map(tag => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.9rem", fontSize: "0.85rem", backgroundColor: "var(--card-bg)", color: "var(--foreground)", borderRadius: "9999px", border: "1px solid var(--card-border)" }}>
                        <Tag size={12} />
                        {tag}
                    </span>
                ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "4rem", padding: "2rem", backgroundColor: "var(--card-bg)", borderRadius: "1rem", border: "1px solid var(--card-border)" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem" }}>About the Project</h2>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "var(--secondary)" }}>
                    {proj.description}
                </p>
            </div>

            {/* External link */}
            {proj.link && proj.link !== "#" && (
                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.75rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "600", fontSize: "1rem", transition: "background-color 0.2s ease" }}>
                        <ExternalLink size={18} /> Visit Project
                    </a>
                </div>
            )}
        </div>
    );
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const proj = projects.find((p) => p.id === params.id);
    if (!proj) {
        return { title: "Project" };
    }
    const description = proj.description.length > 200 ? `${proj.description.slice(0, 197)}…` : proj.description;
    const image = proj.image || "/placeholder.webp";
    return {
        title: proj.title,
        description,
        alternates: { canonical: `/projects/${proj.id}` },
        keywords: ["Vincenzo Barbuto", ...proj.tags],
        openGraph: {
            type: "article",
            title: proj.title,
            description,
            url: `/projects/${proj.id}`,
            images: [{ url: image, alt: proj.title }],
            authors: ["Vincenzo Barbuto"],
        },
        twitter: {
            card: "summary_large_image",
            title: proj.title,
            description,
            images: [image],
        },
    };
}
