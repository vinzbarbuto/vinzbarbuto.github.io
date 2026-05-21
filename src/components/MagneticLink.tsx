"use client";

import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    strength?: number;
    children: React.ReactNode;
}

export function MagneticLink({ children, strength = 12, ...props }: MagneticLinkProps) {
    const ref = useMagnetic<HTMLAnchorElement>(strength);
    return (
        <a ref={ref} {...props}>
            {children}
        </a>
    );
}
