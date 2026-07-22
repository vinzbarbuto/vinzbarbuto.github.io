"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../app/page.module.css";

const TECH = [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "PyTorch",
    "Java",
    "C++",
    "Shell",
    "TensorFlow Lite",
    "NVIDIA JetPack",
    "Arduino",
    "Lingua Franca",
    "Angular",
    "Node-RED",
    "Grafana",
    "AWS Cloud",
    "Eclipse Ditto",
] as const;

/** Pixels per second for auto-scroll speed */
const AUTO_SCROLL_SPEED = 40;
/** How far arrow buttons jump (px) */
const ARROW_JUMP = 280;

export default function MarqueeSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const pausedRef = useRef(false);

    /* drag state */
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);

    /* arrow visibility */
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    /* ── Infinite-loop scroll: when the track reaches the duplicate boundary, silently
       reset to the mirrored position so the user never sees an edge. ── */
    const clampScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
            el.scrollLeft -= half;
        } else if (el.scrollLeft <= 0) {
            el.scrollLeft += half;
        }
    }, []);

    /* ── Update arrow button visibility ── */
    const updateArrows = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const half = el.scrollWidth / 2;
        // Because of infinite scroll, arrows are always enabled — but we dim them
        // near the virtual boundaries for polish.
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft < half - 4);
    }, []);

    /* ── Auto-scroll animation loop ── */
    const tick = useCallback(
        (time: number) => {
            if (lastTimeRef.current) {
                const dt = (time - lastTimeRef.current) / 1000;
                if (!pausedRef.current && trackRef.current) {
                    trackRef.current.scrollLeft += AUTO_SCROLL_SPEED * dt;
                    clampScroll();
                    updateArrows();
                }
            }
            lastTimeRef.current = time;
            rafRef.current = requestAnimationFrame(tick);
        },
        [clampScroll, updateArrows]
    );

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [tick]);

    /* ── Pause on hover ── */
    const pause = () => {
        pausedRef.current = true;
    };
    const resume = () => {
        if (!isDragging.current) pausedRef.current = false;
    };

    /* ── Drag-to-scroll (desktop) ── */
    const onPointerDown = (e: React.PointerEvent) => {
        const el = trackRef.current;
        if (!el) return;
        isDragging.current = true;
        pausedRef.current = true;
        dragStartX.current = e.clientX;
        dragScrollLeft.current = el.scrollLeft;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current || !trackRef.current) return;
        const dx = e.clientX - dragStartX.current;
        trackRef.current.scrollLeft = dragScrollLeft.current - dx;
        clampScroll();
        updateArrows();
    };

    const onPointerUp = (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        pausedRef.current = false;
        const el = trackRef.current;
        if (el) {
            el.releasePointerCapture(e.pointerId);
            el.style.cursor = "";
        }
    };

    /* ── Scroll via native wheel / trackpad ── */
    const onWheel = (e: React.WheelEvent) => {
        const el = trackRef.current;
        if (!el) return;
        // If the user is scrolling horizontally (trackpad) let them navigate
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            el.scrollLeft += e.deltaX;
            clampScroll();
            updateArrows();
        }
    };

    /* ── Arrow buttons ── */
    const scrollBy = (dir: number) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollTo({
            left: el.scrollLeft + dir * ARROW_JUMP,
            behavior: "smooth",
        });
        setTimeout(() => {
            clampScroll();
            updateArrows();
        }, 350);
    };

    return (
        <section className={styles.marqueeSection}>
            <div className={`container ${styles.marqueeHeader}`}>
                <h2 className={styles.marqueeHeading}>Core Technologies</h2>
            </div>

            <div className={styles.marqueeOuter}>
                {/* Left arrow */}
                <button
                    className={`${styles.marqueeArrow} ${styles.marqueeArrowLeft}`}
                    onClick={() => scrollBy(-1)}
                    aria-label="Scroll left"
                    data-visible={canScrollLeft}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Scrollable track */}
                <div
                    ref={trackRef}
                    className={styles.marqueeContainer}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    onWheel={onWheel}
                >
                    <div className={styles.marqueeTrack}>
                        {/* Triple the items: the middle set is the "real" set,
                            left and right are clones for seamless infinite scroll */}
                        {[...TECH, ...TECH, ...TECH].map((tech, idx) => (
                            <div key={`${tech}-${idx}`} className={styles.marqueeItem}>
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right arrow */}
                <button
                    className={`${styles.marqueeArrow} ${styles.marqueeArrowRight}`}
                    onClick={() => scrollBy(1)}
                    aria-label="Scroll right"
                    data-visible={canScrollRight}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}
