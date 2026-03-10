"use client";

import React from "react";
import styles from "./SectionLayout.module.css";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    const { ref, isVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    return (
        <section
            id={id}
            ref={ref}
            className={`${styles.section} ${className} ${isVisible ? styles.visible : styles.hidden}`}
        >
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </section>
    );
}
