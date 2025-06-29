import { localDB } from "./indexedbd";
import { cloudflareApi } from "./cloudflare-api";
import type { DictionaryWord } from "most-common-words-kaikki-dict-generator/types";

const API_URL = './api/dictionary';

export const api = {
    getKeys,
    getWordEntries,
    getDictionaryJson
}

async function getKeys() {
    try {
        const keys: string[] = await fetch(`${API_URL}/keys`).then(res => res.json());
        return keys;
    } catch (error) {
        console.error(error);
        return [];
    }
}
async function getWordEntries(word: string) {
    try {
        const entries = await localDB.getWordEntries(word);
        if (!entries) {
            return []
        }
        return entries;
    } catch (error) {
        const entries = await cloudflareApi.getWordEntries(word)
        return entries;
    }
}
async function getDictionaryJson() {
    try {
        const json = await fetch('/10000-most-common-words-en-fr-dict.json').then(res => res.json());
        const jsonEntries = Object.entries(json) as unknown as Array<[string, Array<DictionaryWord>]>;
        const entries = []
        for (const [, wordEntries] of jsonEntries) {
            for (const entry of wordEntries) {
                entries.push(entry)
            }
        }
        return entries;
    } catch (error) {
        console.error(error);
        return [];
    }
}