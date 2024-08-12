import type { FlashCard, UserCard } from "@/types";
import type { State } from "ts-fsrs";

export interface Store {
    // Total Cards
    userCards: UserCard[],
    readonly learningCards: UserCard<State.Learning>[],
    readonly newCards: UserCard<State.New>[],
    readonly reviewCards: UserCard<State.Review>[],
    readonly relearningCards: UserCard<State.Relearning>[],

    // Current Session Cards
    readonly dueCards: UserCard[],
    readonly learningUserCards: UserCard<State.Learning>[],
    readonly newUserCards: UserCard<State.New>[],
    readonly reviewUserCards: UserCard<State.Review>[],
    readonly relearningUserCards: UserCard<State.Relearning>[],
    sessionTotalCards: number,
    currentCard: FlashCard | undefined,

    isLoading: boolean,
    isSessionReady: boolean

    settings: {
        newCardsPerDay: number,
    }
}

export type LocalStore = Pick<Store, 'userCards' | 'settings'>