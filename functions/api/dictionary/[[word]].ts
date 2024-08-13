import { dictionary } from "most-common-words-fr-dict-generator";
export function onRequest(context) {
    if (context.params.word?.length === 1) {
        const word = context.params.word[0];
        const wordEntries = dictionary.get(word) ?? [];
        return new Response(JSON.stringify(wordEntries))
    }
    return new Response('Not found', { status: 404 })
}