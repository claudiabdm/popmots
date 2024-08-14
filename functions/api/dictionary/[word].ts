import type { WordEntries } from '../../../src/types';

export async function onRequestGet({ params, env }) {
    const word = decodeURI(params.word);
    if (word) {
        const wordEntries = await env.DB.prepare(`SELECT * FROM Dictionary WHERE word = "${word}";`).all();
        if (wordEntries) {
            const wordEntriesFormatted: WordEntries[] = wordEntries.results.map(entry => {
                return ({
                    ...entry,
                    senses: entry.senses === 'undefined' || entry.senses == null ? [] : JSON.parse(entry.senses),
                    head: entry.head === 'undefined' || entry.head == null ? [] : JSON.parse(entry.head)
                })
            });
            return new Response(JSON.stringify(wordEntriesFormatted, replacer))
        }
    }
    return new Response(`"${word}" word not found in dictionary`, { status: 404 });
}

function replacer(_, value) {
    if (typeof value === "string") {
        return value.replace(/''/g, "'");
    }
    return value;
}