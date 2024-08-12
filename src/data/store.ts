import { computed, onMounted, reactive, toRefs } from 'vue';
import { fsrs, generatorParameters, State, type Grade } from 'ts-fsrs';
import { filterCardsByState, loadLocalStore, massageCard, overDue, resetLocalStore, sortByDate, unmassageCard, updateLocalStore, updateNewCardsPerDay } from './utils';
import type { LocalStore, Store } from './types';
import { DEFAULT_NEW_CARDS_PER_DAY } from './constants';
import { dictionary } from 'most-common-words-fr-dict-generator';
import type { UserCard } from '@/types';


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


    dueCards: computed(() => store.isSessionReady ? store.userCards
        .filter(card => overDue(card.schedule))
        .sort((a, b) => sortByDate(a.schedule.lastReview, b.schedule.lastReview)) : []
    ),
    learningCards: computed(() => filterCardsByState(store.dueCards, State.Learning)),
    newCards: computed(() => filterCardsByState(store.dueCards, State.New)),
    reviewCards: computed(() => filterCardsByState(store.dueCards, State.Review)),
    relearningCards: computed(() => filterCardsByState(store.dueCards, State.Relearning)),
    sessionTotalCards: 0,
    isSessionReady: false,

    currentCard: computed(() => {
        if (store.dueCards.length > 0) {
            const current = store.dueCards[0];
            const entries = dictionary.get(current.name)
            if (entries) {
                return { ...store.dueCards[0], entries }
            }
        }
        return undefined
    }),

    isLoading: true,

    settings: {
        newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY
    },

});

export function useStore() {
    function initStore() {
        if (store.userCards.length === 0) {
            onMounted(() => {
                const localStore = loadLocalStore();
                setInitialValues(localStore)
            })
        }
    }

    function setInitialValues(localStore: LocalStore) {
        store.userCards = localStore.userCards;
        store.settings = localStore.settings;
        setIsSessionReady(store.userCards.length > 0);
        setTimeout(() => store.isLoading = false, 1000);
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

    function updateCard(name: string, card: UserCard) {
        const index = store.userCards.findIndex(c => c.name === name);
        store.userCards[index] = card;
        setUserCards(store.userCards);
    }

    function resetStore() {
        store.isLoading = true;
        store.userCards = [];
        const localStore = resetLocalStore();
        setInitialValues(localStore)
    }

    function setIsSessionReady(value: boolean) {
        store.isSessionReady = value;
        // Set initial session total cards based on the total number of due cards
        if (store.isSessionReady && store.sessionTotalCards === 0) {
            store.sessionTotalCards = store.dueCards.length;
        }
        // Set value back to 0 when session is over or not ready
        if (!store.isSessionReady && store.sessionTotalCards > 0) {
            store.sessionTotalCards = 0;
        }
    }

    return {
        ...toRefs(store),
        initStore,
        setNewCardsPerDay,
        setIsSessionReady,
        rateCard,
        resetStore
    }
}