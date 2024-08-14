import type { ScheduleCard, FSRSCard, UserCard } from "@/types";
import { createEmptyCard, State } from "ts-fsrs";
import { DAY_IN_MILLISECONDS, DEFAULT_NEW_CARDS_PER_DAY } from "./constants";
import type { LocalStore, Store } from "./types";
import { getKeys } from "./api";

export function massageCard(card: FSRSCard & { cid: string }): ScheduleCard {
    return {
        cid: card.cid,
        state: card.state,
        due: new Date(card.due),
        stability: card.stability,
        difficulty: card.difficulty,
        reps: card.reps,
        lapses: card.lapses,
        elapsedDays: card.elapsed_days,
        scheduledDays: card.scheduled_days,
        lastReview: card.last_review ? new Date(card.last_review) : undefined
    }
}

export function unmassageCard(schedule: ScheduleCard): FSRSCard & { cid: string } {
    return {
        cid: schedule.cid,
        state: schedule.state,
        due: new Date(schedule.due),
        stability: schedule.stability,
        difficulty: schedule.difficulty,
        reps: schedule.reps,
        lapses: schedule.lapses,
        elapsed_days: schedule.elapsedDays,
        scheduled_days: schedule.scheduledDays,
        last_review: schedule.lastReview ? new Date(schedule.lastReview) : undefined
    }
}

export function copyScheduleCard(schedule: ScheduleCard): ScheduleCard {
    return {
        cid: schedule.cid,
        due: new Date(schedule.due),
        state: schedule.state,
        stability: schedule.stability,
        difficulty: schedule.difficulty,
        reps: schedule.reps,
        lapses: schedule.lapses,
        elapsedDays: schedule.elapsedDays,
        scheduledDays: schedule.scheduledDays,
        lastReview: schedule.lastReview ? new Date(schedule.lastReview) : undefined
    }
}

export async function loadLocalStore() {
    const settings = loadLocalSettings();
    const userCards = await loadLocalCards({ newCardsPerDay: settings.newCardsPerDay });
    return { settings, userCards };
}

async function loadLocalCards(settings?: Store['settings']): Promise<Store['userCards']> {
    const localCards = localStorage.getItem('userCards');
    const localCardsParsed: Store['userCards'] | undefined = localCards ? JSON.parse(localCards) : undefined;
    if (localCardsParsed) {
        return localCardsParsed.map(c => ({ ...c, schedule: copyScheduleCard(c.schedule) }));
    } else {
        const allCards = await createAllCards(settings?.newCardsPerDay);
        updateLocalStore(allCards, 'userCards');
        return allCards;
    }
}

function loadLocalSettings(): Store['settings'] {
    const settings = localStorage.getItem('settings');
    const settingsParsed: Store['settings'] | undefined = settings ? JSON.parse(settings) : undefined;
    if (settingsParsed) {
        return settingsParsed;
    } else {
        const settings: Store['settings'] = {
            newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY
        }
        updateLocalStore(settings, 'settings');
        return settings;
    }
}

export function updateLocalStore<T extends keyof LocalStore>(store: LocalStore[T], propertyName: T) {
    setTimeout(() => {
        localStorage.setItem(propertyName, JSON.stringify(store));
    }, 0)
}

export async function resetLocalStore() {
    localStorage.removeItem('userCards');
    localStorage.removeItem('settings');
    return await loadLocalStore();
}

export function updateNewCardsPerDay(userCards: UserCard[], newCardsPerDay: number) {
    const cards: UserCard[] = [...userCards].sort((a, b) => sortByDate(a.schedule.lastReview, b.schedule.lastReview));
    const now = new Date();
    let newCardsAdded = 0;
    let due = 0;
    for (const { schedule } of cards) {
        // Update due date each time a new day has been complete 
        // with the set number of new cards 
        if (newCardsAdded % newCardsPerDay === 0) {
            due = now.getTime() + (DAY_IN_MILLISECONDS * (newCardsAdded / newCardsPerDay));
        }
        // Reschedule new cards based on the new cards per day
        if (schedule.state === State.New) {
            schedule.due = new Date(due);
        }
        newCardsAdded += 1;
    }
    return cards;
}
export async function createAllCards(cardsPerDay = DEFAULT_NEW_CARDS_PER_DAY) {
    const newCards: UserCard[] = [];
    const now = new Date();
    let newCardsAdded = 0;
    let due = 0;
    const names = await getKeys();
    for (const name of names) {
        // Group cards by new cards per day
        if (newCardsAdded % cardsPerDay === 0) {
            due = now.getTime() + (DAY_IN_MILLISECONDS * (newCardsAdded / cardsPerDay));
        }
        const emptyCard = massageCard(createEmptyCard(due, (card: FSRSCard) => ({ ...card, cid: name })));
        newCards.push({ name, schedule: emptyCard })
        newCardsAdded += 1;
    }
    return newCards;
}

export function getFirstDue(cards: UserCard[]) {
    return cards.sort((a, b) => sortByDate(a.schedule.due, b.schedule.due))[0];
}

export function overDue(schedule: ScheduleCard, now: Date = new Date()) {
    return now > new Date(schedule.due);
}

export function createNextSessionText(toDate: Date, now: Date = new Date()) {
    const time = toDate.getTime() - now.getTime();
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / (1000));
    return `Next session in ${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function filterCardsByState<T extends State>(cards: UserCard<State>[], state: T) {
    return cards.filter(card => card.schedule.state === state) as UserCard<typeof state>[]
}

export function sortByDate(a?: Date, b?: Date) {
    if (a && b) {
        return new Date(a).getTime() - new Date(b).getTime();
    } else if (a) {
        return 1;
    } else if (b) {
        return -1;
    } else {
        return 0;
    }
}