"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const glitchPhrases = [
    "404: Page lost in the cloud-edge continuum.",
    "404: This Digital Twin has no physical counterpart.",
    "404: The edge node returned nothing.",
    "404: Opportunistic computing… missed the opportunity.",
    "404: Route not found. Even Lingua Franca can't fix this.",
];

const asciiRobot = `
  ╭──────────────╮
  │  (◉_◉)  ERR │
  │  ┌──┴──┐    │
  │  │4  04│    │
  │  └─────┘    │
  ╰──────────────╯
       │   │
      ╱     ╲
`;

export default function NotFound() {
    const [phrase, setPhrase] = useState(glitchPhrases[0]);
    const [glitching, setGlitching] = useState(false);

    // Cycle through phrases
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitching(true);
            setTimeout(() => {
                setPhrase(prev => {
                    const idx = glitchPhrases.indexOf(prev);
                    return glitchPhrases[(idx + 1) % glitchPhrases.length];
                });
                setGlitching(false);
            }, 150);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            background: "var(--background)",
        }}>
            {/* Glowing number */}
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <div style={{
                    fontSize: "clamp(7rem, 20vw, 12rem)",
                    fontWeight: 900,
                    fontFamily: "var(--font-space-grotesk)",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, var(--primary) 0%, rgba(16,185,129,0.3) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 40px rgba(16,185,129,0.4))",
                    letterSpacing: "-0.04em",
                    userSelect: "none",
                }}>
                    404
                </div>
                {/* Scanline overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16,185,129,0.05) 3px, rgba(16,185,129,0.05) 4px)",
                    pointerEvents: "none",
                    borderRadius: "0.5rem",
                }} />
            </div>

            {/* ASCII robot */}
            <pre style={{
                fontFamily: "monospace",
                fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                color: "var(--primary)",
                opacity: 0.8,
                lineHeight: 1.4,
                userSelect: "none",
                marginBottom: "2rem",
            }}>
                {asciiRobot}
            </pre>

            {/* Cycling phrase */}
            <p style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: "var(--secondary)",
                fontFamily: "monospace",
                marginBottom: "1rem",
                maxWidth: "520px",
                transition: "opacity 0.15s ease",
                opacity: glitching ? 0 : 1,
                minHeight: "2em",
            }}>
                {phrase}
            </p>

            <p style={{
                fontSize: "1.1rem",
                color: "var(--foreground)",
                fontWeight: 600,
                marginBottom: "2.5rem",
                maxWidth: "480px",
            }}>
                Looks like this page wandered off into the edge continuum and never came back.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 1.75rem",
                    background: "var(--primary)",
                    color: "#fff",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    boxShadow: "0 10px 25px -5px rgba(16,185,129,0.4)",
                    transition: "transform 0.2s ease",
                }}>
                    <Home size={17} /> Back to Home
                </Link>
                <Link href="/publications" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 1.75rem",
                    background: "transparent",
                    color: "var(--foreground)",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    border: "1px solid var(--card-border)",
                    transition: "border-color 0.2s ease",
                }}>
                    <Search size={17} /> Browse Publications
                </Link>
            </div>

            {/* Small footer note */}
            <p style={{ marginTop: "3rem", fontSize: "0.78rem", color: "var(--secondary)", opacity: 0.6, fontFamily: "monospace" }}>
                {`// If you believe this is a mistake, check the URL or `}
                <Link href="/contact" style={{ color: "var(--primary)", textDecoration: "none" }}>contact me</Link>
                {`.`}
            </p>
        </div>
    );
}
