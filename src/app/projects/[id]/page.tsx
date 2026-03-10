import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
        notFound();
    }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 1.5rem" }}>
            <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "500", transition: "color 0.2s ease" }}>
                <ArrowLeft size={16} /> Back to Projects
            </Link>

            <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "1rem", overflow: "hidden", marginBottom: "3rem", backgroundColor: "var(--card-bg)" }}>
                <Image
                    src={withBasePath(proj.image || "/placeholder.webp")}
                    alt={proj.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem", lineHeight: "1.2" }}>
                {proj.title}
            </h1>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
                {proj.tags.map(tag => (
                    <span key={tag} style={{ padding: "0.4rem 1rem", fontSize: "0.875rem", backgroundColor: "var(--card-bg)", color: "var(--foreground)", borderRadius: "9999px", border: "1px solid var(--card-border)" }}>
                        {tag}
                    </span>
                ))}
            </div>

            <div style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem" }}>About the Project</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--secondary)" }}>
                    {proj.description}
                </p>
            </div>

            {proj.link && proj.link !== "#" && (
                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "500", transition: "background-color 0.2s ease" }}>
                        <ExternalLink size={18} /> Visit Project
                    </a>
                </div>
            )}
        </div>
    );
}
