import type { WordEntries } from "@/types";

const API_URL = import.meta.env.DEV === true ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
export async function getKeys() {
    try {
        const keys: string[] = await fetch(`${API_URL}/keys`).then(res => res.json());
        return keys;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export async function getWordEntries(word: string) {
    try {
        const entries: WordEntries = await fetch(`${API_URL}/${word}`).then(res => res.json());
        return entries;
    } catch (error) {
        console.log(error);
        return [];
    }
}