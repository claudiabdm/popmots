import { useStore } from '@/data';
import { sortByDue } from '@/data/utils';
import { onMounted, onUnmounted, ref } from 'vue';
export function useNextSessionTime() {

    const store = useStore();

    const intervalId = ref()

    const nextSessionText = ref<string>();

    onMounted(() => {
        setNextSessionText()
        intervalId.value = setInterval(() => {
            setNextSessionText()
        }, 1000)
    })

    onUnmounted(() => {
        clearInterval(intervalId.value)
    })

    function setNextSessionText() {
        if (store.totalCards.value.length > 0 && store.dueCards.value.length === 0) {
            const sorted = [...store.totalCards.value].sort(sortByDue)
            const firstDue = sorted?.[0].schedule.due ?? undefined;
            const now = new Date();
            if (firstDue) {
                const time = firstDue.getTime() - now.getTime();
                const days = Math.floor(time / (1000 * 60 * 60 * 24));
                const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((time % (1000 * 60)) / (1000));
                nextSessionText.value = `Next session in ${days}d ${hours}h ${minutes}m ${seconds}s`
            }
        } else {
            nextSessionText.value = undefined
        }
    }

    return nextSessionText
}