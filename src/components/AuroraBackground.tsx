"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        let raf = 0;
        let x = 0,
            y = 0,
            tx = 0,
            ty = 0;
        const onMove = (e: PointerEvent) => {
            tx = (e.clientX / window.innerWidth - 0.5) * 40;
            ty = (e.clientY / window.innerHeight - 0.5) * 40;
        };
        const tick = () => {
            x += (tx - x) * 0.06;
            y += (ty - y) * 0.06;
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y}px`);
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={ref} className="global-fluid-bg" aria-hidden="true">
            <div className="global-blob global-blob-1" />
            <div className="global-blob global-blob-2" />
            <div className="global-blob global-blob-3" />
            <div className="global-grain" />
        </div>
    );
}
