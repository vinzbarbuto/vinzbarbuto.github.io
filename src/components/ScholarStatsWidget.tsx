"use client";

import { BookOpen, BarChart2, TrendingUp, RefreshCw, ExternalLink } from "lucide-react";
import type { ScholarStats } from "@/data/scholarStats";
import _scholarData from "../../public/scholar-stats.json";
import styles from "./ScholarStatsWidget.module.css";

const stats = _scholarData as ScholarStats;

interface ScholarStatsWidgetProps {
    variant?: "bar" | "cards";
    scholarUrl?: string;
}

export default function ScholarStatsWidget({
    variant = "cards",
    scholarUrl = "https://scholar.google.com/citations?user=_-riw5YAAAAJ",
}: ScholarStatsWidgetProps) {
    const formattedDate = stats.updated_at
        ? new Date(stats.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : null;

    const hasStats = stats.citations !== null || stats.hindex !== null;
    if (!hasStats) return null;

    /* ─────────────────────────────────────────────
       VARIANT: "bar" — slim horizontal strip
    ───────────────────────────────────────────── */
    if (variant === "bar") {
        const pills = [
            { label: "Citations", value: stats.citations?.toLocaleString(), icon: <BookOpen size={12} /> },
            { label: "h-index", value: stats.hindex, icon: <BarChart2 size={12} /> },
            { label: "i10-index", value: stats.i10index, icon: <TrendingUp size={12} /> },
        ];
        return (
            <div className={styles.bar}>
                <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className={styles.brand}>
                    <BookOpen size={14} className={styles.brandIcon} />
                    <span className={styles.brandLabel}>Google Scholar</span>
                    <ExternalLink size={10} className={styles.brandExternal} />
                </a>

                <div className={styles.divider} />

                {pills.map(({ label, value, icon }) =>
                    value !== null && value !== undefined ? (
                        <div key={label} className={styles.statPill}>
                            <span className={styles.statPillIcon}>{icon}</span>
                            <span className={styles.statPillLabel}>{label}</span>
                            <span className={styles.statPillValue}>{value}</span>
                        </div>
                    ) : null
                )}

                {formattedDate && (
                    <div className={`${styles.lastUpdated} ${styles.lastUpdatedBar}`}>
                        <RefreshCw size={10} />
                        <span className={styles.lastUpdatedText}>Updated {formattedDate}</span>
                    </div>
                )}
            </div>
        );
    }

    /* ─────────────────────────────────────────────
       VARIANT: "cards" — distilled editorial line
       (Previously three SaaS-template metric cards;
       rewritten to pure typography per DESIGN.md.)
    ───────────────────────────────────────────── */
    const figures: { label: string; value: string }[] = [];
    if (stats.citations != null) {
        figures.push({ label: "citations", value: stats.citations.toLocaleString() });
    }
    if (stats.hindex != null) {
        figures.push({ label: "h-index", value: String(stats.hindex) });
    }
    if (stats.i10index != null) {
        figures.push({ label: "i10-index", value: String(stats.i10index) });
    }

    return (
        <div className={styles.distilled}>
            <div className={styles.distilledEyebrow}>
                <a
                    href={scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.distilledSource}
                >
                    <BookOpen size={12} aria-hidden="true" />
                    <span>Google Scholar</span>
                    <ExternalLink size={10} aria-hidden="true" />
                </a>
                {formattedDate && (
                    <span className={styles.distilledUpdated}>
                        Updated {formattedDate}
                    </span>
                )}
            </div>

            <p className={styles.distilledLine}>
                {figures.map((f, i) => (
                    <span key={f.label} className={styles.distilledFigure}>
                        <span className={styles.distilledValue}>{f.value}</span>
                        <span className={styles.distilledLabel}>{f.label}</span>
                        {i < figures.length - 1 && (
                            <span className={styles.distilledSep} aria-hidden="true">·</span>
                        )}
                    </span>
                ))}
            </p>
        </div>
    );
}
