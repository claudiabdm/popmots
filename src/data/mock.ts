export const localCardsMock = [
    { entries: [], name: "être", schedule: { cid: "être", due: new Date(1723882598456), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "je", schedule: { cid: "je", due: new Date(1723882598456 + 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "de", schedule: { cid: "de", due: new Date(1723882598456 + 1 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "ne", schedule: { cid: "ne", due: new Date(1723882598456 + 2 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "avoir", schedule: { cid: "avoir", due: new Date(1723882598456 + 3 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "pas", schedule: { cid: "pas", due: new Date(1723882198456 + 4 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "la", schedule: { cid: "la", due: new Date(1723882598456 + 5 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "tu", schedule: { cid: "tu", due: new Date(1723882598456 + 6 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "le", schedule: { cid: "le", due: new Date(1723882598456 + 6 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "vous", schedule: { cid: "vous", due: new Date(1723882598456 + 6 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } },
    { entries: [], name: "il", schedule: { cid: "il", due: new Date(1723882598456 + 6 * 3000), "state": 0, "stability": 0, "difficulty": 0, "reps": 0, "lapses": 0, "elapsedDays": 0, "scheduledDays": 0 } }
]

export function mockDate() {
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    Date = class extends Date {
        // @ts-ignore
        constructor(options) {
            if (options) {
                super(options);
            } else {
                super(1723882598456);
            }
        }
    };

}