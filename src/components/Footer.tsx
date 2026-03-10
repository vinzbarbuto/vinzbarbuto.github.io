"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>Ready to collaborate?</h2>
                    <p className={styles.ctaSubtitle}>I'm always open to discussing research, creative ideas or new opportunities.</p>
                    <Link href="/contact" className={styles.ctaButton}>
                        Get in Touch <Mail size={18} />
                    </Link>
                </div>

                <div className={styles.socialLinks}>
                    <a href="mailto:vincenzo.barbuto@unical.it" className={styles.socialLink} aria-label="Email">
                        <Mail size={24} />
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/vbarbuto/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                        <Linkedin size={24} />
                    </a>
                </div>

                <div className={styles.copyright}>
                    <p>© {year} Vincenzo Barbuto. All rights reserved.</p>
                    <p>Built with Next.js</p>
                </div>
            </div>
        </footer>
    );
}
