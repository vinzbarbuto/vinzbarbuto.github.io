import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLayout from "@/components/SectionLayout";
import { talks } from "@/data/talks";
import { Calendar, MapPin } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import styles from "../page.module.css";

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
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {talks.map((talk) => (
                    <Link href={`/talks/${talk.id}`} key={talk.id} className={styles.previewCard}>
                        {/* Optimized Image Container */}
                        <div className={styles.previewImageWrapper}>
                            <Image
                                src={withBasePath(talk.image || "/placeholder.webp")}
                                alt={talk.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Content Container */}
                        <div className={styles.previewContent}>
                            <h3 className={styles.previewTitle}>{talk.title}</h3>

                            <div className={styles.previewMeta}>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <MapPin size={16} /> {talk.event}
                                </span>
                                <span>•</span>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <Calendar size={16} /> {talk.date}
                                </span>
                            </div>

                            <p className={styles.previewDesc}>
                                {talk.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </SectionLayout>
    );
}
