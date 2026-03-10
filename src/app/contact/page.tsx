import type { Metadata } from "next";
import SectionLayout from "@/components/SectionLayout";
import { profile } from "@/data/profile";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import styles from "../page.module.css";

export const metadata: Metadata = {
    title: "Contact | Vincenzo Barbuto",
    description: "Get in touch with Vincenzo Barbuto.",
};

export default function ContactPage() {
    return (
        <SectionLayout
            title="Contact"
            subtitle="Let's connect. Reach out for collaborations or inquiries."
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem", width: "100%" }}>

                {/* Top Section: Message and Contact Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
                    {/* Left: Text & Collaboration Hook */}
                    <div>
                        <h3 className={styles.spatialTitle} style={{ fontSize: "2.5rem", marginBottom: "1.5rem", lineHeight: 1.2 }}>
                            Let's Build Something <span className={styles.spatialHighlight}>Together.</span>
                        </h3>
                        <p className={styles.bio} style={{ fontSize: "1.1rem", marginBottom: "2rem", lineHeight: 1.6 }}>
                            I am always open to discussing research collaborations, innovative projects, or sharing insights.
                            Feel free to reach out to me via email or connect with me on LinkedIn. My inbox is always open!
                        </p>
                    </div>

                    {/* Right: Premium Premium Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <a href={profile.socials.email} className={styles.previewCard} style={{ display: "flex", alignItems: "center", padding: "1.5rem", gap: "1.5rem", transition: "all 0.3s ease" }}>
                            <div style={{ padding: "1rem", backgroundColor: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Mail size={28} color="var(--primary)" />
                            </div>
                            <div>
                                <span style={{ fontWeight: "700", fontSize: "1.2rem", display: "block", color: "var(--foreground)", marginBottom: "0.25rem" }}>Email</span>
                                <span style={{ color: "var(--secondary)", fontSize: "0.95rem" }}>vincenzo.barbuto@unical.it</span>
                            </div>
                        </a>

                        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.previewCard} style={{ display: "flex", alignItems: "center", padding: "1.5rem", gap: "1.5rem", transition: "all 0.3s ease" }}>
                            <div style={{ padding: "1rem", backgroundColor: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Linkedin size={28} color="var(--primary)" />
                            </div>
                            <div>
                                <span style={{ fontWeight: "700", fontSize: "1.2rem", display: "block", color: "var(--foreground)", marginBottom: "0.25rem" }}>LinkedIn</span>
                                <span style={{ color: "var(--secondary)", fontSize: "0.95rem" }}>Connect with me professionally</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Bottom Section: Panoramic Wide Map */}
                <div className={styles.previewCard} style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "2rem", borderBottom: "1px solid var(--card-border)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                        <h4 className={styles.previewTitle} style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Office Location</h4>
                        <p className={styles.previewDesc} style={{ margin: 0 }}>
                            Via Pietro Bucci, 87036 Arcavacata CS — Building 41C, 4th floor
                        </p>
                    </div>

                    {/* The Full Width Map Container */}
                    <div style={{ width: "100%", height: "450px", position: "relative" }}>
                        {/* Inner shadow overlay for premium depth */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)", pointerEvents: "none", zIndex: 10 }}></div>

                        <iframe
                            src="https://maps.google.com/maps?q=39.365544,16.225538&z=16&output=embed"
                            width="100%"
                            height="100%"
                            style={{
                                border: 0,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                filter: "invert(90%) hue-rotate(180deg) contrast(85%) saturate(120%)"
                            }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location Map"
                        ></iframe>
                    </div>
                </div>

            </div>
        </SectionLayout>
    );
}
