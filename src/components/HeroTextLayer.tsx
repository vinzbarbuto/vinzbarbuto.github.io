"use client";

import { Download, BookOpen } from "lucide-react";
import styles from "../app/page.module.css";
import { profile } from "@/data/profile";
import { socialIcons } from "@/data/socialIcons";
import { MagneticLink } from "./MagneticLink";

export default function HeroTextLayer() {
    return (
        <div className={`${styles.spatialTextLayer} animate-fade-in-up delay-200`}>
            <div className={styles.heroEyebrow}>
                <span className={styles.eyebrowDotWrapper}>
                    <span className={styles.eyebrowDotRipple} />
                    <span className={styles.eyebrowDot} />
                </span>
                <span className={styles.eyebrowLabel}>Available for Collaboration</span>
                <span className={styles.eyebrowShimmer} />
            </div>

            <h1 className={styles.spatialTitle}>
                Building Intelligent
                <br />
                <span className={styles.spatialHighlight}>Autonomous Architectures</span>
            </h1>

            <p className={styles.spatialBio}>
                I&apos;m <strong>{profile.name}</strong>, a {profile.role} at {profile.institution}.
                Exploring the frontiers of Edge AI, Digital Twins, and Cyber-Physical Systems.
            </p>

            <div className={styles.spatialActions}>
                <div className={styles.spatialCtas}>
                    <MagneticLink
                        href={profile.socials.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.heroBtn}
                        strength={12}
                    >
                        <span className={styles.heroBtnIcon}>
                            <Download size={16} />
                        </span>
                        Download Résumé
                        <span className={styles.heroBtnShimmer} />
                    </MagneticLink>
                    <MagneticLink
                        href="#recent-publications"
                        className={`${styles.heroBtn} ${styles.heroBtnGhost}`}
                        strength={12}
                    >
                        <span className={styles.heroBtnIcon}>
                            <BookOpen size={16} />
                        </span>
                        View Research
                        <span className={styles.heroBtnShimmer} />
                    </MagneticLink>
                </div>

                <div className={styles.spatialSocials}>
                    {socialIcons.map((s) => {
                        const href = profile.socials[s.hrefKey];
                        const isExternal = s.hrefKey !== "email";
                        return (
                            <MagneticLink
                                key={s.key}
                                href={href}
                                aria-label={s.label}
                                strength={12}
                                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                {s.icon}
                            </MagneticLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
