/** Turn a display name into a stable, URL-safe id ("Padded Armor" -> "padded-armor"). */
export function slugify(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Slugify `name`, appending -2, -3, ... on collision against `taken`. Adds the result to `taken`. */
export function uniqueSlug(name: string, taken: Set<string>): string {
    const base = slugify(name) || 'item';
    let candidate = base;
    let n = 2;
    while (taken.has(candidate)) {
        candidate = `${base}-${n}`;
        n += 1;
    }
    taken.add(candidate);
    return candidate;
}
