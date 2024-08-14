import type { DictionaryWord } from "most-common-words-fr-dict-generator/types";
import type { PickRenameMulti } from "./utils";
import type { Card as FSCard, State } from 'ts-fsrs';

export type FSRSCard = FSCard;
export interface ScheduleCard<T extends State = State> extends PickRenameMulti<FSRSCard, {
    "elapsed_days": "elapsedDays"
    "scheduled_days": "scheduledDays"
    "last_review": "lastReview"
}> {
    readonly cid: string
    state: T
}
export interface UserCard<T extends State = State> {
    readonly name: string
    schedule: ScheduleCard<T>
}
export type WordEntries = Array<DictionaryWord>;
export interface FlashCard extends UserCard {
    entries: Promise<WordEntries>
}