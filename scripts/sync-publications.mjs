#!/usr/bin/env node
// Rebuilds src/data/publications.generated.json from OpenAlex.
//
//   node scripts/sync-publications.mjs [--dry-run] [--force] [--summary <file>]
//
// OpenAlex finds the works and supplies abstract, dates, links and keywords;
// doi.org (Crossref/DataCite CSL-JSON) supplies structured author names, the
// venue as registered by the publisher, pages and publisher for the BibTeX.
// Hand-curated data lives in src/data/publications.curated.ts and is never
// read or written here.
//
// OPENALEX_API_KEY is optional locally (keyless calls share a small per-IP
// budget) and effectively required in CI. Free key: https://openalex.org/settings/api

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** OpenAlex author profiles to pull works from. Add IDs here if OpenAlex ever splits the profile. */
const AUTHOR_IDS = ["A5050403488"];

const OUTPUT = fileURLToPath(new URL("../src/data/publications.generated.json", import.meta.url));
const USER_AGENT = "publications-sync/1.0 (static site build script)";

/** OpenAlex work types that are not publications. */
const EXCLUDED_TYPES = new Set([
    "dataset", "paratext", "erratum", "retraction", "peer-review",
    "supplementary-materials", "grant", "libguides", "standard",
]);

/** Crossref / CSL / OpenAlex type names -> label shown on the site. */
const TYPE_LABELS = {
    "journal-article": "Journal Article",
    "article-journal": "Journal Article",
    "review": "Journal Article",
    "proceedings-article": "Conference Paper",
    "paper-conference": "Conference Paper",
    "conference-paper": "Conference Paper",
    "book-chapter": "Book Chapter",
    "chapter": "Book Chapter",
    "book": "Book",
    "monograph": "Book",
    "posted-content": "Preprint",
    "preprint": "Preprint",
    "dissertation": "Thesis",
    "thesis": "Thesis",
    "report": "Technical Report",
};

const BIBTEX_ENTRY = {
    "Journal Article": "article",
    "Conference Paper": "inproceedings",
    "Book Chapter": "incollection",
    "Book": "book",
    "Thesis": "phdthesis",
    "Technical Report": "techreport",
};

const KEY_STOPWORDS = new Set(["a", "an", "the", "on", "in", "of", "for", "and", "to", "with", "from", "at", "by"]);
const LOWERCASE_WORDS = new Set(["a", "an", "the", "and", "or", "of", "in", "on", "for", "to", "with", "at", "by"]);
const MAX_TAGS = 4;

// ---------------------------------------------------------------- utilities

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const titleKey = (value) => (value ?? "").normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "");

const first = (value) => (Array.isArray(value) ? value[0] : value);

function cleanText(value) {
    if (!value) return "";
    return String(value)
        .replace(/<[^>]+>/g, "")
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
        .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

async function getJson(url, headers = {}) {
    const attempts = 3;
    for (let attempt = 1; ; attempt++) {
        let retryable = true;
        try {
            const response = await fetch(url, {
                headers: { "User-Agent": USER_AGENT, ...headers },
                signal: AbortSignal.timeout(30_000),
            });
            if (response.ok) return await response.json();
            retryable = response.status === 429 || response.status >= 500;
            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            if (!retryable || attempt === attempts) throw new Error(`${url} -> ${error.message}`);
            await sleep(attempt * 2000);
        }
    }
}

// ------------------------------------------------------------------ sources

async function fetchOpenAlexWorks() {
    const apiKey = process.env.OPENALEX_API_KEY;
    const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
    if (!apiKey) console.warn("OPENALEX_API_KEY not set: using the shared keyless budget.");

    const works = [];
    for (let page = 1; ; page++) {
        const url = "https://api.openalex.org/works" +
            `?filter=authorships.author.id:${AUTHOR_IDS.join("|")}&per_page=100&page=${page}`;
        let body;
        try {
            body = await getJson(url, headers);
        } catch (error) {
            const hint = /HTTP 429/.test(error.message)
                ? " (OpenAlex budget exhausted: set OPENALEX_API_KEY)"
                : /HTTP 40[13]/.test(error.message) ? " (OPENALEX_API_KEY rejected or not activated)" : "";
            throw new Error(`OpenAlex request failed: ${error.message}${hint}`);
        }
        works.push(...body.results);
        if (body.results.length === 0 || works.length >= body.meta.count) return works;
    }
}

/** Publisher-registered metadata for a DOI, or null when doi.org cannot provide it. */
async function fetchCsl(doi) {
    try {
        return await getJson(`https://doi.org/${encodeURIComponent(doi).replace(/%2F/g, "/")}`, {
            Accept: "application/vnd.citationstyles.csl+json",
        });
    } catch (error) {
        console.warn(`doi.org metadata unavailable for ${doi}: ${error.message}`);
        return null;
    }
}

// ------------------------------------------------------------- field mapping

function bareDoi(work) {
    return work.doi ? work.doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "") : undefined;
}

