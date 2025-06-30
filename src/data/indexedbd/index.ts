import type { IndexedDBWorker } from './types'
import MyWorker from './worker?worker'

export const indexedDBWorker: IndexedDBWorker = new MyWorker()