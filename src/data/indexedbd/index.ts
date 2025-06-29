import type { WordEntries } from '@/types'
import { getObjectStore, promisifyRequest } from './utils'
import { cloudflareApi } from '../cloudflare-api'

export const localDB = {
    init,
    getWordEntries
}

let db: IDBDatabase | undefined = undefined

async function init() {
    db = await openDictionaryDB()
    return db
}

function openDictionaryDB(): Promise<IDBDatabase> {
    if (db) {
        return Promise.resolve(db)
    }

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('popmots', 1)

        request.addEventListener('upgradeneeded', async () => {
            if (request.result.objectStoreNames.contains('dictionary')) {
                resolve(request.result)
                return
            }

            const objectStore = request.result.createObjectStore('dictionary', { autoIncrement: true })

            objectStore.createIndex("word", "word", { unique: false });

            const words = await cloudflareApi.getAllWordEntries()

            await addWords(words)

            resolve(request.result)
        }, { once: true })

        request.addEventListener('success', () => {
            resolve(request.result)
        }, { once: true })

        request.addEventListener('error', (e) => {
            reject(e.target)
        }, { once: true })
    })
}

async function addWords(words: WordEntries) {
    if (!db) {
        db = await openDictionaryDB()
    }

    const objectStore = getObjectStore(db, 'dictionary')

    const promises = words.map((w) => promisifyRequest(objectStore.add(w)))

    return Promise.all(promises)
}

async function getWordEntries(word: string): Promise<Promise<WordEntries> | undefined> {
    if (!db) {
        db = await openDictionaryDB()
    }

    const objectStore = getObjectStore(db, 'dictionary')

    const index = objectStore.index("word");

    const getRequest = index.getAll(word)

    const result = await promisifyRequest(getRequest)

    return result
}
