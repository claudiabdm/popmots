import type { Command } from "./types";

export function getObjectStore(db: IDBDatabase, name: string) {
    const transaction = db.transaction(name, 'readwrite')
    const objectStore = transaction.objectStore(name)
    return objectStore
}

export function promisifyRequest<T>(request: IDBRequest<T>) {
    return new Promise<T>((resolve, reject) => {
        request.addEventListener('success', () => {
            resolve(request.result);
        }, { once: true });

        request.addEventListener('error', () => {
            reject(request.error);
        }, { once: true });
    });
}

export function messageWorker<T>(worker: Worker, command: Command) {

    worker.postMessage(command);

    return new Promise<T>((resolve, reject) => {
        worker.addEventListener('message', (e: MessageEvent<T>) => {
            resolve(e.data);
        }, { once: true });

        worker.addEventListener('error', (e) => {
            reject(e.error);
        }, { once: true });
    });
}