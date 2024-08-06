import type { DictionaryWord } from "most-common-words-fr-dict-generator/types";
import type { PickRenameMulti } from "./utils";
import type { Card as FSCard, State } from 'ts-fsrs';

export interface Store {
    readonly totalCards: Card[],
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
    isLoading: boolean
}

export type FSRSCard = FSCard;
export interface ScheduleCard<T extends State = State> extends PickRenameMulti<FSRSCard, {
    "elapsed_days": "elapsedDays"
    "scheduled_days": "scheduledDays"
    "last_review": "lastReview"
}> {
    state: T
}
export interface Card<T extends State = State> {
    readonly name: string
    readonly entries: WordEntries
    schedule: ScheduleCard<T>
}
export type WordEntries = Array<DictionaryWord>;