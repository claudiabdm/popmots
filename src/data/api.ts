import type { WordEntries } from "@/types";
import { localDB } from "./indexedbd.ts/indexeddb";
import { cloudflareApi } from "./cloudflare-api";

const API_URL = './api/dictionary';

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


export async function geAllWordEntries() {
    try {
        const entries: WordEntries = await fetch(`${API_URL}/all`).then(res => res.json());
        return entries;
    } catch (error) {
        console.log(error);
        return [];
    }
}