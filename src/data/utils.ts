import type { Card, ScheduleCard, FSRSCard } from "@/types";
import { dictionary } from "most-common-words-fr-dict-generator";
import { createEmptyCard, State } from "ts-fsrs";

export function massageCard(card: FSRSCard): ScheduleCard {
    const { elapsed_days, scheduled_days, last_review, ...rest } = card
    return {
        ...rest,
        elapsedDays: elapsed_days,
        scheduledDays: scheduled_days,
        lastReview: last_review
    }
}

export function unmassageCard(schedule: ScheduleCard): FSRSCard {
    const { elapsedDays, scheduledDays, lastReview, ...rest } = schedule
    return {
        ...rest,
        elapsed_days: elapsedDays,
        scheduled_days: scheduledDays,
        last_review: lastReview
    }
}

export function loadLocalCards() {
    const totalCards: Card[] = [];
    const localCards = localStorage.getItem('Cards');
    const localCardsParsed = localCards ? JSON.parse(localCards) : undefined;

    if (localCardsParsed && localCardsParsed.length > 0) {
        totalCards.push(...localCardsParsed);
    } else {
        const allCards = createAllCards();
        totalCards.push(...allCards);
        localStorage.setItem('Cards', JSON.stringify(totalCards));
    }

    return totalCards;
}

export function updateLocalCards(totalCards: Card[]) {
    localStorage.setItem('Cards', JSON.stringify(totalCards));
}

export function createAllCards(cardsPerDay = 20) {
    const newCards: Card[] = [];
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const now = new Date();
    let newCardsAdded = 0;
    let due = 0;
    for (const [name, entries] of dictionary) {
        if (newCardsAdded >= 100) break;
        if (newCardsAdded % cardsPerDay === 0) {
            due = now.getTime() + (dayInMilliseconds * (newCardsAdded / cardsPerDay));
        }
        const emptyCard = massageCard(createEmptyCard(due));
        newCards.push({ name, entries, schedule: emptyCard })
        newCardsAdded += 1;
    }
    return newCards;
}

export function sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export function filterCardsByState<T extends State>(cards: Card<State>[], state: T) {
    return cards.filter(card => card.schedule.state === state) as Card<typeof state>[]
}