"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/experience" },
    { name: "Publications", href: "/publications" },
    { name: "Projects", href: "/projects" },
    { name: "Talks", href: "/talks" },
    { name: "Teaching", href: "/teaching" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/#about" || href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Vincenzo <span>Barbuto</span>
                </Link>

                <LayoutGroup id="nav">
                    <div className={`${styles.navLinks} ${isOpen ? styles.mobileOpen : ""}`}>
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`${styles.navLink} ${active ? styles.active : ""}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className={styles.navPill}
                                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className={styles.navLinkLabel}>{link.name}</span>
                                </Link>
                            );
                        })}
                        <Link
                            href="/workspace"
                            className={styles.threeDStudioBtn}
                            onClick={() => setIsOpen(false)}
                        >
                            <span>3D Studio</span>
                        </Link>
                    </div>
                </LayoutGroup>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
