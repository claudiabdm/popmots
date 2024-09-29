export function formatEntry(entry) {
    return ({
        ...entry,
        senses: entry.senses === 'undefined' || entry.senses == null ? [] : JSON.parse(entry.senses),
        head: entry.head === 'undefined' || entry.head == null ? [] : JSON.parse(entry.head)
    })
}

export function replacer(_, value) {
    if (typeof value === "string") {
        return value.replace(/''/g, "'");
    }
    return value;
}