"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLayout from "@/components/SectionLayout";
import { publications } from "@/data/publications";
import { ExternalLink, FileText, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../page.module.css";

export default function PublicationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [sortOrder, setSortOrder] = useState("year_desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Reset pagination when filters, sort, or items per page change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedType, selectedYear, sortOrder, itemsPerPage]);

    // Extract unique publication types and years
    const publicationTypes = ["All", ...Array.from(new Set(publications.map(pub => pub.type)))];
    const publicationYears = ["All", ...Array.from(new Set(publications.map(pub => pub.year.toString()))).sort((a, b) => Number(b) - Number(a))];

    const filteredPublications = publications.filter(pub => {
        const matchesSearch =
            pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
            pub.abstract.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedType === "All" || pub.type === selectedType;
        const matchesYear = selectedYear === "All" || pub.year.toString() === selectedYear;

        return matchesSearch && matchesType && matchesYear;
    });

    // Apply Sorting
    const sortedPublications = [...filteredPublications].sort((a, b) => {
        if (sortOrder === "year_desc") {
            return b.year - a.year; // Newest to oldest
        } else if (sortOrder === "year_asc") {
            return a.year - b.year; // Oldest to newest
        } else if (sortOrder === "title_asc") {
            return a.title.localeCompare(b.title); // A to Z
        } else if (sortOrder === "title_desc") {
            return b.title.localeCompare(a.title); // Z to A
        }
        return 0;
    });

    // Pagination calculations
    const totalPages = Math.ceil(sortedPublications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPublications = sortedPublications.slice(startIndex, startIndex + itemsPerPage);

    return (
        <SectionLayout
            title="Publications"
            subtitle="Complete list of my research papers, journal articles, and conference proceedings."
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {/* Global Controls Area */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Search Bar */}
                    <div style={{ position: "relative", width: "100%" }}>
                        <Search size={20} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--secondary)" }} />
                        <input
                            type="text"
                            placeholder="Search by title, author, keyword, or abstract..."
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
                        {/* Type Filter */}
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)" }}>
                                <Filter size={18} />
                                <span style={{ fontSize: "0.9rem", fontWeight: "600", whiteSpace: "nowrap" }}>Type:</span>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                {publicationTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        style={{
                                            padding: "0.35rem 0.9rem",
                                            borderRadius: "9999px",
                                            border: `1px solid ${selectedType === type ? "var(--primary)" : "var(--card-border)"}`,
                                            backgroundColor: selectedType === type ? "var(--primary)" : "var(--card-bg)",
                                            color: selectedType === type ? "white" : "var(--foreground)",
                                            fontSize: "0.825rem",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        {type}
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
                                <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--secondary)" }}>Year:</span>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
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
                                    {publicationYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

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
                                    <option value="year_desc">Newest</option>
                                    <option value="year_asc">Oldest</option>
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
                    {currentPublications.length > 0 ? (
                        currentPublications.map((pub) => (
                            <Link href={`/publications/${pub.id}`} key={pub.id} className={styles.previewCard}>
                                {/* Optimized Image Container */}
                                <div className={styles.previewImageWrapper}>
                                    <Image
                                        src={pub.image || "/placeholder.webp"}
                                        alt={pub.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                {/* Content Container */}
                                <div className={styles.previewContent}>
                                    <h3 className={styles.previewTitle}>{pub.title}</h3>

                                    <div className={styles.previewMeta}>
                                        <span style={{ color: "var(--foreground)" }}>
                                            {pub.type}
                                        </span>
                                        <span>•</span>
                                        <span>{pub.venue}</span>
                                        <span>•</span>
                                        <span>{pub.year}</span>
                                    </div>

                                    <p className={styles.previewDesc}>
                                        {pub.abstract}
                                    </p>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto", paddingTop: "1rem" }}>
                                        {pub.tags.map(tag => (
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
                            <p>No publications found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setSelectedType("All"); setSelectedYear("All"); setSortOrder("year_desc"); }}
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
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
        </SectionLayout>
    );
}
