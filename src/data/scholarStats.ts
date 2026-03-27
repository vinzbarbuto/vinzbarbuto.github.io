export interface ScholarStats {
    citations:  number | null;
    hindex:     number | null;
    i10index:   number | null;
    updated_at: string | null;   // ISO 8601 UTC string, e.g. "2025-03-10T06:00:00Z"
}

/** Fallback used when the JSON file is unavailable or the workflow hasn't run yet. */
export const EMPTY_SCHOLAR_STATS: ScholarStats = {
    citations:  null,
    hindex:     null,
    i10index:   null,
    updated_at: null,
};
