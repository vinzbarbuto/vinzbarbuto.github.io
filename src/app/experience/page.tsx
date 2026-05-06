"use client";

import { useState } from "react";
import SectionLayout from "@/components/SectionLayout";
import { experience } from "@/data/experience";
import { academicService } from "@/data/academicService";
import { Calendar } from "lucide-react";
import styles from "./experience.module.css";
import tabStyles from "./tabs.module.css";
import { withBasePath } from "@/lib/basePath";

// ─── Shared timeline card ───────────────────────────────────────────────────
type TimelineItem = {
    role?: string;
    degree?: string;
    institution: string;
    period: string;
    description: string;
    icon?: string;
    url?: string;
};

function TimelineSection({
    title,
    items,
}: {
    title: string;
    items: TimelineItem[];
}) {
    if (!items || items.length === 0) return null;
    return (
        <div>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div className={styles.timeline}>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.dot}></div>
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <div className={styles.titleGroup}>
                                    <h4 className={styles.role}>{item.role ?? item.degree}</h4>
                                    <div className={styles.institutionGroup}>
                                        {item.icon && item.icon !== "" && (
                                            <div className={styles.iconWrapper}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={withBasePath(item.icon)}
                                                    alt={item.institution}
                                                    className={styles.iconImage}
                                                />
                                            </div>
                                        )}
                                        <p className={styles.institution}>
                                            {item.url ? (
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.institutionLink}
                                                >
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
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Tab panels ─────────────────────────────────────────────────────────────
function CareerTab() {
    return (
        <div className={styles.container}>
            <TimelineSection title="Work Experience" items={experience.work} />
            <TimelineSection title="Education" items={experience.education} />
        </div>
    );
}

function AcademicTab() {
    return (
        <div className={styles.container}>
            <TimelineSection title="Research Visits" items={academicService.researchVisits} />
            {academicService.editorialRoles && academicService.editorialRoles.length > 0 && (
                <TimelineSection title="Editorial Roles" items={academicService.editorialRoles} />
            )}
            <TimelineSection title="Memberships" items={academicService.memberships} />
            <TimelineSection title="IEEE Student Branch Leadership" items={academicService.ieeeService} />
            {academicService.conferenceRoles.length > 0 && (
                <TimelineSection title="Roles in Research Events" items={academicService.conferenceRoles} />
            )}
        </div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
const TABS = [
    { id: "career", label: "Career" },
    { id: "academic", label: "Academia" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ExperiencePage() {
    const [activeTab, setActiveTab] = useState<TabId>("career");

    return (
        <SectionLayout
            title="Experience"
            subtitle="My professional journey and academic service activities."
        >
            {/* Tab Switcher */}
            <div className={tabStyles.tabBar}>
                <div className={tabStyles.tabTrack}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${tabStyles.tab} ${activeTab === tab.id ? tabStyles.active : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-selected={activeTab === tab.id}
                            role="tab"
                        >
                            {tab.label}
                            {activeTab === tab.id && <span className={tabStyles.activeUnderline} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className={tabStyles.tabContent}>
                {activeTab === "career" ? <CareerTab /> : <AcademicTab />}
            </div>
        </SectionLayout>
    );
}
