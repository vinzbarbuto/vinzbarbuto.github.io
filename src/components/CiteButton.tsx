"use client";

import { useState } from "react";
import { Check, Quote } from "lucide-react";

export default function CiteButton({ bibtex }: { bibtex: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        navigator.clipboard.writeText(bibtex).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--card-border)",
                backgroundColor: copied ? "rgba(16, 185, 129, 0.15)" : "var(--card-bg)",
                color: copied ? "var(--primary)" : "var(--secondary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            title="Copy BibTeX Citation"
            onMouseEnter={(e) => {
                if (!copied) e.currentTarget.style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
                if (!copied) e.currentTarget.style.color = "var(--secondary)";
            }}
        >
            {copied ? <Check size={14} /> : <Quote size={14} />}
            {copied ? "Copied!" : "Cite"}
        </button>
    );
}
