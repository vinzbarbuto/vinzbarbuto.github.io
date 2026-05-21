import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import SectionLayout from "@/components/SectionLayout";
import Reveal from "@/components/Reveal";
import HeroVisuals from "@/components/HeroVisuals";
import HeroTextLayer from "@/components/HeroTextLayer";
import ScholarStatsWidget from "@/components/ScholarStatsWidget";
import SpotlightLink from "@/components/SpotlightLink";
import MarqueeSection from "@/components/MarqueeSection";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { talks } from "@/data/talks";
import { withBasePath } from "@/lib/basePath";


export default function Home() {
  const recentPublications = publications.slice(0, 3);
  const featuredProject = projects.find((p) => p.featured) ?? null;

  return (
    <>
      {/* Hero Section — spatial glass overhaul */}
      <section className={styles.spatialHero} id="home">
        <div className={`container ${styles.spatialContainer}`}>
          <div className={styles.spatialGrid}>
            <HeroTextLayer />
            <HeroVisuals />
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
                <Reveal key={index} delay={index * 0.07} distance={16}>
                  <div className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <h4 className={styles.timelineDegree}>{item.degree}</h4>
                      <p className={styles.timelineInstitution}>{item.institution}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Core Technologies Marquee */}
      <MarqueeSection />

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

      {/* Recent Publications — numbered editorial list, no card chrome */}
      <SectionLayout
        id="recent-publications"
        title="Recent Publications"
        subtitle="My latest research on Edge AI and Digital Twins."
      >
        <div className={styles.stackLg}>
          <ScholarStatsWidget variant="cards" />

          <ol className={styles.pubList}>
            {recentPublications.map((pub, index) => (
              <Reveal key={pub.id} as="li" delay={index * 0.08}>
                <Link href={`/publications/${pub.id}`} className={styles.pubItem}>
                  <span className={styles.pubNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.pubItemBody}>
                    <h3 className={styles.pubItemTitle}>{pub.title}</h3>
                    <div className={styles.pubItemMeta}>
                      <span className={styles.pubItemMetaType}>{pub.type}</span>
                      <span className={styles.pubItemMetaDot} aria-hidden="true">/</span>
                      <span>{pub.venue}</span>
                      <span className={styles.pubItemMetaDot} aria-hidden="true">/</span>
                      <span>{pub.year}</span>
                    </div>
                    <p className={styles.pubItemAbstract}>{pub.abstract}</p>
                    <div className={styles.pubItemTags}>
                      {pub.tags.map(tag => (
                        <span key={tag} className={`${styles.interestItem} ${styles.tagSm}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={styles.pubItemArrow}>
                      Read paper <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>

          <Link href="/publications" className={styles.sectionLink}>
            See all publications <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>

      {/* Recent Talks — date-led timeline, no card chrome */}
      <SectionLayout
        id="recent-talks"
        title="Recent Talks & News"
        subtitle="Latest presentations and workshops."
      >
        <div className={styles.stackLg}>
          <ol className={styles.talkList}>
            {talks.slice(0, 2).map((talk, index) => (
              <Reveal key={talk.id} as="li" delay={index * 0.08}>
                <Link href={`/talks/${talk.id}`} className={styles.talkItem}>
                  <span className={styles.talkDate}>{talk.date}</span>
                  <div className={styles.talkItemBody}>
                    <h3 className={styles.talkItemTitle}>{talk.title}</h3>
                    <div className={styles.talkItemEvent}>{talk.event}</div>
                    <p className={styles.talkItemDesc}>{talk.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>

          <Link href="/talks" className={styles.sectionLink}>
            See all talks <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>
    </>
  );
}
