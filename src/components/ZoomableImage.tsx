"use client";

import { useRef } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import styles from "./ZoomableImage.module.css";

interface ZoomableImageProps {
    src: string;
    alt: string;
    /** False renders the plain cropped frame, e.g. for the placeholder image. */
    zoomable?: boolean;
    /** Sizes the frame (height, margins). Defaults to the publication hero size. */
    className?: string;
    /** CSS object-position of the cropped image, e.g. "left" or "center 62%". */
    objectPosition?: string;
}

/**
 * Hero image that is cropped to its frame and opens uncropped in a dialog.
 * A native <dialog> provides the focus trap, Escape to close and focus return.
 */
export default function ZoomableImage({
    src,
    alt,
    zoomable = true,
    className = styles.publicationHero,
    objectPosition = "center",
}: ZoomableImageProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const picture = <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition }} priority />;
    const frameClass = `${styles.frame} ${className}`;

    if (!zoomable) {
        return <div className={frameClass}>{picture}</div>;
    }

    return (
        <>
            <button
                type="button"
                className={`${frameClass} ${styles.trigger}`}
                onClick={() => dialogRef.current?.showModal()}
            >
                {picture}
                <span className={styles.hint}>
                    <Maximize2 size={14} aria-hidden="true" />
                    View full image
                </span>
            </button>

            <dialog
                ref={dialogRef}
                className={styles.dialog}
                aria-label="Full image"
                onClick={(event) => {
                    // Only a click on the scrim itself, not on the image or the button.
                    if (event.target === event.currentTarget) event.currentTarget.close();
                }}
            >
                <button
                    type="button"
                    className={styles.close}
                    aria-label="Close image"
                    onClick={() => dialogRef.current?.close()}
                >
                    <X size={20} aria-hidden="true" />
                </button>
                <img src={src} alt={alt} className={styles.full} decoding="async" />
            </dialog>
        </>
    );
}
