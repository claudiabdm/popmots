import { localDB } from "./indexedbd";
import { cloudflareApi } from "./cloudflare-api";

const API_URL = './api/dictionary';

export const api = {
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