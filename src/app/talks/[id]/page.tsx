import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, MapPin } from "lucide-react";
import { talks } from "@/data/talks";
import { withBasePath } from "@/lib/basePath";
import styles from "../../page.module.css";

export function generateStaticParams() {
    return talks.map((talk) => ({
        id: talk.id,
    }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const talk = talks.find((t) => t.id === params.id);
    if (!talk) {
        return { title: "Talk" };
    }
    const description = talk.description.length > 200 ? `${talk.description.slice(0, 197)}…` : talk.description;
    const image = talk.image || "/placeholder.webp";
    return {
        title: talk.title,
        description,
        alternates: { canonical: `/talks/${talk.id}` },
        openGraph: {
            type: "article",
            title: talk.title,
            description,
            url: `/talks/${talk.id}`,
            images: [{ url: image, alt: talk.title }],
            authors: ["Vincenzo Barbuto"],
        },
        twitter: {
            card: "summary_large_image",
            title: talk.title,
            description,
            images: [image],
        },
    };
}

export default async function TalkDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const talk = talks.find((t) => t.id === params.id);

    if (!talk) {
        notFound();
    }

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 1.5rem" }}>
            <Link href="/talks" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)", textDecoration: "none", marginBottom: "2rem", fontWeight: "500", transition: "color 0.2s ease" }}>
                <ArrowLeft size={16} /> Back to Talks
            </Link>

            <div className={styles.talkDetailHero}>
                {talk.isLogo ? (
                    /* Logo: compact centered, no fill */
                    <div className={styles.talkDetailHeroLogo}>
                        <Image
                            src={withBasePath(talk.image || "/placeholder.webp")}
                            alt={talk.title}
                            width={500}
                            height={180}
                            style={{ objectFit: "contain", width: "100%", height: "100%", maxHeight: "180px" }}
                            priority
                        />
                    </div>
                ) : (
                    /* Photo: full-bleed cover */
                    <div className={styles.talkDetailHeroInner}>
                        <Image
                            src={withBasePath(talk.image || "/placeholder.webp")}
                            alt={talk.title}
                            fill
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            priority
                        />
                    </div>
                )}
            </div>

            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                {talk.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem", color: "var(--secondary)", fontSize: "1.05rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={18} color="var(--primary)" /> {talk.event}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Calendar size={18} color="var(--primary)" /> {talk.date}
                </span>
            </div>

            <div style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)", marginBottom: "1rem" }}>Overview</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--secondary)" }}>
                    {talk.description}
                </p>
            </div>

            {talk.link && talk.link !== "#" && (
                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem" }}>
                    <a href={talk.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "500", transition: "background-color 0.2s ease" }}>
                        <ExternalLink size={18} /> View Event Details
                    </a>
                </div>
            )}
        </div>
    );
}
