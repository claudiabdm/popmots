import { computed, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue';
import { fsrs, generatorParameters, State, type Grade } from 'ts-fsrs';
import { createNextSessionText, filterCardsByState, getFirstDue, loadLocalStore, massageCard, overDue, resetLocalStore, sortByDate, unmassageCard, updateLocalStore, updateNewCardsPerDay } from './utils';
import type { LocalStore, Store } from './types';
import { DEFAULT_NEW_CARDS_PER_DAY } from './constants';
import type { UserCard } from '@/types';
import { getWordEntries } from './api';

const params = generatorParameters({
    enable_short_term: true,
    enable_fuzz: true,
    maximum_interval: 0.8
});
export const f = fsrs(params);

const store: Store = reactive({
    userCards: [],
    learningUserCards: computed(() => filterCardsByState(store.userCards, State.Learning)),
    newUserCards: computed(() => filterCardsByState(store.userCards, State.New)),
    reviewUserCards: computed(() => filterCardsByState(store.userCards, State.Review)),
    relearningUserCards: computed(() => filterCardsByState(store.userCards, State.Relearning)),

    dueCards: computed(() => store.userCards
        .filter(card => overDue(card.schedule, new Date(store.now)))
        .sort((a, b) => sortByDate(a.schedule.lastReview, b.schedule.lastReview))
    ),
    learningCards: computed(() => filterCardsByState(store.dueCards, State.Learning)),
    newCards: computed(() => filterCardsByState(store.dueCards, State.New)),
    reviewCards: computed(() => filterCardsByState(store.dueCards, State.Review)),
    relearningCards: computed(() => filterCardsByState(store.dueCards, State.Relearning)),
    sessionTotalCards: 0,
    currentCard: undefined,
    isSessionGoing: false,

    intervalId: undefined,
    now: Date.now(),

    nextSessionText: undefined,

    isLoading: true,

    settings: {
        newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY
    },

});

export function useStore() {
    function initStore() {
        if (store.userCards.length === 0) {
            onMounted(async () => {
                const localStore = await loadLocalStore();
                setInitialValues(localStore);
                store.intervalId = setInterval(() => store.now = Date.now(), 1000) as unknown as number;
            })
            watch(() => store.dueCards, async (newVal, oldVal) => {
                const isSessionGoing = store.isSessionGoing;
                // Current session finishes when there are no due cards
                if (isSessionGoing === true && newVal.length === 0) {
                    store.isSessionGoing = false;
                    store.sessionTotalCards = 0;
                }
                // A new session starts when there are due cards again
                if (isSessionGoing === false && newVal.length > 0) {
                    store.isSessionGoing = true;
                    store.sessionTotalCards = newVal.length;
                }

                // Update next session text while waiting for more due cards
                if (store.isSessionGoing === false) {
                    if (store.userCards.length > 0) {
                        store.nextSessionText = createNextSessionText(getFirstDue(store.userCards).schedule.due, new Date(store.now))
                    }
                } else {
                    // Stop updating and set undefined when a session is in progress
                    if (store.nextSessionText) {
                        store.nextSessionText = undefined
                    }
                }

                // Session cards increases when a new card is due
                // This can occur when a session is on and a new card is due
                if (newVal.length > oldVal.length) {
                    store.sessionTotalCards = newVal.length;
                }

                // Current card is the first due
                setCurrentCard(newVal?.[0]);
            })
            onUnmounted(() => {
                clearInterval(store.intervalId)
            });
        }
    }

    function setInitialValues(localStore: LocalStore) {
        store.userCards = localStore.userCards;
        store.settings = localStore.settings;
        setTimeout(() => store.isLoading = false, 1000);
    }

    function setUserCards(cards: UserCard[]) {
        store.userCards = cards;
        updateLocalStore(store.userCards, 'userCards');
    }

    function setNewCardsPerDay(newCardsPerDay: number) {
        store.settings.newCardsPerDay = newCardsPerDay;
        const updatedCards = updateNewCardsPerDay(store.userCards, newCardsPerDay);
        updateLocalStore(store.settings, 'settings');
        updateLocalStore(updatedCards, 'userCards');
        setInitialValues({ userCards: updatedCards, settings: store.settings });
    }

    function setCurrentCard(card?: UserCard) {
        if (card) {
            if (card.name !== store.currentCard?.name) {
                const entries = getWordEntries(card.name);
                store.currentCard = { ...card, entries };
            }
        } else {
            store.currentCard = undefined;
        }
    }

    function updateCard(name: string, card: UserCard) {
        const index = store.userCards.findIndex(c => c.name === name);
        store.userCards[index] = card;
        setUserCards(store.userCards);
    }

    function rateCard(grade: Grade) {
        if (store.currentCard) {
            const fsrsCard = unmassageCard(store.currentCard.schedule);
            if (fsrsCard) {
                const schedulingCards = f.repeat(fsrsCard, new Date());
                const { card } = schedulingCards[grade];
                const updatedSchedule = massageCard({ ...card, cid: store.currentCard.name });
                updateCard(store.currentCard.name, { ...store.currentCard, schedule: updatedSchedule });
            }
        }
    }

    async function resetStore() {
        store.isLoading = true;
        store.userCards = [];
        const localStore = await resetLocalStore();
        setInitialValues(localStore)
    }

    return {
        ...toRefs(store),
        initStore,
        setNewCardsPerDay,
        rateCard,
        resetStore
    }
}