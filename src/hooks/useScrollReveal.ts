"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.1, rootMargin = "0px 0px -50px 0px") {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold, rootMargin]);

    return { ref, isVisible };
}
