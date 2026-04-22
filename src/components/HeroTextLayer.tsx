"use client";

import { Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "../app/page.module.css";
import { profile } from "@/data/profile";
import { socialIcons } from "@/data/socialIcons";
import { useMagnetic } from "@/hooks/useMagnetic";

const TITLE_LINE_1 = "Building Intelligent";
const HIGHLIGHT = "Autonomous Architectures.";

export default function HeroTextLayer() {
    const prefersReduced = useReducedMotion();
    const ctaRef = useMagnetic<HTMLAnchorElement>(12);

    const words1 = TITLE_LINE_1.split(" ");
    const words2 = HIGHLIGHT.split(" ");

    return (
        <div className={`${styles.spatialTextLayer} animate-fade-in-up delay-200`}>
            <p className={styles.heroEyebrow}>
                <span className={styles.eyebrowDot} />
                Research Fellow · Edge AI · Cyber-Physical Systems
            </p>

            <h1 className={styles.spatialTitle}>
                {words1.map((w, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        className={styles.revealWord}
                        initial={{ y: prefersReduced ? 0 : "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {w}&nbsp;
                    </motion.span>
                ))}
                <br />
                <span className={styles.spatialHighlight}>
                    {words2.map((w, i) => (
                        <motion.span
                            key={`l2-${i}`}
                            className={styles.revealWord}
                            initial={{ y: prefersReduced ? 0 : "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 * (words1.length + i), duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {w}{i < words2.length - 1 ? <>&nbsp;</> : null}
                        </motion.span>
                    ))}
                </span>
            </h1>

            <p className={styles.spatialBio}>
                I&apos;m <strong>{profile.name}</strong>, a {profile.role} at {profile.institution}.
                Exploring the frontiers of Edge AI, Digital Twins, and Cyber-Physical Systems.
            </p>

            <div className={styles.spatialActions}>
                <a
                    ref={ctaRef}
                    href={profile.socials.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnSpatialPrimary}
                >
                    <Download size={18} />
                    Download Résumé
                </a>

                <div className={styles.spatialSocials}>
                    {socialIcons.map((s) => {
                        const href = profile.socials[s.hrefKey];
                        const isExternal = s.hrefKey !== "email";
                        return (
                            <a
                                key={s.key}
                                href={href}
                                aria-label={s.label}
                                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                {s.icon}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
