export const dynamic = 'force-static';
import { MetadataRoute } from 'next';
import { publications } from "@/data/publications";
import { talks } from "@/data/talks";
import { projects } from "@/data/projects";

const URL = 'https://vincenzobarbuto.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date().toISOString();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${URL}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
        { url: `${URL}/publications`, lastModified, changeFrequency: "monthly", priority: 0.9 },
        { url: `${URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
        { url: `${URL}/talks`, lastModified, changeFrequency: "monthly", priority: 0.8 },
        { url: `${URL}/experience`, lastModified, changeFrequency: "yearly", priority: 0.7 },
        { url: `${URL}/teaching`, lastModified, changeFrequency: "yearly", priority: 0.6 },
        { url: `${URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    ];

    const pubRoutes: MetadataRoute.Sitemap = publications.map((pub) => ({
        url: `${URL}/publications/${pub.id}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.7,
    }));

    const talkRoutes: MetadataRoute.Sitemap = talks.map((talk) => ({
        url: `${URL}/talks/${talk.id}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.5,
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((proj) => ({
        url: `${URL}/projects/${proj.id}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...pubRoutes, ...talkRoutes, ...projectRoutes];
}
