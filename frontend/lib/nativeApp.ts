/**
 * The Android app (Capacitor): the same pages, bundled as static files (`npm run build:app`).
 * Native plugins are loaded only inside the app, so the website never downloads them.
 */

/** True inside the Android app, not in a browser (the installed web app included). */
export function isNativeApp(): boolean {
    if (typeof window === 'undefined') return false;
    const native = (window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
    return native?.isNativePlatform?.() === true;
}

/**
 * Runs in <head> of every page of the app build, before React. The app's web server answers
 * every path without a file extension with the start page (index.html), so a full page load of
 * "/character?id=…" (start-up, a sign-out redirect) is sent on to "/character.html?id=…", and
 * that page puts the clean address back before Next.js reads it.
 */
export const APP_ROUTING_SCRIPT = `(function(){var l=location,p=l.pathname,r=l.search+l.hash;
if(/\\.html$/.test(p)){history.replaceState(history.state,'',(p==='/index.html'?'/':p.slice(0,-5))+r);return}
if(p==='/'||p===''){l.replace('/dashboard.html');return}
l.replace(p.replace(/\\/+$/,'')+'.html'+r)})()`;

/** Close the open dialog (as Escape does), else go back a page, else leave the app. */
export async function handleBackButton(canGoBack: boolean): Promise<void> {
    if (document.querySelector('[aria-modal="true"]')) {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        return;
    }
    if (canGoBack) {
        window.history.back();
        return;
    }
    const { App } = await import('@capacitor/app');
    await App.minimizeApp();
}

/** Listen for Android's back button. Returns a function that stops listening. */
export function listenForBackButton(): () => void {
    if (!isNativeApp()) return () => undefined;
    let remove: (() => void) | null = null;
    let stopped = false;
    void import('@capacitor/app').then(async ({ App }) => {
        const handle = await App.addListener('backButton', ({ canGoBack }) => void handleBackButton(canGoBack));
        if (stopped) handle.remove();
        else remove = () => void handle.remove();
    });
    return () => {
        stopped = true;
        remove?.();
    };
}

/**
 * Save a JSON file: a download in the browser, the share sheet in the app (where downloads
 * do nothing), so it can go to Drive, a chat or Files.
 */
export async function saveJsonFile(fileName: string, data: unknown): Promise<void> {
    const json = JSON.stringify(data, null, 2);
    if (isNativeApp()) {
        const [{ Filesystem, Directory, Encoding }, { Share }] = await Promise.all([import('@capacitor/filesystem'), import('@capacitor/share')]);
        const { uri } = await Filesystem.writeFile({ path: fileName, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
        try {
            await Share.share({ title: fileName, files: [uri] });
        } catch (err) {
            // Closing the share sheet without picking anything isn't an error
            if (!/cancel/i.test(err instanceof Error ? err.message : String(err))) throw err;
        }
        return;
    }
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
