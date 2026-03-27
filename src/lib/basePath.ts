/**
 * Centralized basePath utility for GitHub Pages deployment.
 *
 * When deployed to GitHub Pages under a repository subpath
 * (e.g. https://user.github.io/repo-name/), Next.js needs to know
 * the basePath prefix so that all assets resolve correctly.
 *
 * In development (npm run dev), BASE_PATH is "", so paths are unchanged.
 * In production (npm run build), BASE_PATH is the repository subpath.
 */
export const BASE_PATH = "";

/**
 * Prepend the basePath to any internal public asset path.
 * - Absolute paths starting with "/" get the prefix.
 * - External URLs (http/https) are returned unchanged.
 * - Relative paths are returned unchanged.
 */
export function withBasePath(path: string): string {
    if (!path || !path.startsWith("/")) return path;
    return `${BASE_PATH}${path}`;
}
