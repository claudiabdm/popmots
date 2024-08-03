import type { DictionaryWord } from "most-common-words-fr-dict-generator/types";

export type WordEntries = Array<DictionaryWord>;
export type Card = { name: string, entries: WordEntries };