export type Command = { action: 'init' | 'getKeys' } | { action: 'getWordEntries'; value: string }

export interface IndexedDBWorker extends Omit<Worker, 'postMessage'> {
    postMessage(command: Command): void
}
