import { dictionary } from 'most-common-words-fr-dict-generator';
import { reactive, toRefs } from 'vue';

const store = reactive({
    dictionary,
    currentCard: { name: 'être', entries: dictionary.get('être')! }
})

export function useStore() {

    function setCurrentCard(name: string) {
        const entries = store.dictionary.get(name);
        if (entries) {
            store.currentCard = { name, entries }
        }
    }

    return {
        ...toRefs(store),
        setCurrentCard
    }
}