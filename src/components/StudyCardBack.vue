<script lang="ts" setup>
import type { WordEntries } from '@/types';
import ButtonButton from './ButtonButton.vue';
import StudyCardBase from './StudyCardBase.vue';
import StudyCardTitle from './StudyCardTitle.vue';

interface Props {
    name: string
    entries: WordEntries
}

defineProps<Props>();

</script>
<template>
    <StudyCardBase class="study-card-back">
        <dl class="study-card-back__content">
            <dt class="study-card-back__term">
                <StudyCardTitle>
                    {{ name }}
                </StudyCardTitle>
                <ButtonButton
                    class="study-card-back__btn"
                    icon-name="audio"
                    action="secondary"
                    aria-label="Listen to pronunciation"
                />
            </dt>
            <dd
                v-for="entry in entries"
                :key="entry.word"
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
                    <ul>
                        <li
                            v-for="(sense, index) in entry.senses"
                            :key="sense.glosses.join(', ')"
                        >
                            <p
                                v-for="glossary in sense.glosses"
                                :key="glossary"
                                class="study-card-back__def"
                            >
                                <span class="study-card-back__index">{{ index +
                                    1
                                    }}.</span> {{ sense.glosses.join(', ') }}
                            </p>
                            <p
                                v-for="ex in sense.examples"
                                :key="ex.text"
                                class="study-card-back__example"
                            >
                                FR: <q>{{ ex.text }}</q>
                                <br />
                                EN: <q>{{ ex.english }}</q>
                            </p>
                        </li>
                    </ul>
                </section>
            </dd>
        </dl>

        <!-- <ButtonButton
            action="secondary"
            class="study-card-back__btn"
        >
            View more
        </ButtonButton> -->
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

    &__btn {
        margin: 0;
        width: max-content;
    }

    &__desc {
        font-size: var(--font-0);
    }

    &__cat {
        color: var(--primary);
    }

    &__head {
        color: var(--primary-light);
        font-size: var(--font--1);
        font-style: italic;
        font-weight: 300;
    }

    &__def {
        display: flex;
        gap: var(--space-2xs);
        margin-top: var(--space-2xs);
        margin-bottom: var(--space-2xs);
        color: var(--secondary-darker);
    }

    &__example {
        font-size: var(--font--1);
        color: var(--secondary);
    }

    &__index {
        color: var(--primary-light);
    }

}
</style>