import { writeFile } from 'fs';
import type { PluginOption } from 'vite';

interface Options {
    baseUrl: string
    paths: string[]
}

export function buildSitemap({ baseUrl, paths }: Options): PluginOption {
    return {
        name: 'build-sitemap',
        apply: 'build',
        buildStart() {
            console.log('Generating sitemap...')
            const urls = paths.map((p) => `
                <url>
                    <loc>${baseUrl}${p}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                </url>
            `).join('')

            const sitemap = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${urls}
                </urlset>
            `.trim()

            writeFile('./public/sitemap.xml', sitemap, consoleError)
        },
    };
}



function consoleError(err: any) {
    if (err) {
        console.error({ err });
    }
    return;
}