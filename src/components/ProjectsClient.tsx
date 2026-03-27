"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import styles from "@/app/page.module.css";

// Interface mimicking the project data shape
interface ProjectItem {
    id: string;
    title: string;
    description: string;
    image?: string;
    isLogo?: boolean;
    tags: string[];
    period?: string;
    link?: string;
}

export default function ProjectsClient({ projects }: { projects: ProjectItem[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTag, sortOrder, itemsPerPage]);

    const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags)))];

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesTag = selectedTag === "All" || project.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (sortOrder === "title_asc") return a.title.localeCompare(b.title);
        if (sortOrder === "title_desc") return b.title.localeCompare(a.title);
        return 0; // "default" stays in original array order
    });

    const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = sortedProjects.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Global Controls Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Search Bar */}
                <div style={{ position: "relative", width: "100%" }}>
                    <Search size={20} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--secondary)" }} />
                    <input
                        type="text"
                        placeholder="Search by title, description, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "1rem 1rem 1rem 3rem",
                            borderRadius: "0.75rem",
                            border: "1px solid var(--card-border)",
                            backgroundColor: "var(--card-bg)",
                            color: "var(--foreground)",
                            fontSize: "1rem",
                            outline: "none"
                        }}
                    />
                </div>

                {/* Filter Bar */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem", padding: "0.5rem 0" }}>
                    {/* Type/Tag Filter */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)" }}>
                            <Filter size={18} />
                            <span style={{ fontSize: "0.9rem", fontWeight: "600", whiteSpace: "nowrap" }}>Tags:</span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    style={{
                                        padding: "0.35rem 0.9rem",
                                        borderRadius: "9999px",
                                        border: `1px solid ${selectedTag === tag ? "var(--primary)" : "var(--card-border)"}`,
                                        backgroundColor: selectedTag === tag ? "var(--primary)" : "var(--card-bg)",
                                        color: selectedTag === tag ? "white" : "var(--foreground)",
                                        fontSize: "0.825rem",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Dropdowns Group */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "1rem",
                        marginLeft: "auto",
                        width: "auto"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--secondary)" }}>Sort:</span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.6rem",
                                    border: "1px solid var(--card-border)",
                                    backgroundColor: "var(--card-bg)",
                                    color: "var(--foreground)",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value="default">Default</option>
                                <option value="title_asc">A-Z</option>
                                <option value="title_desc">Z-A</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--secondary)" }}>Per page:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                style={{
                                    padding: "0.4rem 0.75rem",
                                    borderRadius: "0.6rem",
                                    border: "1px solid var(--card-border)",
                                    backgroundColor: "var(--card-bg)",
                                    color: "var(--foreground)",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    outline: "none",
                                    cursor: "pointer"
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main List Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {currentProjects.length > 0 ? (
                    currentProjects.map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className={styles.previewCard}>
                            <div className={styles.previewImageWrapper} style={project.isLogo ? { backgroundColor: 'white' } : undefined}>
                                <Image
                                    src={withBasePath(project.image || "/placeholder.webp")}
                                    alt={project.title}
                                    fill
                                    style={{ 
                                        objectFit: project.isLogo ? "contain" : "cover", 
                                        padding: project.isLogo ? "1.5rem" : "0" 
                                    }}
                                />
                            </div>

                            <div className={styles.previewContent}>
                                <h3 className={styles.previewTitle}>{project.title}</h3>
                                {project.period && (
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--secondary)", fontSize: "0.85rem", marginBottom: "0.65rem" }}>
                                        <Calendar size={13} />
                                        <span>{project.period}</span>
                                    </div>
                                )}
                                <p className={styles.previewDesc}>{project.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto", paddingTop: "1rem" }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} className={styles.interestItem} style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", margin: 0 }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div style={{ textAlign: "center", padding: "4rem", color: "var(--secondary)", backgroundColor: "var(--card-bg)", borderRadius: "0.75rem", border: "1px solid var(--card-border)" }}>
                        <p>No projects found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedTag("All"); setSortOrder("default"); }}
                            style={{ marginTop: "1rem", color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontWeight: "500", textDecoration: "underline" }}
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1.5rem",
                        paddingTop: "2.5rem",
                        borderTop: "1px solid var(--card-border)"
                    }}>
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(prev - 1, 1));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            disabled={currentPage === 1}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 1.2rem",
                                borderRadius: "0.75rem",
                                backgroundColor: currentPage === 1 ? "transparent" : "var(--card-bg)",
                                color: currentPage === 1 ? "var(--secondary)" : "var(--foreground)",
                                border: `1px solid ${currentPage === 1 ? "transparent" : "var(--card-border)"}`,
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <ChevronLeft size={18} />
                            <span style={{ fontWeight: 600 }}>Previous</span>
                        </button>

                        <span style={{ color: "var(--secondary)", fontSize: "0.9rem", fontWeight: "500" }}>
                            Page <span style={{ color: "var(--foreground)", fontWeight: "700" }}>{currentPage}</span> of <span style={{ color: "var(--foreground)", fontWeight: "700" }}>{totalPages}</span>
                        </span>

                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            disabled={currentPage === totalPages}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 1.2rem",
                                borderRadius: "0.75rem",
                                backgroundColor: currentPage === totalPages ? "transparent" : "var(--card-bg)",
                                color: currentPage === totalPages ? "var(--secondary)" : "var(--foreground)",
                                border: `1px solid ${currentPage === totalPages ? "transparent" : "var(--card-border)"}`,
                                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <span style={{ fontWeight: 600 }}>Next</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
