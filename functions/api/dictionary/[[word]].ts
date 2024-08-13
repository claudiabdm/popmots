import type { Dictionary, DictionaryWord } from "most-common-words-fr-dict-generator/types";
export async function onRequest({ params, env }) {
    const word = params.word;

    if (word) {
        const dictionaryJson = await env.DICTIONARY;
        if (dictionaryJson) {
            const entries = Object.entries(dictionaryJson) as unknown as Array<[string, Array<DictionaryWord>]>;
            const dictionary: Dictionary = entries.reduce((acc, curr) => {
                acc.set(curr[0], curr[1]);
                return acc;
            }, new Map() as Dictionary);
            const wordEntries = dictionary.get(word);
            if (wordEntries) {
                return new Response(JSON.stringify(wordEntries))
            }
        }
    }
    return new Response(`Word "${params.word}" not found`, { status: 404 })
}