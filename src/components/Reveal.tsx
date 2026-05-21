"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealAs = "div" | "li" | "section" | "article";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    distance?: number;
    direction?: "up" | "right" | "none";
    duration?: number;
    className?: string;
    as?: RevealAs;
    amount?: number;
}

/**
 * Viewport-triggered fade + slide reveal.
 * Fires once when the element enters the viewport (also fires immediately for
 * above-the-fold content). Honors prefers-reduced-motion by disabling movement.
 */
export default function Reveal({
    children,
    delay = 0,
    distance = 24,
    direction = "up",
    duration = 0.65,
    className,
    as = "div",
    amount = 0.2,
}: RevealProps) {
    const prefersReduced = useReducedMotion();
    const offset = prefersReduced
        ? { x: 0, y: 0 }
        : direction === "right"
            ? { x: -distance, y: 0 }
            : direction === "none"
                ? { x: 0, y: 0 }
                : { x: 0, y: distance };

    const Component =
        as === "li" ? motion.li :
        as === "section" ? motion.section :
        as === "article" ? motion.article :
        motion.div;

    return (
        <Component
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount, margin: "0px 0px -80px 0px" }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </Component>
    );
}
