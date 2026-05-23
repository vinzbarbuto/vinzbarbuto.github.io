"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Mail, 
  FileText, 
  Briefcase, 
  ExternalLink,
  Code,
  Award,
  Globe,
} from "lucide-react";
import Link from "next/link";
import styles from "./InfoModal.module.css";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { talks } from "@/data/talks";
import { teaching } from "@/data/teaching";
import { experience } from "@/data/experience";

interface InfoModalProps {
  section: string | null;
  onClose: () => void;
}

export default function InfoModal({ section, onClose }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "publications">("projects");

  // Prevent scrolling behind the modal when it is open
  useEffect(() => {
    if (section) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [section]);

  // Reset tab when section changes to projects
  useEffect(() => {
    if (section === "projects") {
      setActiveTab("projects");
    }
  }, [section]);

  if (!section) return null;

  // Render content based on active section
  const renderContent = () => {
    switch (section) {
      case "projects":
        return (
          <div>
            <div className={styles.tabContainer}>
              <button 
                className={`${styles.tabButton} ${activeTab === "projects" ? styles.tabButtonActive : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === "publications" ? styles.tabButtonActive : ""}`}
                onClick={() => setActiveTab("publications")}
              >
                Publications ({publications.length})
              </button>
            </div>

            {activeTab === "projects" ? (
              <div className={styles.cardList}>
                {projects.map((proj) => (
                  <div key={proj.id} className={styles.cardItem}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{proj.title}</h3>
                      <span className={styles.cardMeta}>{proj.period}</span>
                    </div>
                    <p className={styles.cardDesc}>{proj.description}</p>
                    <div className={styles.cardTags}>
                      {proj.tags.map((tag) => (
                        <span key={tag} className={styles.cardTag}>{tag}</span>
                      ))}
                    </div>
                    <Link href={`/projects/${proj.id}`} className={styles.cardLink} onClick={onClose}>
                      View Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.cardList}>
                {publications.map((pub) => (
                  <div key={pub.id} className={styles.cardItem}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardTag}>{pub.type}</span>
                      <span className={styles.cardMeta}>{pub.year}</span>
                    </div>
                    <h3 className={styles.cardTitle} style={{ fontSize: "15px", marginBottom: "0.5rem" }}>{pub.title}</h3>
                    <div className={styles.cardSub} style={{ fontSize: "13px" }}>{pub.authors}</div>
                    <div className={styles.cardSub} style={{ fontSize: "13px", opacity: 0.8, marginBottom: "0.5rem" }}>{pub.venue}</div>
                    <p className={styles.cardDesc} style={{ fontSize: "13px", opacity: 0.85 }}>{pub.abstract.slice(0, 160)}...</p>
                    <div className={styles.cardTags} style={{ marginBottom: "0.75rem" }}>
                      {pub.tags.map((tag) => (
                        <span key={tag} className={styles.cardTag}>{tag}</span>
                      ))}
                    </div>
                    <Link href={`/publications/${pub.id}`} className={styles.cardLink} onClick={onClose}>
                      Full Abstract & Citation <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "experiences":
        return (
          <div className={styles.cardList}>
            {experience.work.map((w, idx) => (
              <div key={idx} className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{w.role}</h3>
                  <span className={styles.cardMeta}>{w.period}</span>
                </div>
                <div className={styles.cardSub}>{w.institution}</div>
                <p className={styles.cardDesc}>{w.description}</p>
                {w.url && (
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                    Visit Institution <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className={styles.cardList}>
            {experience.education.map((edu, idx) => (
              <div key={idx} className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{edu.degree}</h3>
                  <span className={styles.cardMeta}>{edu.period}</span>
                </div>
                <div className={styles.cardSub}>{edu.institution}</div>
                {edu.description && <p className={styles.cardDesc}>{edu.description}</p>}
                {edu.url && (
                  <a href={edu.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                    Visit University <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        );

      case "teaching":
        return (
          <div className={styles.cardList}>
            {teaching.map((t) => (
              <div key={t.id} className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{t.course}</h3>
                  <span className={styles.cardMeta}>{t.period}</span>
                </div>
                <div className={styles.cardSub}>{t.role} — {t.institution}</div>
                <p className={styles.cardDesc}>{t.description}</p>
              </div>
            ))}
          </div>
        );

      case "talks":
        return (
          <div className={styles.cardList}>
            {talks.map((talk) => (
              <div key={talk.id} className={styles.cardItem}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{talk.title}</h3>
                  <span className={styles.cardMeta}>{talk.date}</span>
                </div>
                <div className={styles.cardSub}>{talk.event}</div>
                <p className={styles.cardDesc}>{talk.description}</p>
                <Link href={`/talks/${talk.id}`} className={styles.cardLink} onClick={onClose}>
                  View Presentation Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        );

      case "career":
        return (
          <div>
            <div className={styles.bioText}>
              <h3 className={styles.cardTitle} style={{ color: "var(--accent-bright)", marginBottom: "0.5rem" }}>
                {profile.role} at {profile.institution}
              </h3>
              <p>{profile.bio}</p>
            </div>

            <h4 style={{ color: "var(--text-0)", margin: "1.5rem 0 0.75rem", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Research Interests
            </h4>
            <div className={styles.interestsList}>
              {profile.interests.map((interest, idx) => (
                <div key={idx} className={styles.interestItem}>
                  <Award className={styles.interestIcon} size={16} />
                  <span>{interest}</span>
                </div>
              ))}
            </div>

            <h4 style={{ color: "var(--text-0)", margin: "1.5rem 0 0.75rem", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Contact & Curriculum Vitae
            </h4>
            <p className={styles.cardDesc}>
              Connect for research opportunities, collaborations, or speaking engagements.
            </p>
            
            <div className={styles.socialGrid}>
              <a href={profile.socials.cv} target="_blank" rel="noopener noreferrer" className={styles.socialButton} style={{ borderColor: "var(--accent-bright)", color: "var(--accent-bright)" }}>
                <FileText size={16} /> Download Resume / CV
              </a>
              <a href={`mailto:${profile.email}`} className={styles.socialButton}>
                <Mail size={16} /> Email Vincenzo
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <Globe size={16} /> LinkedIn
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <Code size={16} /> GitHub
              </a>
              <a href={profile.socials.scholar} target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <Award size={16} /> Google Scholar
              </a>
              <a href={profile.socials.scopus} target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                <BookOpen size={16} /> Scopus Profile
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case "projects":
        return { category: "Digital Library", title: "Projects & Publications" };
      case "experiences":
        return { category: "Professional Path", title: "Work Experience" };
      case "education":
        return { category: "Academic Track", title: "Education & Degrees" };
      case "teaching":
        return { category: "Academic Service", title: "Teaching & Tutoring" };
      case "talks":
        return { category: "Dissemination", title: "Talks & Presentations" };
      case "career":
        return { category: "Curriculum Vitae", title: "Career Summary & CV" };
      default:
        return { category: "", title: "" };
    }
  };

  const { category, title } = getSectionTitle();

  return (
    <AnimatePresence>
      <div className={styles.overlay}>
        {/* Animated Background Blur Backdrop */}
        <motion.div 
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Animated modal container */}
        <motion.div 
          className={styles.modalContainer}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
          
          <div className={styles.modalHeader}>
            <div className={styles.modalCategory}>{category}</div>
            <h2 className={styles.modalTitle}>{title}</h2>
          </div>

          <div className={styles.modalBody}>
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
