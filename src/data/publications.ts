import generatedJson from "./publications.generated.json";
import { curatedPublications, hiddenPublications } from "./publications.curated";

export interface Publication {
    id: string;
    title: string;
    authors: string;
    venue: string;
    type: string;
    year: number;
    abstract: string;
    links: {
        url?: string;
        pdf?: string;
        doi?: string;
    };
    image?: string;
    tags: string[];
    bibtex: string;
}

/** A record written by `scripts/sync-publications.mjs`. */
export interface GeneratedPublication extends Omit<Publication, "image"> {
    openalexId: string;
    /** Bare lowercase DOI, e.g. "10.1145/3616014". */
    doi?: string;
    /** ISO publication date, used to order papers that have no curated entry. */
    date: string;
}

/** A hand-written entry: any subset of the fields, see `publications.curated.ts`. */
export type CuratedPublication = Partial<Publication>;

const generated: GeneratedPublication[] = generatedJson;

const doiKey = (value?: string) =>
    value?.trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "");

const titleKey = (value?: string) =>
    value?.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "");

function isSameWork(entry: CuratedPublication, record: GeneratedPublication): boolean {
    const entryDoi = doiKey(entry.links?.doi);
    if (entryDoi && entryDoi === record.doi) return true;
    const entryTitle = titleKey(entry.title);
    return !!entryTitle && entryTitle === titleKey(record.title);
}

function isHidden(record: GeneratedPublication): boolean {
    return hiddenPublications.some((item) => {
        const value = item.trim();
        if (!value) return false;
        return (
            value.toUpperCase() === record.openalexId ||
            doiKey(value) === record.doi ||
            titleKey(value) === titleKey(record.title)
        );
    });
}

const REQUIRED = ["id", "title", "authors", "venue", "type", "year"] as const;

/** Curated fields win; the generated record fills whatever is left. */
function resolve(entry: CuratedPublication, record?: GeneratedPublication): Publication {
    const publication = {
        id: entry.id ?? record?.id,
        title: entry.title ?? record?.title,
        authors: entry.authors ?? record?.authors,
        venue: entry.venue ?? record?.venue,
        type: entry.type ?? record?.type,
        year: entry.year ?? record?.year,
        abstract: entry.abstract ?? record?.abstract ?? "",
        links: { ...record?.links, ...entry.links },
        image: entry.image,
        tags: entry.tags ?? record?.tags ?? [],
        bibtex: entry.bibtex ?? record?.bibtex ?? "",
    };

    const missing = REQUIRED.filter((field) => publication[field] === undefined || publication[field] === "");
    if (missing.length > 0) {
        const label = publication.title ?? publication.id ?? publication.links.doi ?? "(untitled)";
        throw new Error(
            `publications.curated.ts: "${label}" matches no record in publications.generated.json ` +
            `and is missing ${missing.join(", ")}.`
        );
    }
    return publication as Publication;
}

function buildPublications(): Publication[] {
    const records = generated.filter((record) => !isHidden(record));
    const claimed = new Set<GeneratedPublication>();

    const curated = curatedPublications.map((entry) => {
        const record = records.find((candidate) => !claimed.has(candidate) && isSameWork(entry, candidate));
        if (record) claimed.add(record);
        return resolve(entry, record);
    });

    const generatedOnly = records
        .filter((record) => !claimed.has(record))
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((record) => resolve({}, record));

    // Array.prototype.sort is stable, so the order above survives within a year.
    const all = [...generatedOnly, ...curated].sort((a, b) => b.year - a.year);

    const seen = new Set<string>();
    for (const { id } of all) {
        if (seen.has(id)) {
            throw new Error(`Duplicate publication id "${id}": set a distinct id in publications.curated.ts.`);
        }
        seen.add(id);
    }
    return all;
}

export const publications: Publication[] = buildPublications();
