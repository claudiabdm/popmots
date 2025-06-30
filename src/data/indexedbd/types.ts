export type Command = { action: 'init' } | { action: 'getWordEntries' | 'getKeys', value: string }

export interface IndexedDBWorker extends Omit<Worker, 'postMessage'> {
    postMessage(command: Command): void;
}
