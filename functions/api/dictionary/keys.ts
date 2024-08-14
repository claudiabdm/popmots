import type { DictionaryWord } from "most-common-words-fr-dict-generator/types";
export async function onRequestGet({ env }) {
    const keys = await env.DB.prepare("SELECT DISTINCT word FROM Dictionary").all();
    return new Response(JSON.stringify(keys.results.map((key: DictionaryWord) => String(key.word))));
}
