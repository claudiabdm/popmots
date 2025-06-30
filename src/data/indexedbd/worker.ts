import type { WordEntries } from '@/types';
import { getObjectStore, promisifyRequest } from './utils'
import type { Command } from './types';

let db: IDBDatabase | undefined = undefined

self.addEventListener('message', async (e: MessageEvent<Command>) => {
	switch (e.data.action) {
		case 'init':
			await init()
			postMessage('init')
			break
		case 'getWordEntries': {
			const wordEntries = await getWordEntries(e.data.value)
			postMessage(wordEntries)
			break
		}
		case 'getKeys': {
			const keys = await getKeys()
			postMessage(keys)
			break
		}
	}
})

async function init() {
	db = await openDictionaryDB()

	const count = await promisifyRequest(db.transaction('dictionary', 'readwrite').objectStore('dictionary').count())

	if (count > 0) {
		return db
	}

	await addWordsFromJson(db)

	return db
}


function openDictionaryDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = self.indexedDB.open('popmots', 1)

		request.addEventListener('upgradeneeded', () => {
			const db = request.result
			const hasDictionaryOS = db.objectStoreNames.contains('dictionary')

			if (hasDictionaryOS) {
				return
			}

			const objectStore = db.createObjectStore('dictionary', { autoIncrement: true })

			objectStore.createIndex('word', 'word', { unique: false });
		}, { once: true })

		request.addEventListener('success', () => {
			resolve(request.result)
		}, { once: true })

		request.addEventListener('error', (e) => {
			reject(e.target)
		}, { once: true })
	})
}

async function addWordsFromJson(db: IDBDatabase) {
	const dictJson = await fetch('/10000-most-common-words-en-fr-dict.json').then(res => res.json())

	return new Promise((resolve, reject) => {
		const transaction = db.transaction('dictionary', 'readwrite')

		const objectStore = transaction.objectStore('dictionary')

		const entries: WordEntries = []

		for (const word in dictJson) {
			for (const entry of dictJson[word]) {
				entries.push(entry)
				objectStore.add(entry)
			}
		}

		transaction.addEventListener('complete', () => {
			resolve(entries)
		}, { once: true })

		transaction.addEventListener('error', () => {
			reject()
		}, { once: true })
	})
}

async function getWordEntries(word: string) {
	if (!db) {
		db = await openDictionaryDB()
	}

	const objectStore = getObjectStore(db, 'dictionary')

	const index = objectStore.index('word')

	const getRequest = index.getAll(word)

	const result = await promisifyRequest<WordEntries>(getRequest)

	return result
}

async function getKeys() {
	if (!db) {
		db = await openDictionaryDB()
	}

	const objectStore = getObjectStore(db, 'dictionary')

	const index = objectStore.index('word')

	const getRequest = index.getAll()

	const result = await promisifyRequest(getRequest)

	const keys = []

	for (const entry of result) {
		keys.push(entry.word)
	}

	return keys
}


