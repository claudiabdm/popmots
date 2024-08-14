import type { Dictionary, DictionaryWord } from "most-common-words-fr-dict-generator/types";

export async function onRequestGet({ params, env }) {
    const word = decodeURI(params.word?.split('/')[2]);
    if (word) {
        const obj = await env.DICTIONARY?.get('10000-most-common-words-en-fr-dict.json');
        const dictionaryJson = await obj?.json();
        if (dictionaryJson) {
            const entries = Object.entries(dictionaryJson) as unknown as Array<[string, Array<DictionaryWord>]>;
            const dictionary: Dictionary = entries.reduce((acc, curr) => {
                acc.set(curr[0], curr[1]);
                return acc;
            }, new Map() as Dictionary);
            if (word === 'keys') {
                const keys = [...dictionary.keys()];
                return new Response(JSON.stringify(keys))
            } else {
                const wordEntries = dictionary.get(word);
                if (wordEntries) {
                    return new Response(JSON.stringify(wordEntries))
                }
            }
        }
    }
    return new Response(`"${word}" word not found in dictionary`, { status: 404 });
};