function abstractOf(work, csl) {
    const index = work.abstract_inverted_index;
    if (index) {
        const words = [];
        for (const [word, positions] of Object.entries(index)) {
            for (const position of positions) words[position] = word;
        }
        return cleanText(words.join(" "));
    }
    return cleanText(csl?.abstract);
}

/** [{ given, family }] from the publisher record, falling back to OpenAlex display names. */
function authorsOf(work, csl) {
    const fromCsl = (csl?.author ?? [])
        .map((author) => ({
            given: cleanText(author.given),
            family: cleanText(author.family ?? author.literal ?? author.name),
        }))
        .filter((author) => author.family);
    if (fromCsl.length > 0) return fromCsl;

    return (work.authorships ?? []).map(({ author, raw_author_name: raw }) => {
        const parts = cleanText(author?.display_name ?? raw).split(" ");
        return { given: parts.slice(0, -1).join(" "), family: parts.at(-1) ?? "" };
    });
}

/** "Edward A." + "Lee" -> "EA Lee" (the style already used on the site). */
function shortName({ given, family }) {
    const initials = given.split(/[\s.\-]+/).filter(Boolean).map((part) => part[0].toUpperCase()).join("");
    return initials ? `${initials} ${family}` : family;
}

function typeOf(work, csl) {
    const location = work.primary_location ?? {};
    // The type registered by the publisher is more reliable than OpenAlex's own.
    const registered = TYPE_LABELS[location.raw_type] ?? TYPE_LABELS[csl?.type];
    if (registered) return registered;
    if (location.source?.type === "conference") return "Conference Paper";
    if (work.type === "article") return "Journal Article";
    return TYPE_LABELS[work.type] ?? titleCase((work.type ?? "publication").replace(/-/g, " "));
}

function titleCase(text) {
    return text
        .split(" ")
        .map((word, index) => {
            if (word !== word.toLowerCase()) return word; // keep acronyms and existing capitals
            if (index > 0 && LOWERCASE_WORDS.has(word)) return word;
            return word.replace(/(^|-)([a-z])/g, (_, separator, letter) => separator + letter.toUpperCase());
        })
        .join(" ");
}

function tagsOf(work) {
    return [...(work.keywords ?? [])]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_TAGS)
        .map((keyword) => titleCase(keyword.display_name));
}

function pagesOf(work, csl) {
    if (csl?.page) return String(csl.page).replace(/\s*[-–]+\s*/, "--");
    const { first_page: from, last_page: to } = work.biblio ?? {};
    if (!from) return undefined;
    return to && to !== from ? `${from}--${to}` : from;
}

function citationKey(authors, year, title) {
    const ascii = (text) => text.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "");
    const words = title.normalize("NFKD").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const word = words.find((candidate) => !KEY_STOPWORDS.has(candidate)) ?? words[0] ?? "";
    return `${ascii(authors[0]?.family ?? "anon")}${year}${word}`;
}

