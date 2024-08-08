import type { Card } from "@/types";
import type { State } from "ts-fsrs";

export interface Store {
    totalCards: Card[],

    readonly dueCards: Card[],
    readonly learningCards: Card<State.Learning>[],
    readonly learningTotalCards: Card<State.Learning>[],
    readonly newCards: Card<State.New>[],
    readonly newTotalCards: Card<State.New>[],
    readonly reviewCards: Card<State.Review>[],
    readonly reviewTotalCards: Card<State.Review>[],
    readonly relearningCards: Card<State.Relearning>[],
    readonly relearningTotalCards: Card<State.Relearning>[],

    initialTotal: number,
    currentCard: Card | undefined,
    isLoading: boolean,

    newCardsPerDay: number,
}