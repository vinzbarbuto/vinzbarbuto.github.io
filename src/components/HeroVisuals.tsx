"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import styles from "../app/page.module.css";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/basePath";

const PROFILE_IMAGE_URL = "https://res.cloudinary.com/dgec2pai8/image/upload/v1774537873/profile_oioxa3.webp";
const PROFILE_IMAGE_SIZES = "(max-width: 768px) 150px, 300px";

export default function HeroVisuals() {
    const [hoverCapable, setHoverCapable] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(hover: hover)");
        const update = () => setHoverCapable(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    // Mouse tracking for the digital twin wireframe mask
    const imageMouseX = useMotionValue(0);
    const imageMouseY = useMotionValue(0);
    const maskRadius = useSpring(0, { stiffness: 200, damping: 20 });
    const maskImage = useMotionTemplate`radial-gradient(${maskRadius}px circle at ${imageMouseX}px ${imageMouseY}px, black 80%, transparent 100%)`;

    return (
        <div className={`${styles.spatialVisualLayer} animate-fade-in-up delay-100`}>
            <motion.div
                className={styles.rotatingRingWrapper}
                style={{
                    zIndex: 1
                }}
            >
                {/* Outer Rotating Text SVG — decorative */}
                <svg
                    className={styles.rotatingRing}
                    viewBox="0 0 200 200"
                    width="300"
                    height="300"
                    aria-hidden="true"
                    focusable="false"
                >
                    <defs>
                        <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 0,1 160,0 a 80,80 0 0,1 -160,0" />
                    </defs>
                    <text
                        style={{
                            fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
                            fontSize: '10.5px',
                            fontWeight: '600',
                            letterSpacing: '2px'
                        }}
                        fill="currentColor"
                    >
                        <textPath href="#circlePath" startOffset="0%">
                            EDGE AI • DIGITAL TWINS • CYBER-PHYSICAL SYSTEMS
                        </textPath>
                    </text>
                </svg>

                {/* Inner Perfect Circle Profile (Static Base with Interactive Mask) */}
                <motion.div
                    className={styles.spatialProfileCircle}
                    onMouseMove={hoverCapable ? (e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        imageMouseX.set(e.clientX - rect.left);
                        imageMouseY.set(e.clientY - rect.top);
                    } : undefined}
                    onMouseEnter={hoverCapable ? () => maskRadius.set(120) : undefined}
                    onMouseLeave={hoverCapable ? () => maskRadius.set(0) : undefined}
                >
                    {/* The Base Real Image */}
                    <Image
                        src={withBasePath(PROFILE_IMAGE_URL)}
                        alt={profile.name}
                        fill
                        sizes={PROFILE_IMAGE_SIZES}
                        className={styles.profileCircleImageBase}
                        priority
                    />

                    {/* The Overlay Digital "Drawn" Image (Revealed by cursor).
                        Aria-hidden because it duplicates the base image's alt content. */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 10,
                            WebkitMaskImage: maskImage,
                            maskImage: maskImage
                        }}
                    >
                        <Image
                            src={withBasePath(PROFILE_IMAGE_URL)}
                            alt=""
                            fill
                            sizes={PROFILE_IMAGE_SIZES}
                            className={styles.profileCircleImageWireframe}
                        />

                    </motion.div>
                </motion.div>

                {/* Hidden SVG Filter for the Wireframe "Drawn Lines" Digital Twin effect */}
                <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
                    <filter id="wireframe-filter">
                        {/* Edge detection generates the lines */}
                        <feConvolveMatrix kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" result="edges" />
                        {/* Boost the lines and colorize them to emerald green (rgba 16, 185, 129) */}
                        <feColorMatrix in="edges" type="matrix" values="
                            0 0 0 0 0.06
                            0 0 0 0 0.72
                            0 0 0 0 0.50
                            2 2 2 0 0
                        " />
                    </filter>
                </svg>
            </motion.div>
        </div>
    );
}