function buildBibtex({ key, label, title, authors, venue, volume, issue, pages, year, publisher, doi }) {
    const escape = (text) => text.replace(/([&%#])/g, "\\$1");
    const entry = BIBTEX_ENTRY[label] ?? "misc";
    const container =
        entry === "article" ? ["journal", venue]
        : entry === "inproceedings" || entry === "incollection" ? ["booktitle", venue]
        : entry === "misc" ? ["howpublished", venue]
        : [null, null];
    const publisherField =
        entry === "inproceedings" ? "organization"
        : entry === "phdthesis" ? "school"
        : entry === "techreport" ? "institution"
        : "publisher";

    const fields = [
        ["title", escape(title)],
        ["author", authors.map(({ given, family }) => (given ? `${family}, ${given}` : family)).join(" and ")],
        [container[0], container[1] && escape(container[1])],
        ["volume", volume],
        ["number", issue],
        ["pages", pages],
        ["year", year],
        [publisherField, publisher && escape(publisher)],
        ["doi", doi],
    ].filter(([name, value]) => name && value !== undefined && value !== null && value !== "");

    return `@${entry}{${key},\n${fields.map(([name, value]) => `  ${name}={${value}}`).join(",\n")}\n}`;
}

function toRecord(work, csl, previous) {
    const location = work.primary_location ?? {};
    const doi = bareDoi(work);
    const title = cleanText(first(csl?.title) || work.title || work.display_name);
    const authors = authorsOf(work, csl);
    const label = typeOf(work, csl);
    const venue = cleanText(
        first(csl?.["container-title"]) || location.raw_source_name || location.source?.display_name
    );
    const citedYear = csl?.issued?.["date-parts"]?.[0]?.[0] ?? work.publication_year;
    const key = citationKey(authors, citedYear, title);
    const doiUrl = doi ? `https://doi.org/${csl?.DOI ?? doi}` : undefined;
    const pdf = work.best_oa_location?.pdf_url ?? undefined;

    const links = { url: location.landing_page_url ?? doiUrl, pdf, doi: doiUrl };
    for (const name of Object.keys(links)) if (!links[name]) delete links[name];

    const record = {
        openalexId: work.id.split("/").pop(),
        doi,
        // Sticky: the id is the page URL and tags are only a first suggestion.
        id: previous?.id ?? key,
        title,
        authors: authors.map(shortName).join(", "),
        venue,
        type: label,
        year: work.publication_year,
        date: work.publication_date ?? `${work.publication_year}-01-01`,
        abstract: abstractOf(work, csl),
        links,
        tags: previous?.tags?.length ? previous.tags : tagsOf(work),
        bibtex: buildBibtex({
            key, label, title, authors, venue,
            volume: csl?.volume ?? work.biblio?.volume,
            issue: csl?.issue ?? work.biblio?.issue,
            pages: pagesOf(work, csl),
            year: citedYear,
            publisher: cleanText(csl?.publisher || location.source?.host_organization_name),
            doi: csl?.DOI ?? doi,
        }),
    };
    if (!record.doi) delete record.doi;
    return record;
}

// ------------------------------------------------------------------ pipeline

/** Drops non-publications, then keeps one work per title (published version over preprint). */
function selectWorks(works) {
    const rank = (work) => [
        work.type === "preprint" ? 1 : 0,
        work.doi ? 0 : 1,
        -(work.cited_by_count ?? 0),
    ];
    const isBetter = (candidate, current) => {
        const a = rank(candidate);
        const b = rank(current);
        const index = a.findIndex((value, i) => value !== b[i]);
        return index !== -1 && a[index] < b[index];
    };
    const byTitle = new Map();
    for (const work of works) {
        if (work.is_paratext || work.is_retracted || EXCLUDED_TYPES.has(work.type)) continue;
        const key = titleKey(work.title ?? work.display_name);
        if (!key) continue;
        const current = byTitle.get(key);
        if (!current) {
            byTitle.set(key, work);
            continue;
        }
        const [kept, dropped] = isBetter(work, current) ? [work, current] : [current, work];
        console.warn(`Duplicate title: keeping ${kept.id}, dropping ${dropped.id}`);
        byTitle.set(key, kept);
    }
    return [...byTitle.values()];
}

/** Ids already published keep their value; only newly found works can get a suffix. */
function assignUniqueIds(records, previousById) {
    const isKnown = (record) => previousById.has(record.openalexId);
    const used = new Set(records.filter(isKnown).map((record) => record.id));
    for (const record of records) {
        if (isKnown(record)) continue;
        let id = record.id;
        for (let suffix = 98; used.has(id); suffix++) id = `${record.id}${String.fromCharCode(suffix)}`; // b, c, ...
        record.id = id;
        used.add(id);
    }
}

function changedFields(before, after) {
    const flatten = ({ links, ...rest }) => ({
        ...rest,
        ...Object.fromEntries(["url", "pdf", "doi"].map((name) => [`links.${name}`, links?.[name]])),
    });
    const a = flatten(before);
    const b = flatten(after);
    return [...new Set([...Object.keys(a), ...Object.keys(b)])]
        .filter((name) => JSON.stringify(a[name]) !== JSON.stringify(b[name]));
}

function buildSummary(previous, records, notes) {
    const before = new Map(previous.map((record) => [record.openalexId, record]));
    const after = new Map(records.map((record) => [record.openalexId, record]));
    const line = (record) =>
        `- **${record.title}**: ${record.venue || "venue unknown"} (${record.year}), ` +
        `\`${record.doi ?? record.openalexId}\`, page id \`${record.id}\``;

    const added = records.filter((record) => !before.has(record.openalexId));
    const removed = previous.filter((record) => !after.has(record.openalexId));
    const updated = records
        .filter((record) => before.has(record.openalexId))
        .map((record) => [record, changedFields(before.get(record.openalexId), record)])
        .filter(([, fields]) => fields.length > 0);

    const out = ["Automated sync of `src/data/publications.generated.json` from [OpenAlex](https://openalex.org).", ""];
    if (added.length > 0) {
        out.push(`### New (${added.length})`, "");
        for (const record of added) {
            out.push(line(record));
            if (!record.abstract) out.push("  - no abstract found: add `abstract` in `publications.curated.ts`");
        }
        out.push("");
    }
    if (updated.length > 0) {
        out.push(`### Updated (${updated.length})`, "");
        for (const [record, fields] of updated) out.push(`- **${record.title}**: ${fields.join(", ")}`);
        out.push("");
    }
    if (removed.length > 0) {
        out.push(`### No longer in OpenAlex (${removed.length})`, "");
        for (const record of removed) out.push(line(record));
        out.push("", "A curated entry that relied on one of these now needs its own id, title, authors, venue, type and year.", "");
    }
    if (notes.length > 0) {
        out.push("### Notes", "", ...notes.map((note) => `- ${note}`), "");
    }
    if (added.length + updated.length + removed.length === 0) out.push("No changes.", "");
    if (added.length > 0) {
        out.push(
            "### Before merging",
            "",
            "- New papers appear with the placeholder image and suggested tags. To set `image`, `tags` or anything else, " +
            "add an entry at the top of `src/data/publications.curated.ts` with `links: { doi: \"https://doi.org/...\" }` plus the fields to override.",
            "- The page id is the URL (`/publications/<id>`). To change it, set `id` in the curated entry now rather than after publishing.",
            "- Not your paper, or a duplicate? Add its DOI to `hiddenPublications` in the same file.",
            "",
        );
    }
    return { text: out.join("\n"), changed: added.length + updated.length + removed.length > 0 };
}

async function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes("--dry-run");
    const force = args.includes("--force");
    const summaryPath = args.includes("--summary") ? args[args.indexOf("--summary") + 1] : undefined;

    let previous = [];
    try {
        previous = JSON.parse(await readFile(OUTPUT, "utf8"));
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
    const previousById = new Map(previous.map((record) => [record.openalexId, record]));

    const works = selectWorks(await fetchOpenAlexWorks());
    if (works.length === 0) throw new Error("OpenAlex returned no works: refusing to empty the publication list.");
    if (!force && works.length < previous.length / 2) {
        throw new Error(
            `OpenAlex returned ${works.length} works but ${previous.length} are on file. ` +
            "Re-run with --force if that drop is real."
        );
    }

    const notes = [];
    const records = [];
    for (const work of works) {
        const id = work.id.split("/").pop();
        const old = previousById.get(id);
        const doi = bareDoi(work);
        const csl = doi ? await fetchCsl(doi) : null;
        if (doi && !csl && old) {
            // Keep the last good record rather than flip to OpenAlex-only metadata and back.
            records.push(old);
            notes.push(`\`${doi}\`: doi.org was unreachable, record left as it was.`);
            continue;
        }
        if (doi && !csl) notes.push(`\`${doi}\`: doi.org was unreachable, authors and BibTeX come from OpenAlex only.`);
        records.push(toRecord(work, csl, old));
    }

    records.sort((a, b) => b.date.localeCompare(a.date) || a.openalexId.localeCompare(b.openalexId));
    assignUniqueIds(records, previousById);

    const summary = buildSummary(previous, records, notes);
    console.log(summary.text);
    if (summaryPath) await writeFile(summaryPath, summary.text);

    if (dryRun) return console.log("Dry run: nothing written.");
    if (summary.changed) await writeFile(OUTPUT, `${JSON.stringify(records, null, 2)}\n`);
    console.log(`${records.length} publications, ${summary.changed ? "file updated" : "file already up to date"}.`);
}

main().catch((error) => {
    console.error(`sync-publications: ${error.message}`);
    process.exit(1);
});
