"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
    const prefersReduced = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    );
}
