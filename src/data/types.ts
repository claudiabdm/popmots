import type { FlashCard, UserCard } from "@/types";
import type { State } from "ts-fsrs";

export interface Store {
    userCards: UserCard[],

    readonly dueCards: UserCard[],
    readonly learningCards: UserCard<State.Learning>[],
    readonly learninguserCards: UserCard<State.Learning>[],
    readonly newCards: UserCard<State.New>[],
    readonly newuserCards: UserCard<State.New>[],
    readonly reviewCards: UserCard<State.Review>[],
    readonly reviewuserCards: UserCard<State.Review>[],
    readonly relearningCards: UserCard<State.Relearning>[],
    readonly relearninguserCards: UserCard<State.Relearning>[],

    initialTotal: number,
    currentCard: FlashCard | undefined,
    isLoading: boolean,

    settings: {
        newCardsPerDay: number,
    }
}

export type LocalStore = Pick<Store, 'userCards' | 'settings'>