import { dictionary } from 'most-common-words-fr-dict-generator';
import { reactive, toRefs } from 'vue';

const randomNum = Math.floor(Math.random() * dictionary.size);
const randomWord = [...dictionary.keys()][randomNum];
const store = reactive({
    dictionary,
    currentCard: { name: randomWord, entries: dictionary.get(randomWord)! }
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