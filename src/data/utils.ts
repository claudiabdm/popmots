import type { Card, ScheduleCard, FSRSCard } from "@/types";
import { dictionary } from "most-common-words-fr-dict-generator";
import { createEmptyCard, State } from "ts-fsrs";
import { DAY_IN_MILLISECONDS, DEFAULT_NEW_CARDS_PER_DAY } from "./constants";
import type { LocalStore, Store } from "./types";

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

export function loadLocalStore() {
    const settings = loadLocalSettings();
    const totalCards = loadLocalCards({ newCardsPerDay: settings.newCardsPerDay });
    return { settings, totalCards };
}

function loadLocalCards(settings?: Store['settings']): Store['totalCards'] {
    const localCards = localStorage.getItem('totalCards');
    const localCardsParsed: Store['totalCards'] | undefined = localCards ? JSON.parse(localCards) : undefined;
    if (localCardsParsed) {
        return localCardsParsed.map(c => ({ ...c, schedule: copyScheduleCard(c.schedule) }));
    } else {
        const allCards = createAllCards(settings?.newCardsPerDay);
        updateLocalStore(allCards, 'totalCards');
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

export function updateNewCardsPerDay(totalCards: Card[], newCardsPerDay: number) {
    const cards: Card[] = [...totalCards].sort(sortByLastReview);
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
export function createAllCards(cardsPerDay = DEFAULT_NEW_CARDS_PER_DAY) {
    const newCards: Card[] = [];
    const now = new Date();
    let newCardsAdded = 0;
    let due = 0;
    for (const [name, entries] of dictionary) {
        if (newCardsAdded >= 2000) break;
        // Group cards by new cards per day
        if (newCardsAdded % cardsPerDay === 0) {
            due = now.getTime() + (DAY_IN_MILLISECONDS * (newCardsAdded / cardsPerDay));
        }
        const emptyCard = massageCard(createEmptyCard(due, (card: FSRSCard) => ({ ...card, cid: name })));
        newCards.push({ name, entries, schedule: emptyCard })
        newCardsAdded += 1;
    }
    return newCards;
}

export function overDue(schedule: ScheduleCard) {
    return new Date() > new Date(schedule.due);
}

export function filterCardsByState<T extends State>(cards: Card<State>[], state: T) {
    return cards.filter(card => card.schedule.state === state) as Card<typeof state>[]
}

export function sortByLastReview(a: Card, b: Card) {
    if (a.schedule.lastReview && b.schedule.lastReview) {
        return new Date(a.schedule.lastReview).getTime() - new Date(b.schedule.lastReview).getTime();
    } else if (a.schedule.lastReview) {
        return 1;
    } else if (b.schedule.lastReview) {
        return -1;
    } else {
        return 0;
    }
}