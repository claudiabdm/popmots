import { indexedDBWorker } from "./indexedbd";
import type { WordEntries } from "@/types";
import { messageWorker } from "./indexedbd/utils";

const API_URL = './api/dictionary';

export const api = {
    getKeys,
    getWordEntries,
}

async function getKeys() {
    try {
        const keys: string[] = await messageWorker<string[]>(indexedDBWorker, { action: 'getKeys' })
        return keys
    } catch (error) {
        try {
            const keys: string[] = await fetch(`${API_URL}/keys`).then(res => res.json())
            return keys
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

async function getWordEntries(word: string) {
    try {
        const entries = await messageWorker<WordEntries>(indexedDBWorker, { action: 'getWordEntries', value: word })
        return entries
    } catch (error) {
        console.error(error)
        return []
    }
}