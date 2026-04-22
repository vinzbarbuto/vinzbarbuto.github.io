import React from "react";
import styles from "./SectionLayout.module.css";
import Reveal from "./Reveal";

interface SectionLayoutProps {
    id?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export default function SectionLayout({
    id,
    title,
    subtitle,
    children,
    className = "",
}: SectionLayoutProps) {
    return (
        <section id={id} className={`${styles.section} ${className}`}>
            <div className="container">
                <Reveal>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </Reveal>
                <Reveal delay={0.08}>
                    <div className={styles.content}>{children}</div>
                </Reveal>
            </div>
        </section>
    );
}
