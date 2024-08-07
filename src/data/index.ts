import { computed, onMounted, reactive, toRefs } from 'vue';
import { fsrs, generatorParameters, State, type Grade } from 'ts-fsrs';
import { filterCardsByState, loadLocalCards, massageCard, sameDay, unmassageCard, updateLocalCards } from './utils';
import type { Store } from '@/types';

export const DEFAULT_NEW_CARDS_PER_DAY = 20;

const params = generatorParameters({
    enable_short_term: true,
    enable_fuzz: true,
    maximum_interval: 0.8
});
const f = fsrs(params);

const store: Store = reactive({
    totalCards: [],

    learningTotalCards: computed(() => filterCardsByState(store.totalCards, State.Learning)),
    newTotalCards: computed(() => filterCardsByState(store.totalCards, State.New)),
    reviewTotalCards: computed(() => filterCardsByState(store.totalCards, State.Review)),
    relearningTotalCards: computed(() => filterCardsByState(store.totalCards, State.Relearning)),


    dueCards: computed(() => [...store.totalCards]
        .filter(card => sameDay(new Date(card.schedule.due), new Date()))
        .sort((a, b) => {
            if (a.schedule.lastReview && b.schedule.lastReview) {
                return new Date(a.schedule.lastReview).getTime() - new Date(b.schedule.lastReview).getTime();
            } else if (a.schedule.lastReview) {
                return 1;
            } else if (b.schedule.lastReview) {
                return -1;
            } else {
                return 0;
            }
        })
    ),

    learningCards: computed(() => filterCardsByState(store.dueCards, State.Learning)),
    newCards: computed(() => filterCardsByState(store.dueCards, State.New)),
    reviewCards: computed(() => filterCardsByState(store.dueCards, State.Review)),
    relearningCards: computed(() => filterCardsByState(store.dueCards, State.Relearning)),

    currentCard: computed(() => {
        return store.dueCards.length > 0 ? store.dueCards[0] : undefined
    }),


    initialTotal: 0,
    isLoading: true
});

export function useStore() {
    function initStore() {
        if (store.totalCards.length === 0) {
            onMounted(() => {
                store.totalCards.push(...loadLocalCards());
                store.initialTotal = store.dueCards.length;
                if (store.currentCard == null && store.dueCards.length > 0) {
                    store.currentCard = store.dueCards[0];
                }
                setTimeout(() => store.isLoading = false, 500);
            })
        }
    }

    function rateCard(grade: Grade) {
        if (store.currentCard) {
            const fsrsCard = unmassageCard(store.currentCard.schedule);
            if (fsrsCard) {
                const schedulingCards = f.repeat(fsrsCard, new Date());
                const { card } = schedulingCards[grade];
                store.currentCard.schedule = massageCard(card);
                updateLocalCards(store.totalCards);
            }
        }
    }

    function setCurrentCard(name: string) {
        store.currentCard = store.totalCards.find(card => card.name === name);
    }

    return {
        ...toRefs(store),
        initStore,
        setCurrentCard,
        rateCard
    }
}