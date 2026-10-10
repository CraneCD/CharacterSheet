/**
 * Links to pages for one character, campaign or encounter. Ids travel in the query string
 * (not the path) so the app can be built as static files for the Android app, where pages
 * can't be generated per id. Old path-style links are redirected in next.config.js.
 */
import { useSearchParams } from 'next/navigation';

function query(params: Record<string, string>): string {
    return new URLSearchParams(params).toString();
}

export function characterHref(id: string): string {
    return `/character?${query({ id })}`;
}

export function campaignHref(id: string, tab?: string): string {
    return `/campaigns/view?${query({ id })}${tab ? `#${tab}` : ''}`;
}

export function encounterHref(campaignId: string, encounterId: string): string {
    return `/campaigns/encounter?${query({ campaign: campaignId, id: encounterId })}`;
}

export function adminTypeHref(type: string): string {
    return `/admin/type?${query({ type })}`;
}

export function adminNewHref(type: string): string {
    return `/admin/type/new?${query({ type })}`;
}

export function adminEditHref(type: string, key: string): string {
    return `/admin/type/edit?${query({ type, key })}`;
}

/** A query-string value of the current page ('' when missing). Pages using it render inside <Suspense>. */
export function useQueryParam(name: string): string {
    return useSearchParams()?.get(name) ?? '';
}
