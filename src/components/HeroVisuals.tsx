"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import styles from "../app/page.module.css";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/basePath";

export default function HeroVisuals() {
    const [isHovered, setIsHovered] = useState(false);
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

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`${styles.spatialVisualLayer} animate-fade-in-up delay-100`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }} // Removed perspective
        >
            <motion.div
                className={styles.rotatingRingWrapper}
                style={{
                    zIndex: 1
                }}
            >
                {/* Outer Rotating Text SVG */}
                <svg className={styles.rotatingRing} viewBox="0 0 200 200" width="300" height="300">
                    <defs>
                        <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 0,1 160,0 a 80,80 0 0,1 -160,0" />
                    </defs>
                    <text
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '10.5px',
                            fontWeight: '600',
                            letterSpacing: '2px'
                        }}
                        fill="currentColor"
                    >
                        <textPath href="#circlePath" startOffset="0%">
                            EDGE AI • DIGITAL TWINS • CYBER-PHYSICAL SYSTEMS •
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
                    {/* Expanding Aura Effect (Replaces the mouse spotlight) */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
                            x: "-50%",
                            y: "-50%",
                            zIndex: -1,
                        }}
                        animate={{
                            scale: isHovered ? 1.6 : 0.8,
                            opacity: isHovered ? 1 : 0
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />

                    {/* The Base Real Image */}
                    <Image
                        src={withBasePath("https://res.cloudinary.com/dgec2pai8/image/upload/v1774537873/profile_oioxa3.webp")}
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 150px, 300px"
                        className={styles.profileCircleImageBase}
                        priority
                    />

                    {/* The Overlay Digital "Drawn" Image (Revealed by cursor) */}
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 10,
                            WebkitMaskImage: maskImage,
                            maskImage: maskImage
                        }}
                    >
                        <Image
                            src={withBasePath("https://res.cloudinary.com/dgec2pai8/image/upload/v1774537873/profile_oioxa3.webp")}
                            alt={profile.name}
                            fill
                            sizes="(max-width: 768px) 150px, 300px"
                            className={styles.profileCircleImageWireframe}
                            priority
                        />
                        {/* Digital Grid & Scanline Overlay inside the mask */}
                        <div className={styles.digitalOverlay}></div>
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
