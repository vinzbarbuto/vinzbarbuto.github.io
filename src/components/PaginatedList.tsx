"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedListProps {
    children: React.ReactNode;
    itemsPerPage?: number;
}

export default function PaginatedList({ children, itemsPerPage = 5 }: PaginatedListProps) {
    const items = React.Children.toArray(children);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Items Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {currentItems}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", marginTop: "1.5rem" }}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.25rem",
                            borderRadius: "9999px",
                            border: "1px solid var(--card-border)",
                            backgroundColor: currentPage === 1 ? "transparent" : "var(--card-bg)",
                            color: currentPage === 1 ? "var(--secondary)" : "var(--foreground)",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            opacity: currentPage === 1 ? 0.5 : 1,
                            transition: "all 0.2s ease"
                        }}
                    >
                        <ChevronLeft size={18} /> Prev
                    </button>

                    <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--secondary)" }}>
                        Page <span style={{ color: "var(--foreground)" }}>{currentPage}</span> of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.25rem",
                            borderRadius: "9999px",
                            border: "1px solid var(--card-border)",
                            backgroundColor: currentPage === totalPages ? "transparent" : "var(--card-bg)",
                            color: currentPage === totalPages ? "var(--secondary)" : "var(--foreground)",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            transition: "all 0.2s ease"
                        }}
                    >
                        Next <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
