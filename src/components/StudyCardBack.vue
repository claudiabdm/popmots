<script lang="ts" setup>
import ButtonButton from './ButtonButton.vue';
import StudyCardBase from './StudyCardBase.vue';
import StudyCardTitle from './StudyCardTitle.vue';

interface Props {
    name: string
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
            <dd>
                <section class="study-card-back__desc">
                    <h4 class="study-card-back__cat">
                        noun
                    </h4>
                    <p class="study-card-back__def">
                        greetings; hello (general salutation)
                    </p>
                    <p class="study-card-back__example">
                        <q>Tu passeras le bonjour à ta mère!</q>
                    </p>
                    <p class="study-card-back__example">
                        <q>You will say hello to your mother!</q>
                    </p>
                </section>
            </dd>
            <dd>
                <section class="study-card-back__desc">
                    <h4 class="study-card-back__cat">
                        interjection
                    </h4>
                    <p class="study-card-back__def">
                        good day; good morning
                    </p>
                    <p class="study-card-back__example">
                        <q>Bonjour, mon ami !</q>
                    </p>
                    <p class="study-card-back__example">
                        <q>Good morning, my friend!</q>
                    </p>
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
    width: max-content;
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
        font-size: var(--font--1);
        color: var(--primary-light);
    }

    &__def {
        margin-top: var(--space-2xs);
        margin-bottom: var(--space-2xs);
        color: var(--secondary-darker);
    }

    &__example {
        font-size: var(--font--1);
        font-style: italic;
        color: var(--secondary);
    }

}
</style>