import type { WordEntries } from "@/types";

const API_URL = './api/dictionary';

export const cloudflareApi = {
    getKeys,
    getWordEntries,
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
        const entries: WordEntries = await fetch(`${API_URL}/${word}`).then(res => res.json());
        return entries;
    } catch (error) {
        console.error(error);
        return [];
    }
}