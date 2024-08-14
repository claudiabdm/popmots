<script lang="ts" setup>
import type { WordEntries } from '@/types';
import ButtonButton from './ButtonButton.vue';
import StudyCardBase from './StudyCardBase.vue';
import StudyCardTitle from './StudyCardTitle.vue';
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
    name: string
    entries: Promise<WordEntries>
}

const props = defineProps<Props>();
const paused = ref(false);
const wordEntries = ref<WordEntries>([]);
const pronunAudio = ref();

onMounted(() => {
    props.entries?.then(res => {
        wordEntries.value = res;

        const pronunFile = res[0]?.pronunciation_mp3?.split('/').pop();
        pronunAudio.value = pronunFile ? new Audio(`/${pronunFile}`) : undefined;
        pronunAudio.value?.load()
        pronunAudio.value?.addEventListener('play', handlePlay);
        pronunAudio.value?.addEventListener('pause', handlePlay);
    })
})

onUnmounted(() => {
    pronunAudio.value?.removeEventListener('play', handlePlay);
    pronunAudio.value?.removeEventListener('pause', handlePlay);
})

function listenPronunciation() {
    pronunAudio.value?.play()
}

function handlePlay() {
    paused.value = !paused.value
}
</script>
<template>
    <StudyCardBase class="study-card-back">
        <dl class="study-card-back__content">
            <dt class="study-card-back__term">
                <StudyCardTitle>
                    {{ name }}
                    <span class="study-card-back__ipa">
                        {{ wordEntries[0]?.ipa }}
                    </span>
                </StudyCardTitle>
                <ButtonButton
                    :class="['study-card-back__btn', { 'study-card-back__btn--playing': paused }]"
                    :icon-name="paused ? 'paused' : 'play'"
                    action="secondary"
                    aria-label="Listen to pronunciation"
                    @click="listenPronunciation"
                    :disabled="!pronunAudio"
                />
            </dt>
            <dd
                v-for="entry in wordEntries"
                :key="(entry.senses[0] as any).id + 'entry'"
            >
                <section class="study-card-back__desc">
                    <h4 class="study-card-back__cat">
                        {{ entry.category }}
                        <span
                            v-if="entry.head"
                            class="study-card-back__head"
                        >
                            {{ entry.head.join(', ') }}
                        </span>
                    </h4>
                    <ul class="study-card-back__senses">
                        <li
                            class="study-card-back__sense"
                            v-for="(sense, index) in entry.senses"
                            :key="(sense as any).id"
                        >
                            <p class="study-card-back__def">
                                <span class="study-card-back__index">
                                    {{ index + 1 }}.
                                </span>
                                {{ sense.glosses.join(', ') }}
                            </p>
                            <template
                                v-for="(ex, index) in sense.examples?.slice(0, 3)"
                                :key="ex.text + index"
                            >
                                <p
                                    v-if="ex.text.length < 100 && ex.english"
                                    class="study-card-back__example"
                                >
                                    FR: {{ ex.text }}
                                    <br />
                                    EN: {{ ex.english }}
                                </p>
                            </template>

                        </li>
                    </ul>
                </section>
            </dd>
        </dl>
    </StudyCardBase>
</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.study-card-back {
    padding: var(--space-m);
    transform: rotateY(180deg);

    &__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    &__term {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-m);
        margin-bottom: var(--space-m);
    }

    &__ipa {
        color: var(--primary-light);
        font-size: var(--font-0);
        font-family: monospace;
        font-weight: 300;
        text-transform: none;
    }

    &__btn {
        margin: 0;
        width: max-content;

        &--playing {

            &:active .button,
            &:hover .button,
            .button {
                transform: translate3d(0, 4px, 0);
            }

            svg {

                path {
                    color: var(--primary);
                    stroke: aqua;
                    stroke-width: 3;
                }
            }
        }
    }

    &__desc {
        display: flex;
        flex-direction: column;
        gap: var(--space-2xs);
        font-size: var(--font-0);
    }

    &__cat {
        display: flex;
        align-items: baseline;
        gap: var(--space-2xs);
        text-wrap: auto;
        color: var(--primary);
    }

    &__senses {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs)
    }

    &__sense {
        display: flex;
        flex-direction: column;
        gap: var(--space-2xs)
    }

    &__head {
        width: 100%;
        color: var(--primary-light);
        font-size: var(--font--1);
        font-style: italic;
        font-weight: 400;
    }

    &__def {
        display: flex;
        gap: var(--space-2xs);
        color: var(--secondary-darker);
    }

    &__example {
        padding-left: var(--space-l);
        font-size: var(--font--1);
        color: var(--secondary);
    }

    &__index {
        flex-shrink: 0;
        text-align: right;
        width: var(--space-m);
        color: var(--primary-light);
    }

}
</style>