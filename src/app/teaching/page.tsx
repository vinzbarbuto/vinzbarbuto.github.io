import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { teaching } from "@/data/teaching";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import styles from "./teaching.module.css";

export const metadata: Metadata = {
    title: "Teaching | Vincenzo Barbuto",
    description: "Teaching and mentoring activities by Vincenzo Barbuto.",
};

export default function TeachingPage() {
    return (
        <SectionLayout
            title="Teaching & Activities"
            subtitle="Courses, tutorials, and mentoring activities I am involved in."
        >
            <div className={styles.grid}>
                {teaching.map((item) => (
                    <div key={item.id} className={styles.timelineCard}>
                        <div className={styles.header}>
                            <div className={styles.titleGroup}>
                                <h3 className={styles.course}>{item.course}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.metaItem}>
                                        <MapPin size={16} /> {item.institution}
                                    </span>
                                    {item.period && (
                                        <span className={styles.metaItem}>
                                            <Calendar size={16} /> {item.period}
                                        </span>
                                    )}
                                    <span className={styles.metaItem}>
                                        <Briefcase size={16} /> {item.role}
                                    </span>
                                </div>
                            </div>
                            {item.type && (
                                <span className={styles.badge}>{item.type}</span>
                            )}
                        </div>
                        <p className={styles.description}>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
}
