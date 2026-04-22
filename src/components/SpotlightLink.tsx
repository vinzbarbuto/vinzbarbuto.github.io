"use client";

import Link, { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
        children: ReactNode;
        className?: string;
    };

export default function SpotlightLink({ children, onMouseMove, ...props }: Props) {
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
        onMouseMove?.(e);
    };
    return (
        <Link {...props} onMouseMove={handle}>
            {children}
        </Link>
    );
}
