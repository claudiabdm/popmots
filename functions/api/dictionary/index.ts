import type { Dictionary, DictionaryWord } from "most-common-words-fr-dict-generator/types";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400', // optional 
    'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const key = url.pathname.slice(1);

        if (key.includes('api/dictionary')) {
            if (request.method === 'GET') {

                const word = decodeURI(key.split('/')[2]);
                if (word) {
                    const obj = await env.DICTIONARY.get('10000-most-common-words-en-fr-dict.json');
                    const dictionaryJson = await obj.json();
                    if (dictionaryJson) {
                        const entries = Object.entries(dictionaryJson) as unknown as Array<[string, Array<DictionaryWord>]>;
                        const dictionary: Dictionary = entries.reduce((acc, curr) => {
                            acc.set(curr[0], curr[1]);
                            return acc;
                        }, new Map() as Dictionary);
                        if (word === 'keys') {
                            const keys = [...dictionary.keys()];
                            return new Response(JSON.stringify(keys), {
                                headers: { ...corsHeaders },
                            })
                        } else {
                            const wordEntries = dictionary.get(word);
                            if (wordEntries) {
                                return new Response(JSON.stringify(wordEntries), {
                                    headers: { ...corsHeaders },
                                })
                            }
                        }
                    }
                }
                return new Response(`"${word}" word not found in dictionary`, { status: 404 });
            }
        }

        return new Response('Method Not Allowed', {
            status: 405,
            headers: {
                Allow: 'PUT, GET, DELETE',
            },
        });
    }
};