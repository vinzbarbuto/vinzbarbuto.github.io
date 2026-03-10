import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { experience } from "@/data/experience";
import { Calendar, Building } from "lucide-react";
import styles from "./experience.module.css";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Experience | Vincenzo Barbuto",
    description: "Academic and professional experience of Vincenzo Barbuto.",
};

export default function ExperiencePage() {
    return (
        <SectionLayout
            title="Experience & Education"
            subtitle="My academic background and professional journey."
        >
            <div className={styles.container}>

                {/* Work Experience */}
                <div>
                    <h3 className={styles.sectionTitle}>Work Experience</h3>
                    <div className={styles.timeline}>
                        {experience.work.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <div className={styles.dot}></div>
                                <div className={styles.card}>
                                    <div className={styles.header}>
                                        <div className={styles.titleGroup}>
                                            <h4 className={styles.role}>{item.role}</h4>
                                            <div className={styles.institutionGroup}>
                                                {item.icon && item.icon !== "" && (
                                                    <div className={styles.iconWrapper}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={item.icon} alt={item.institution} className={styles.iconImage} />
                                                    </div>
                                                )}
                                                <p className={styles.institution}>
                                                    {item.url ? (
                                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.institutionLink}>
                                                            {item.institution}
                                                        </a>
                                                    ) : (
                                                        item.institution
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={styles.periodBadge}>
                                            <Calendar size={14} /> {item.period}
                                        </span>
                                    </div>
                                    <p className={styles.description}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <h3 className={styles.sectionTitle}>Education</h3>
                    <div className={styles.timeline}>
                        {experience.education.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <div className={styles.dot}></div>
                                <div className={styles.card}>
                                    <div className={styles.header}>
                                        <div className={styles.titleGroup}>
                                            <h4 className={styles.role}>{item.degree}</h4>
                                            <div className={styles.institutionGroup}>
                                                {item.icon && item.icon !== "" && (
                                                    <div className={styles.iconWrapper}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={item.icon} alt={item.institution} className={styles.iconImage} />
                                                    </div>
                                                )}
                                                <p className={styles.institution}>
                                                    {item.url ? (
                                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.institutionLink}>
                                                            {item.institution}
                                                        </a>
                                                    ) : (
                                                        item.institution
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={styles.periodBadge}>
                                            <Calendar size={14} /> {item.period}
                                        </span>
                                    </div>
                                    <p className={styles.description}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SectionLayout>
    );
}
