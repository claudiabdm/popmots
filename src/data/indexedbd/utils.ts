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