import type { WordEntries } from '../../../src/types';
import { formatEntry, replacer } from '../../_utils';

export async function onRequestGet({ params, env }) {
    const word = decodeURI(params.word);
    if (word) {
        const wordEntries = await env.DB.prepare(`SELECT * FROM Dictionary WHERE word = "${word}";`).all();
        if (wordEntries) {
            const wordEntriesFormatted: WordEntries[] = wordEntries.results.map(formatEntry);
            return new Response(JSON.stringify(wordEntriesFormatted, replacer))
        }
    }
    return new Response(`"${word}" word not found in dictionary`, { status: 404 });
}