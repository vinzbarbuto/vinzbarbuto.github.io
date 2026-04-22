"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { BookOpen, BarChart2, TrendingUp, RefreshCw, ExternalLink } from "lucide-react";
import type { ScholarStats } from "@/data/scholarStats";
import _scholarData from "../../public/scholar-stats.json";
import styles from "./ScholarStatsWidget.module.css";

const stats = _scholarData as ScholarStats;

interface ScholarStatsWidgetProps {
    variant?: "bar" | "cards";
    scholarUrl?: string;
}

type MetricVars = CSSProperties & {
    "--metric-gradient": string;
    "--metric-border": string;
    "--metric-glow": string;
};

export default function ScholarStatsWidget({
    variant = "cards",
    scholarUrl = "https://scholar.google.com/citations?user=_-riw5YAAAAJ",
}: ScholarStatsWidgetProps) {
    const formattedDate = stats.updated_at
        ? new Date(stats.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : null;

    const hasStats = stats.citations !== null || stats.hindex !== null;

    /* ─────────────────────────────────────────────
       VARIANT: "bar" — slim horizontal strip
    ───────────────────────────────────────────── */
    if (variant === "bar") {
        if (!hasStats) return null;
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
       VARIANT: "cards" — 3 metric cards
    ───────────────────────────────────────────── */
    if (!hasStats) return null;

    const metrics: {
        label: string;
        value: string | number;
        sub: string;
        icon: React.ReactNode;
        vars: MetricVars;
    }[] = [
            {
                label: "Citations",
                value: stats.citations?.toLocaleString() ?? "—",
                sub: "Total citations on Scholar",
                icon: <BookOpen size={20} />,
                vars: {
                    "--metric-gradient": "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.05) 100%)",
                    "--metric-border": "rgba(16,185,129,0.3)",
                    "--metric-glow": "rgba(16,185,129,0.12)",
                },
            },
            {
                label: "h-index",
                value: stats.hindex ?? "—",
                sub: "Hirsch index",
                icon: <BarChart2 size={20} />,
                vars: {
                    "--metric-gradient": "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 100%)",
                    "--metric-border": "rgba(99,102,241,0.3)",
                    "--metric-glow": "rgba(99,102,241,0.12)",
                },
            },
            {
                label: "i10-index",
                value: stats.i10index ?? "—",
                sub: "Papers with ≥10 citations",
                icon: <TrendingUp size={20} />,
                vars: {
                    "--metric-gradient": "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.05) 100%)",
                    "--metric-border": "rgba(56,189,248,0.3)",
                    "--metric-glow": "rgba(56,189,248,0.12)",
                },
            },
        ];

    return (
        <div className={styles.cardsRoot}>
            <div className={styles.header}>
                <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className={styles.brand}>
                    <BookOpen size={15} className={styles.brandIcon} />
                    <span className={styles.brandLabel}>Google Scholar</span>
                    <ExternalLink size={11} className={styles.brandExternal} />
                </a>
                {formattedDate && (
                    <div className={styles.lastUpdated}>
                        <RefreshCw size={10} />
                        <span className={styles.lastUpdatedText}>Updated {formattedDate}</span>
                    </div>
                )}
            </div>

            <div className={styles.cardsGrid}>
                {metrics.map(({ label, value, sub, icon, vars }) => (
                    <div key={label} className={styles.metricCard} style={vars}>
                        <div className={styles.metricHead}>
                            <span className={styles.metricLabel}>{label}</span>
                            <span className={styles.metricIcon}>{icon}</span>
                        </div>
                        <div className={styles.metricValue}>{value}</div>
                        <p className={styles.metricSub}>{sub}</p>
                    </div>
                ))}
            </div>

            <div className={styles.viewAllWrap}>
                <Link href="/publications" className={styles.viewAll}>
                    View all publications →
                </Link>
            </div>
        </div>
    );
}
