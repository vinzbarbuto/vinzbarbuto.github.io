import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, ChevronRight, MapPin, Calendar } from "lucide-react";
import styles from "./page.module.css";
import SectionLayout from "@/components/SectionLayout";
import HeroVisuals from "@/components/HeroVisuals";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { talks } from "@/data/talks";
import { withBasePath } from "@/lib/basePath";

export default function Home() {
  const recentPublications = publications.slice(0, 3);

  return (
    <>
      {/* Hero Section - Open Spatial Overhaul */}
      <section className={styles.spatialHero} id="home">


        <div className={`container ${styles.spatialContainer}`}>
          <div className={styles.spatialGrid}>

            {/* Visual Layer: Profile + Rotating Tech Ring (NOW ON LEFT) */}
            <HeroVisuals />

            {/* Text Layer: Cinematic Typography (NOW ON RIGHT) */}
            <div className={`${styles.spatialTextLayer} animate-fade-in-up delay-200`}>
              <div className={styles.statusPill}>
                <div className={styles.statusDot}></div>
                <span>Available for Collaborations</span>
              </div>

              <h1 className={styles.spatialTitle}>
                Building Intelligent <br />
                <span className={styles.spatialHighlight}>Autonomous Architectures.</span>
              </h1>

              <p className={styles.spatialBio}>
                I'm <strong>{profile.name}</strong>, a {profile.role} at {profile.institution}.
                Exploring the frontiers of Edge AI, Digital Twins, and Cyber-Physical Systems.
              </p>

              <div className={styles.spatialActions}>
                <a href={profile.socials.cv} target="_blank" rel="noopener noreferrer" className={styles.btnSpatialPrimary}>
                  <Download size={18} />
                  Download Résumé
                </a>

                <div className={styles.spatialSocials}>
                  <a href={profile.socials.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
                    <svg viewBox="0 0 384 512" width="22" height="22" fill="currentColor"><path d="M 343.75868,106.66243 V 79.430205 L 363.52365,63.999997 H 149.63354 L 20.476345,176.2736 h 85.656075 c -0.15534,2.12494 -0.21914,4.04644 -0.21914,6.22563 0,20.84472 7.2192,38.08662 21.67203,51.86089 14.45284,13.79702 32.25124,20.64784 53.32651,20.64784 4.92319,0 9.75059,-0.36794 14.43842,-1.02419 -2.90722,6.50082 -4.37457,12.52302 -4.37457,18.14228 0,9.87526 4.49924,20.4304 13.46715,31.6418 -39.23377,2.6705 -68.06112,9.73264 -86.43702,21.16322 -10.53108,6.49907 -19.000207,14.70396 -25.390349,24.5311 -6.390569,9.89933 -9.577754,20.51525 -9.577754,31.9616 0,9.64822 2.062375,18.33611 6.21907,26.06233 4.156694,7.7263 9.577757,14.07047 16.312223,18.98408 6.71825,4.96781 14.46899,9.10088 23.219,12.46874 8.73429,3.34378 17.40643,5.71858 26.06106,7.06258 8.62707,1.34222 17.20471,1.9985 25.70579,1.9985 13.46887,0 26.95353,-1.73428 40.54711,-5.18707 13.56165,-3.48461 26.28022,-8.64143 38.17105,-15.4927 11.85935,-6.80488 21.51545,-16.0865 28.9219,-27.7183 7.39024,-11.67998 11.09457,-24.80499 11.09457,-39.33613 0,-11.01584 -2.24964,-21.03852 -6.7502,-30.14073 -4.46864,-9.07202 -9.93785,-16.54102 -16.45271,-22.34403 -6.5008,-5.81263 -12.99987,-11.15539 -19.51512,-15.9679 -6.50083,-4.84488 -12.00021,-9.75058 -16.46884,-14.8129 -4.4848,-5.04657 -6.73444,-10.05419 -6.73444,-14.98395 0,-4.92145 1.73422,-9.67183 5.21588,-14.26559 3.45451,-4.6095 7.67376,-9.04795 12.60967,-13.30571 4.93756,-4.24944 9.87523,-8.96788 14.79665,-14.13302 4.92147,-5.14719 9.14072,-11.82739 12.60971,-20.00822 3.48467,-8.17907 5.20318,-17.44489 5.20318,-27.75679 0,-13.4527 -2.54714,-24.46065 -7.54735,-33.31348 -0.59369,-1.02243 -1.21757,-1.80338 -1.87511,-3.02225 l 56.90745,-46.672136 v 17.118526 c -7.39373,0.92969 -6.62422,5.34582 -6.62422,10.6352 v 128.66719 c 0,5.95832 4.8751,10.83382 10.83386,10.83382 h 3.98869 c 5.95835,0 10.83386,-4.87506 10.83386,-10.83382 V 117.29282 c 0,-5.27669 0.77741,-9.68801 -6.56167,-10.63039 z M 236.39865,329.14114 c 1.14099,0.7503 3.7039,2.78075 7.7184,6.03838 4.0495,3.24319 6.797,5.69582 8.26567,7.41432 1.43851,1.66381 3.5792,4.16501 6.37617,7.54734 2.81268,3.3744 4.7184,6.30394 5.71853,8.73425 1.00016,2.4767 2.01603,5.46089 3.04636,8.94556 0.98567,3.44488 1.48486,6.97595 1.48486,10.56169 0,17.04813 -6.56338,29.68007 -19.65604,37.85915 -13.125,8.18083 -28.76651,12.27368 -46.93767,12.27368 -9.18709,0 -18.2031,-1.09289 -27.06247,-3.1951 -8.84322,-2.11665 -17.31192,-5.3362 -25.39035,-9.60185 -8.07846,-4.25771 -14.57754,-10.20337 -19.50072,-17.79659 -4.93764,-7.64012 -7.40645,-16.41464 -7.40645,-26.24962 0,-10.32022 2.79692,-19.28987 8.42233,-26.90588 5.59343,-7.62564 12.93774,-13.3919 22.03208,-17.3154 9.0624,-3.94582 18.24946,-6.74232 27.56166,-8.39827 9.31221,-1.7023 18.79679,-2.555 28.43842,-2.555 4.46862,0 7.93582,0.25115 10.40465,0.69607 0.45456,0.21918 3.03188,2.07025 7.73456,5.56326 4.70401,3.46237 7.62565,5.59519 8.75047,6.38401 z m -3.35823,-100.5779 c -7.40648,8.85938 -17.73454,13.2882 -30.95363,13.2882 -11.85933,0 -22.29766,-4.76482 -31.26554,-14.31195 -8.99984,-9.52309 -15.42235,-20.32803 -19.34408,-32.43061 -3.93752,-12.10871 -5.90585,-23.98423 -5.90585,-35.648 0,-13.6942 3.59542,-25.35184 10.7809,-34.97598 7.18727,-9.64952 17.49915,-14.48477 30.93786,-14.48477 11.87507,0 22.37423,5.03825 31.43704,15.15677 9.09434,10.08482 15.60961,21.41303 19.5169,33.96799 3.92176,12.5392 5.87345,24.52979 5.87345,35.98399 0,13.44658 -3.70256,24.60984 -11.07663,33.45436 z" /></svg>
                  </a>
                  <a href={profile.socials.scopus} target="_blank" rel="noopener noreferrer" aria-label="Scopus">
                    <svg viewBox="0 0 512 512" width="22" height="22" fill="currentColor"><path d="M 64,64 V 448 H 448 V 64 Z m 116.81542,99.92578 c 22.22181,0 32.04017,2.58584 45.73537,8.27051 l -1.292,20.41113 c -14.72837,-8.7855 -26.35575,-11.36718 -43.15137,-11.36718 -19.37945,0 -29.2002,14.72659 -29.2002,28.16308 0,18.08753 17.31277,24.80703 33.59181,34.62597 20.92965,12.40292 42.63573,23.51411 42.63573,48.06153 0,32.2992 -27.64955,48.57714 -54.00585,48.57714 -18.86288,0 -32.5565,-2.84253 -45.99316,-9.04393 l 3.10254,-20.41407 c 13.17814,8.01015 24.54717,11.88867 41.85937,11.88867 17.57072,0 32.29688,-11.88662 32.29688,-28.42383 0,-17.05391 -16.53489,-23.51559 -32.29688,-33.07617 -21.18819,-12.91968 -44.44336,-24.28934 -44.44336,-50.64551 0,-26.35612 19.37863,-47.02734 51.16112,-47.02734 z m 161.70412,0 c 26.09777,0 37.72572,3.10211 51.9375,9.82031 l -1.54982,19.37988 c -15.50393,-8.52716 -31.78349,-11.88573 -52.97168,-11.88573 -33.59128,0 -62.27343,26.61294 -62.27343,69.76464 0,40.82619 29.19944,71.5752 65.8916,71.5752 16.79562,0 33.59152,-3.35879 49.35351,-11.88575 l 1.54981,19.6377 c -13.95327,6.97658 -31.52275,9.82031 -52.71094,9.82031 -42.11835,0 -87.33692,-31.00949 -87.33692,-87.59766 0,-49.6116 37.98197,-88.6289 88.11037,-88.6289 z" /></svg>
                  </a>
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  </a>
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                  <a href={profile.socials.email} aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </a>
                </div>
              </div>
            </div>

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
            <h3 className={styles.pubTitle} style={{ marginTop: "2rem", marginBottom: "1rem" }}>Research Interests</h3>
            <ul className={styles.interestsList}>
              {profile.interests.map((interest, index) => (
                <li key={index} className={styles.interestItem}>{interest}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.pubTitle} style={{ marginBottom: "1rem" }}>Education</h3>
            <div className={styles.timeline}>
              {profile.education.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{item.degree}</h4>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Core Technologies Marquee */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)", backgroundColor: "rgba(10, 10, 15, 0.4)" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 className={styles.title} style={{ fontSize: "2rem" }}>Core Technologies</h2>
        </div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Double the list for seamless looping */}
            {["Next.js", "React", "TypeScript", "Python", "C++", "TensorFlow Lite", "Lingua Franca", "Edge AI", "Digital Twins", "Cyber-Physical Systems", "Next.js", "React", "TypeScript", "Python", "C++", "TensorFlow Lite", "Lingua Franca", "Edge AI", "Digital Twins", "Cyber-Physical Systems"
            ].map((tech, idx) => (
              <div key={idx} className={styles.marqueeItem}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <SectionLayout
        id="featured-project"
        title="Featured Project"
        subtitle="A deep dive into opportunistic distributed intelligence."
      >
        <Link href="/projects/lf-opportunistic-dt" className={styles.featuredCard}>
          <div className={styles.featuredBadge}>Highlighted</div>

          <div className={styles.featuredImageBackground}>
            <Image
              src={withBasePath("/placeholder.webp")}
              alt="Opportunistic Digital Twins with Lingua Franca"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className={styles.featuredOverlay} />
          </div>

          <div className={styles.featuredContent}>
            <p className={styles.pubAuthors} style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>Digital Twin • Lingua Franca • C++</p>
            <h3 className={styles.title} style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "#fff" }}>
              Opportunistic Digital Twins with Lingua Franca
            </h3>
            <p className={styles.bio} style={{ marginBottom: "2rem", maxWidth: "80%", color: "rgba(255,255,255,0.8)" }}>
              Engineering approaches for building dependable and autonomous Opportunistic Digital Twins exploiting the deterministic concurrency and explicit timing semantics of the Lingua Franca coordination language.
            </p>
            <div className={styles.sectionLink} style={{ margin: 0, color: "#fff" }}>
              View Case Study <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </SectionLayout>

      {/* Recent Publications Section */}
      <SectionLayout
        id="recent-publications"
        title="Recent Publications"
        subtitle="My latest research on Edge AI and Digital Twins."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {recentPublications.map((pub) => (
            <Link href={`/publications/${pub.id}`} key={pub.id} className={styles.previewCard}>
              <div className={styles.previewImageWrapper}>
                <Image
                  src={withBasePath(pub.image || "/placeholder.webp")}
                  alt={pub.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.previewContent}>
                <h3 className={styles.previewTitle}>{pub.title}</h3>

                <div className={styles.previewMeta}>
                  <span style={{ color: "var(--foreground)" }}>
                    {pub.type}
                  </span>
                  <span>•</span>
                  <span>{pub.venue}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                </div>

                <p className={styles.previewDesc}>
                  {pub.abstract}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto", paddingTop: "1rem" }}>
                  {pub.tags.map(tag => (
                    <span key={tag} className={styles.interestItem} style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", margin: 0 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
          <Link href="/publications" className={styles.sectionLink}>
            See all publications <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>

      {/* Recent Talks Section */}
      <SectionLayout
        id="recent-talks"
        title="Recent Talks & News"
        subtitle="Latest presentations and workshops."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {talks.slice(0, 2).map((talk) => (
            <Link href={`/talks/${talk.id}`} key={talk.id} className={styles.previewCard}>
              <div className={styles.previewImageWrapper}>
                <Image
                  src={withBasePath(talk.image || "/placeholder.webp")}
                  alt={talk.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.previewContent}>
                <h3 className={styles.previewTitle}>{talk.title}</h3>

                <div className={styles.previewMeta}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <MapPin size={16} /> {talk.event}
                  </span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Calendar size={16} /> {talk.date}
                  </span>
                </div>

                <p className={styles.previewDesc}>
                  {talk.description}
                </p>
              </div>
            </Link>
          ))}
          <Link href="/talks" className={styles.sectionLink}>
            See all talks <ArrowRight size={18} />
          </Link>
        </div>
      </SectionLayout>
    </>
  );
}
