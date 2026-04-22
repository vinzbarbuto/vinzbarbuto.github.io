import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import styles from "./page.module.css";
import SectionLayout from "@/components/SectionLayout";
import HeroVisuals from "@/components/HeroVisuals";
import HeroTextLayer from "@/components/HeroTextLayer";
import ScholarStatsWidget from "@/components/ScholarStatsWidget";
import SpotlightLink from "@/components/SpotlightLink";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { talks } from "@/data/talks";
import { withBasePath } from "@/lib/basePath";

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "TensorFlow Lite",
  "Lingua Franca",
  "Edge AI",
  "Digital Twins",
  "Cyber-Physical Systems",
  "Multi Agent Systems",
  "Angular",
  "Node Red",
  "Grafana",
  "AWS Cloud",
  "Eclipse Ditto",
] as const;

export default function Home() {
  const recentPublications = publications.slice(0, 3);
  const featuredProject = projects.find((p) => p.featured) ?? null;

  return (
    <>
      {/* Hero Section — spatial glass overhaul */}
      <section className={styles.spatialHero} id="home">
        <div className={`container ${styles.spatialContainer}`}>
          <div className={styles.spatialGrid}>
            <HeroVisuals />
            <HeroTextLayer />
          </div>
        </div>
      </section>

      {/* About Section */}
      <SectionLayout
        id="about"
        title="About Me"
        subtitle="My academic journey and research interests."
      >
        <div className={styles.aboutGrid}>
          <div>
            <p className={styles.bio}>{profile.bio}</p>
            <h3 className={styles.aboutBlockTitle}>Research Interests</h3>
            <ul className={styles.interestsList}>
              {profile.interests.map((interest, index) => (
                <li key={index} className={styles.interestItem}>{interest}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.aboutBlockTitle}>Education</h3>
            <div className={styles.timeline}>
              {profile.education.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineDegree}>{item.degree}</h4>
                    <p className={styles.timelineInstitution}>{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Core Technologies Marquee */}
      <section className={styles.marqueeSection}>
        <div className={`container ${styles.marqueeHeader}`}>
          <h2 className={styles.marqueeHeading}>Core Technologies</h2>
        </div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...TECH, ...TECH].map((tech, idx) => (
              <div key={`${tech}-${idx}`} className={styles.marqueeItem}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <SectionLayout
          id="featured-project"
          title="Featured Project"
          subtitle="A deep dive into one of my key research activities."
        >
          <SpotlightLink href={`/projects/${featuredProject.id}`} className={styles.featuredCard}>
            <div className={styles.featuredContent}>
              <div className={styles.featuredBadge}>Highlighted</div>
              <div className={styles.featuredTextInner}>
                <p className={styles.featuredSubtitle}>
                  {featuredProject.featuredSubtitle ?? featuredProject.tags.join(" · ")}
                </p>
                <h3 className={styles.featuredTitle}>
                  {featuredProject.title}
                </h3>
                <p className={styles.featuredBlurb}>
                  {featuredProject.featuredBlurb ?? featuredProject.description}
                </p>
                <div className={styles.featuredCta}>
                  View Case Study <ArrowRight size={18} />
                </div>
              </div>
            </div>

            <div className={`${styles.featuredVisual} ${featuredProject.isLogo ? styles.featuredVisualLogo : ""}`}>
              <Image
                src={withBasePath(featuredProject.image || "/placeholder.webp")}
                alt={featuredProject.title}
                fill
                className={`${styles.featuredImageEffect} ${featuredProject.isLogo ? styles.featuredImageLogo : styles.featuredImageCover}`}
              />
              {!featuredProject.isLogo && <div className={styles.featuredVisualOverlay} />}
            </div>
          </SpotlightLink>
        </SectionLayout>
      )}

      {/* Recent Publications */}
      <SectionLayout
        id="recent-publications"
        title="Recent Publications"
        subtitle="My latest research on Edge AI and Digital Twins."
      >
        <div className={styles.stackLg}>
          <ScholarStatsWidget variant="cards" />

          {recentPublications.map((pub) => (
            <SpotlightLink href={`/publications/${pub.id}`} key={pub.id} className={styles.previewCard}>
              <div className={styles.previewImageWrapper}>
                <Image
                  src={withBasePath(pub.image || "/placeholder.webp")}
                  alt={pub.title}
                  fill
                  className={styles.previewImage}
                />
              </div>

              <div className={styles.previewContent}>
                <h3 className={styles.previewTitle}>{pub.title}</h3>

                <div className={styles.previewMeta}>
                  <span className={styles.previewMetaStrong}>{pub.type}</span>
                  <span>•</span>
                  <span>{pub.venue}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                </div>

                <p className={styles.previewDesc}>
                  {pub.abstract}
                </p>

                <div className={styles.previewTags}>
                  {pub.tags.map(tag => (
                    <span key={tag} className={`${styles.interestItem} ${styles.tagSm}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightLink>
          ))}

          <Link href="/publications" className={styles.sectionLink}>
            See all publications <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>

      {/* Recent Talks */}
      <SectionLayout
        id="recent-talks"
        title="Recent Talks & News"
        subtitle="Latest presentations and workshops."
      >
        <div className={styles.stackLg}>
          {talks.slice(0, 2).map((talk) => (
            <SpotlightLink href={`/talks/${talk.id}`} key={talk.id} className={styles.previewCard}>
              <div className={`${styles.previewImageWrapper} ${talk.isLogo ? styles.previewImageLogoWrap : ""}`}>
                <Image
                  src={withBasePath(talk.image || "/placeholder.webp")}
                  alt={talk.title}
                  fill
                  className={talk.isLogo ? styles.previewImageLogo : styles.previewImage}
                />
              </div>

              <div className={styles.previewContent}>
                <h3 className={styles.previewTitle}>{talk.title}</h3>

                <div className={styles.previewMeta}>
                  <span className={styles.previewMetaIcon}>
                    <MapPin size={16} /> {talk.event}
                  </span>
                  <span>•</span>
                  <span className={styles.previewMetaIcon}>
                    <Calendar size={16} /> {talk.date}
                  </span>
                </div>

                <p className={styles.previewDesc}>
                  {talk.description}
                </p>
              </div>
            </SpotlightLink>
          ))}

          <Link href="/talks" className={styles.sectionLink}>
            See all talks <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>
    </>
  );
}
