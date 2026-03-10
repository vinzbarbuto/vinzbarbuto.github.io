export const dynamic = 'force-static';
import { MetadataRoute } from 'next';
import { publications } from "@/data/publications";
import { talks } from "@/data/talks";
import { projects } from "@/data/projects";

const URL = 'https://vincenzobarbuto.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const pubRoutes = publications.map((pub) => ({
        url: `${URL}/publications/${pub.id}`,
        lastModified: new Date().toISOString(),
    }));

    const talkRoutes = talks.map((talk) => ({
        url: `${URL}/talks/${talk.id}`,
        lastModified: new Date().toISOString(),
    }));

    const projectRoutes = projects.map((proj) => ({
        url: `${URL}/projects/${proj.id}`,
        lastModified: new Date().toISOString(),
    }));

    const routes = [
        '',
        '/experience',
        '/publications',
        '/projects',
        '/talks',
        '/teaching',
        '/contact',
    ].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
    }));

    return [...routes, ...pubRoutes, ...talkRoutes, ...projectRoutes];
}
