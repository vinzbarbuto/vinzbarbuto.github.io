"use client";

import Link from "next/link";
import { BookOpen, BarChart2, TrendingUp, RefreshCw, ExternalLink } from "lucide-react";
import type { ScholarStats } from "@/data/scholarStats";
import _scholarData from "../../public/scholar-stats.json";

const stats = _scholarData as ScholarStats;

/* ─────────────────────────────────────────────────────────────────────────────
   Variants
   "bar"      → compact horizontal strip (used on Publications page)
   "cards"    → three large animated metric cards (used on homepage)
───────────────────────────────────────────────────────────────────────────── */
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

    /* ── Shared shimmer keyframes injected once ── */
    const animStyle = `
        @keyframes countUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0);   }
        }
    `;

    /* ─────────────────────────────────────────────────────────────
       VARIANT: "bar" — slim horizontal strip (Publications page)
    ───────────────────────────────────────────────────────────── */
    if (variant === "bar") {
        if (!hasStats) return null;
        return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", padding: "1rem 1.5rem", borderRadius: "0.875rem", border: "1px solid rgba(16,185,129,0.25)", background: "linear-gradient(135deg,rgba(16,185,129,0.07) 0%,rgba(16,185,129,0.02) 100%)", backdropFilter: "blur(10px)", alignItems: "center" }}>
                <style>{animStyle}</style>

                {/* Brand */}
                <a href={scholarUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginRight: "0.25rem" }}>
                    <BookOpen size={14} style={{ color: "var(--primary)" }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Google Scholar</span>
                    <ExternalLink size={10} style={{ color: "var(--primary)", opacity: 0.7 }} />
                </a>

                {/* Divider */}
                <div style={{ width: "1px", height: "26px", background: "var(--card-border)", margin: "0 0.15rem" }} />

                {/* Stat pills */}
                {[
                    { label: "Citations", value: stats.citations?.toLocaleString(), icon: <BookOpen size={12} /> },
                    { label: "h-index", value: stats.hindex, icon: <BarChart2 size={12} /> },
                    { label: "i10-index", value: stats.i10index, icon: <TrendingUp size={12} /> },
                ].map(({ label, value, icon }) =>
                    value !== null && value !== undefined ? (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.8rem", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)" }}>
                            <span style={{ color: "var(--secondary)" }}>{icon}</span>
                            <span style={{ fontSize: "0.78rem", color: "var(--secondary)", fontWeight: 500 }}>{label}</span>
                            <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.01em" }}>{value}</span>
                        </div>
                    ) : null
                )}

                {/* Last updated */}
                {formattedDate && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginLeft: "auto", color: "var(--secondary)" }}>
                        <RefreshCw size={10} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>Updated {formattedDate}</span>
                    </div>
                )}
            </div>
        );
    }

    /* ─────────────────────────────────────────────────────────────
       VARIANT: "cards" — 3 large metric cards (Homepage)
    ───────────────────────────────────────────────────────────── */
    if (!hasStats) return null;
    
    const metrics = [
        {
            label: "Citations",
            value: stats.citations?.toLocaleString() ?? "—",
            sub: "Total citations on Scholar",
            icon: <BookOpen size={20} />,
            gradient: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.05) 100%)",
            border: "rgba(16,185,129,0.3)",
            glow: "rgba(16,185,129,0.12)",
        },
        {
            label: "h-index",
            value: stats.hindex ?? "—",
            sub: "Hirsch index",
            icon: <BarChart2 size={20} />,
            gradient: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 100%)",
            border: "rgba(99,102,241,0.3)",
            glow: "rgba(99,102,241,0.12)",
        },
        {
            label: "i10-index",
            value: stats.i10index ?? "—",
            sub: "Papers with ≥10 citations",
            icon: <TrendingUp size={20} />,
            gradient: "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.05) 100%)",
            border: "rgba(56,189,248,0.3)",
            glow: "rgba(56,189,248,0.12)",
        },
    ];

    return (
        <div>
            <style>{animStyle}</style>

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <a href={scholarUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                    <BookOpen size={15} style={{ color: "var(--primary)" }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Google Scholar</span>
                    <ExternalLink size={11} style={{ color: "var(--primary)", opacity: 0.7 }} />
                </a>
                {formattedDate && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--secondary)" }}>
                        <RefreshCw size={10} />
                        <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>Updated {formattedDate}</span>
                    </div>
                )}
            </div>

            {/* Metric cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem" }}>
                {metrics.map(({ label, value, sub, icon, gradient, border, glow }) => (
                    <div key={label} style={{ position: "relative", padding: "1.1rem 1rem", borderRadius: "0.875rem", background: gradient, border: `1px solid ${border}`, overflow: "hidden", boxShadow: `0 0 20px ${glow}`, transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${glow}`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${glow}`; }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
                            <span style={{ color: "var(--secondary)", opacity: 0.7 }}>{icon}</span>
                        </div>
                        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1, animation: "countUp 0.5s ease forwards" }}>
                            {value}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--secondary)", marginTop: "0.35rem", opacity: 0.75 }}>{sub}</div>
                    </div>
                ))}
            </div>

            {/* Full profile link */}
            <div style={{ marginTop: "0.85rem", textAlign: "right" }}>
                <Link href="/publications" style={{ fontSize: "0.78rem", color: "var(--primary)", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    View all publications →
                </Link>
            </div>
        </div>
    );
}
