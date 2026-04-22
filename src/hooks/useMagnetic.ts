"use client";

import { useEffect, useRef } from "react";

export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 18) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof window === "undefined") return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const touch = !window.matchMedia("(hover: hover)").matches;
        if (reduced || touch) return;

        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
        };
        const leave = () => {
            el.style.transform = "";
        };

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
        };
    }, [strength]);

    return ref;
}
