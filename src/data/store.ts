import { computed, onMounted, reactive, toRefs } from 'vue';
import { fsrs, generatorParameters, State, type Grade } from 'ts-fsrs';
import { filterCardsByState, loadLocalStore, massageCard, overDue, resetLocalStore, sortByLastReview, unmassageCard, updateLocalStore, updateNewCardsPerDay } from './utils';
import type { LocalStore, Store } from './types';
import { DEFAULT_NEW_CARDS_PER_DAY } from './constants';
import type { Card } from '@/types';


const params = generatorParameters({
    enable_short_term: true,
    enable_fuzz: true,
    maximum_interval: 0.8
});
export const f = fsrs(params);

const store: Store = reactive({
    totalCards: [],

    learningTotalCards: computed(() => filterCardsByState(store.totalCards, State.Learning)),
    newTotalCards: computed(() => filterCardsByState(store.totalCards, State.New)),
    reviewTotalCards: computed(() => filterCardsByState(store.totalCards, State.Review)),
    relearningTotalCards: computed(() => filterCardsByState(store.totalCards, State.Relearning)),


    dueCards: computed(() => store.totalCards
        .filter(card => overDue(card.schedule))
        .sort(sortByLastReview)
    ),

    learningCards: computed(() => filterCardsByState(store.dueCards, State.Learning)),
    newCards: computed(() => filterCardsByState(store.dueCards, State.New)),
    reviewCards: computed(() => filterCardsByState(store.dueCards, State.Review)),
    relearningCards: computed(() => filterCardsByState(store.dueCards, State.Relearning)),

    currentCard: computed(() => {
        return store.dueCards.length > 0 ? store.dueCards[0] : undefined
    }),

    initialTotal: 0,
    isLoading: true,
    settings: {
        newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY
    }
});

export function useStore() {
    function initStore() {
        if (store.totalCards.length === 0) {
            onMounted(() => {
                const localStore = loadLocalStore();
                setInitialValuesFromLocal(localStore)
            })
        }
    }

    function setInitialValuesFromLocal(localStore: LocalStore) {
        store.totalCards = localStore.totalCards;
        store.settings = localStore.settings;
        store.initialTotal = store.dueCards.length;
        if (store.currentCard == null && store.dueCards.length > 0) {
            store.currentCard = store.dueCards[0];
        }
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

    function setTotalCards(cards: Card[]) {
        store.totalCards = cards;
        store.initialTotal = store.dueCards.length;
        updateLocalStore(store.totalCards, 'totalCards');
    }

    function setNewCardsPerDay(newCardsPerDay: number) {
        store.settings.newCardsPerDay = newCardsPerDay;
        const updatedCards = updateNewCardsPerDay(store.totalCards, newCardsPerDay);
        updateLocalStore(store.settings, 'settings');
        setTotalCards(updatedCards);
    }

    function setCurrentCard(name: string) {
        store.currentCard = store.totalCards.find(card => card.name === name);
    }

    function updateCard(name: string, card: Card) {
        const index = store.totalCards.findIndex(c => c.name === name);
        store.totalCards[index] = card;
        setTotalCards(store.totalCards);
    }

    function resetStore() {
        store.isLoading = true;
        store.totalCards = [];
        const localStore = resetLocalStore();
        setInitialValuesFromLocal(localStore)
        store.isLoading = false;
    }

    return {
        ...toRefs(store),
        initStore,
        setCurrentCard,
        setNewCardsPerDay,
        rateCard,
        resetStore
    }
}