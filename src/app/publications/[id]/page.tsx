import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { publications } from "@/data/publications";
import { withBasePath } from "@/lib/basePath";
import CiteButton from "@/components/CiteButton";

const SITE_URL = "https://vincenzobarbuto.com";

export function generateStaticParams() {
    return publications.map((pub) => ({
        id: pub.id,
    }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const pub = publications.find((p) => p.id === params.id);
    if (!pub) {
        return { title: "Publication" };
    }
    const description = pub.abstract.length > 200 ? `${pub.abstract.slice(0, 197)}…` : pub.abstract;
    const image = pub.image || `${SITE_URL}/placeholder.webp`;
    return {
        title: pub.title,
        description,
        alternates: { canonical: `/publications/${pub.id}` },
        openGraph: {
            type: "article",
            title: pub.title,
            description,
            url: `/publications/${pub.id}`,
            images: [{ url: image, alt: pub.title }],
            authors: ["Vincenzo Barbuto"],
            publishedTime: `${pub.year}-01-01`,
        },
        twitter: {
            card: "summary_large_image",
            title: pub.title,
            description,
            images: [image],
        },
        keywords: ["Vincenzo Barbuto", ...pub.tags, pub.venue, pub.type],
    };
}

export default async function PublicationDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const pub = publications.find((p) => p.id === params.id);

    if (!pub) {
        notFound();
    }

    const articleLd = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: pub.title,
        name: pub.title,
        abstract: pub.abstract,
        datePublished: `${pub.year}`,
        author: pub.authors.split(",").map((a) => ({ "@type": "Person", name: a.trim() })),
        keywords: pub.tags.join(", "),
        isPartOf: { "@type": "Periodical", name: pub.venue },
        url: `${SITE_URL}/publications/${pub.id}`,
        image: pub.image || undefined,
        sameAs: [pub.links.url, pub.links.doi, pub.links.pdf].filter(Boolean),
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 1.5rem" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
            />
            <Link href="/publications" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "500", transition: "color 0.2s ease" }}>
                <ArrowLeft size={16} /> Back to Publications
            </Link>

            <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "1rem", overflow: "hidden", marginBottom: "3rem", backgroundColor: "var(--card-bg)" }}>
                <Image
                    src={withBasePath(pub.image || "/placeholder.webp")}
                    alt={pub.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem", lineHeight: "1.2" }}>
                {pub.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", color: "var(--secondary)", fontSize: "1rem" }}>
                <span style={{ fontWeight: "600", color: "var(--primary)" }}>{pub.type}</span>
                <span>•</span>
                <span>{pub.venue}</span>
                <span>•</span>
                <span>{pub.year}</span>
            </div>

            <p style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "2.5rem", fontStyle: "italic" }}>
                {pub.authors}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
                {pub.tags.map(tag => (
                    <span key={tag} style={{ padding: "0.4rem 1rem", fontSize: "0.875rem", backgroundColor: "var(--card-bg)", color: "var(--foreground)", borderRadius: "9999px", border: "1px solid var(--card-border)" }}>
                        {tag}
                    </span>
                ))}
            </div>

            <div style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem" }}>Abstract</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--secondary)" }}>
                    {pub.abstract}
                </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}>
                {pub.links.url && (
                    <a href={pub.links.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "500", transition: "background-color 0.2s ease" }}>
                        <ExternalLink size={18} /> Visit Publisher
                    </a>
                )}
                {pub.links.pdf && (
                    <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--card-border)", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "500", transition: "background-color 0.2s ease" }}>
                        <FileText size={18} /> Read PDF
                    </a>
                )}
                {pub.links.doi && (
                    <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "transparent", color: "var(--secondary)", textDecoration: "none", fontWeight: "500" }}>
                        DOI
                    </a>
                )}
                
                {/* Cite Button for instant BibTeX copy */}
                <div style={{ marginLeft: "auto" }}>
                    <CiteButton bibtex={pub.bibtex} />
                </div>
            </div>
        </div>
    );
}
