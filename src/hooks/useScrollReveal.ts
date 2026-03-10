"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Dynamically set visibility based on intersection state for repeatable animations
            setIsVisible(entry.isIntersecting);
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return { ref, isVisible };
}
