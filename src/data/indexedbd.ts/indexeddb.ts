import type { WordEntries } from '@/types'
import { geAllWordEntries } from '../api'
import { getObjectStore, promisifyRequest } from './utils'

let db: IDBDatabase | undefined = undefined

export const localDB = {
    init,
    getWordEntries,
    getKeys
}

export async function init() {
    if (db === undefined) {
        db = await openDictionaryDB()
    }

    const shouldDownloadDictionary = await hasWords()

    if (shouldDownloadDictionary === false) {
        const dictionary = await geAllWordEntries()
        addWords(dictionary)
    }

    return db
}

export function openDictionaryDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('popmots', 1)

        request.addEventListener('success', () => {
            resolve(request.result)
        }, { once: true })

        request.addEventListener('upgradeneeded', () => {
            if (!request.result.objectStoreNames.contains('dictionary')) {
                const objectStore = request.result.createObjectStore('dictionary', { autoIncrement: true })
                objectStore.createIndex("word", "word", { unique: false });
            }
            resolve(request.result)
        }, { once: true })

        request.addEventListener('error', (e) => {
            console.error(e)
            reject(e.target)
        }, { once: true })
    })
}

export function addWords(words: WordEntries) {
    if (!db) {
        return
    }

    const objectStore = getObjectStore(db, 'dictionary')

    const promises = words.map((w) => promisifyRequest(objectStore.add(w)))

    return Promise.all(promises)
}

export async function hasWords() {
    if (!db) {
        return
    }

    const objectStore = getObjectStore(db, 'dictionary')

    const countRequest = objectStore.count()

    const result = await promisifyRequest(countRequest)

    return result > 0
}

export async function getWordEntries(word: string): Promise<Promise<WordEntries> | undefined> {
    if (!db) {
        return
    }

    const objectStore = getObjectStore(db, 'dictionary')

    const index = objectStore.index("word");

    const getRequest = index.getAll(word)

    const result = await promisifyRequest(getRequest)

    return result
}

export function getKeys() {
    // JSON.stringify(keys.results.map((key: DictionaryWord) => String(key.word)))
    return db?.transaction('dictionary', 'readonly').objectStore('dictionary').getAllKeys()
}
