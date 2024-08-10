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

    learninguserCards: computed(() => filterCardsByState(store.userCards, State.Learning)),
    newuserCards: computed(() => filterCardsByState(store.userCards, State.New)),
    reviewuserCards: computed(() => filterCardsByState(store.userCards, State.Review)),
    relearninguserCards: computed(() => filterCardsByState(store.userCards, State.Relearning)),


    dueCards: computed(() => store.userCards
        .filter(card => overDue(card.schedule))
        .sort((a, b) => sortByDate(a.schedule.lastReview, b.schedule.lastReview))
    ),

    learningCards: computed(() => filterCardsByState(store.dueCards, State.Learning)),
    newCards: computed(() => filterCardsByState(store.dueCards, State.New)),
    reviewCards: computed(() => filterCardsByState(store.dueCards, State.Review)),
    relearningCards: computed(() => filterCardsByState(store.dueCards, State.Relearning)),

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

    initialTotal: 0,
    isLoading: true,
    settings: {
        newCardsPerDay: DEFAULT_NEW_CARDS_PER_DAY
    }
});

export function useStore() {
    function initStore() {
        if (store.userCards.length === 0) {
            onMounted(() => {
                const localStore = loadLocalStore();
                setInitialValuesFromLocal(localStore)
            })
        }
    }

    function setInitialValuesFromLocal(localStore: LocalStore) {
        store.userCards = localStore.userCards;
        store.settings = localStore.settings;
        store.initialTotal = store.dueCards.length;
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

    function setuserCards(cards: UserCard[]) {
        store.userCards = cards;
        store.initialTotal = store.dueCards.length;
        updateLocalStore(store.userCards, 'userCards');
    }

    function setNewCardsPerDay(newCardsPerDay: number) {
        store.settings.newCardsPerDay = newCardsPerDay;
        const updatedCards = updateNewCardsPerDay(store.userCards, newCardsPerDay);
        updateLocalStore(store.settings, 'settings');
        setuserCards(updatedCards);
    }

    function updateCard(name: string, card: UserCard) {
        const index = store.userCards.findIndex(c => c.name === name);
        store.userCards[index] = card;
        setuserCards(store.userCards);
    }

    function resetStore() {
        store.isLoading = true;
        store.userCards = [];
        const localStore = resetLocalStore();
        setInitialValuesFromLocal(localStore)
        store.isLoading = false;
    }

    return {
        ...toRefs(store),
        initStore,

        setNewCardsPerDay,
        rateCard,
        resetStore
    }
}