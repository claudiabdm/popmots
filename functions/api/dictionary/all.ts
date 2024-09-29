import { WordEntries } from "../../../src/types";
import { formatEntry, replacer } from "../../_utils";

export async function onRequestGet({ env }) {
    const wordEntries = await env.DB.prepare(`SELECT * FROM Dictionary`).all();
    const wordEntriesFormatted: WordEntries[] = wordEntries.results.map(formatEntry);
    return new Response(JSON.stringify(wordEntriesFormatted, replacer))
}