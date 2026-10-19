/** @jest-environment node */
// The matcher Next uses for redirect sources (untyped, so required)
const { pathToRegexp } = require('next/dist/compiled/path-to-regexp') as {
    pathToRegexp: (source: string, keys: unknown[], options: object) => RegExp
}
const nextConfig = require('../next.config.js')

async function matchingRedirect(path: string) {
    const redirects: { source: string; destination: string }[] = await nextConfig.redirects()
    return redirects.find(({ source }) => pathToRegexp(source, [], { strict: true, delimiter: '/' }).test(path))
}

describe('old path-style redirects', () => {
    it.each(['/character', '/campaigns/view', '/campaigns/encounter', '/admin/type', '/admin/type/new', '/admin/type/edit'])(
        'leave the current page %s alone',
        async (path) => {
            expect(await matchingRedirect(path)).toBeUndefined()
        },
    )

    it.each([
        ['/character/abc', '/character?id=:id'],
        ['/campaigns/abc', '/campaigns/view?id=:id'],
        ['/campaigns/abc/encounters/def', '/campaigns/encounter?campaign=:campaign&id=:id'],
        ['/admin/spells', '/admin/type?type=:type'],
        ['/admin/spells/new', '/admin/type/new?type=:type'],
        ['/admin/spells/fireball', '/admin/type/edit?type=:type&key=:key'],
        ['/admin/typeface/x', '/admin/type/edit?type=:type&key=:key'],
    ])('redirect %s', async (path, destination) => {
        expect((await matchingRedirect(path))?.destination).toBe(destination)
    })
})
