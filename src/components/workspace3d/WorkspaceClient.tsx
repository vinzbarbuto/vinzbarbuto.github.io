"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/app/workspace/page.module.css";

const CanvasContainer = dynamic(
  () => import("./CanvasContainer"),
  { 
    ssr: false,
    loading: () => (
      <div 
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f1f5f9",
          color: "#0f172a",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }}
      >
        <div className="spinner" />
        <span style={{ marginTop: "1rem" }}>Loading 3D Twin Environment...</span>
        <style>{`
          .spinner {
            border: 2px solid rgba(15, 23, 42, 0.1);
            border-top: 2px solid #0f172a;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }
);

export default function WorkspaceClient() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loading state during size detection to prevent layout shift or loading heavy 3D canvas on mobile
  if (isMobile === null) {
    return (
      <div 
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--bg-1)",
        }}
      />
    );
  }

  if (isMobile) {
    return (
      <div className={styles.mobileFallback}>
        <div className={styles.fallbackContainer}>
          <span className={styles.fallbackIcon}>🖥️</span>
          <h2 className={styles.fallbackTitle}>3D Studio Desktop Only</h2>
          <p className={styles.fallbackText}>
            The interactive 3D environment is optimized for larger screens.<br />
            Please visit this page from a computer to explore the virtual studio.
          </p>
          <a href="/" className={styles.fallbackBtn}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <CanvasContainer />;
}

