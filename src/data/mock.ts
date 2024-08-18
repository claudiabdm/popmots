import data from './data.popmots.json';

export const localCardsMock = data.userCards.map((c) => ({ ...c, schedule: { ...c.schedule, due: new Date(c.schedule.due) } }));
console.log(localCardsMock);
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