<script lang="ts" setup>
import type { IconName } from '@/types/icon-names';
import Icon from './IconBase.vue';
import { computed, ref, useAttrs } from 'vue';

export interface ButtonBaseProps {
    component: 'button' | 'RouterLink',
    action?: 'primary' | 'hard' | 'good' | 'easy' | 'secondary'
    iconName?: IconName,
    disabled?: boolean
}

defineOptions({
    inheritAttrs: false
})

withDefaults(defineProps<ButtonBaseProps>(), {
    action: 'primary',
})

const isTouched = ref(false);

const attrs = useAttrs();

const attrsAndClass = computed(() => {
    const { class: classWrapper, ...rest } = attrs;
    return { classWrapper, attrsWithoutClass: rest }
})

function buttonPressed() {
    isTouched.value = true;
}

function buttonReleased() {
    isTouched.value = false;
}
</script>


<template>
    <div
        :class="[
            'button-wrapper',
            `button-wrapper--${action}`,
            { 'button-wrapper--disabled': disabled },
            { 'button-wrapper--is-touched': isTouched },
            attrsAndClass.classWrapper
        ]"
        @touchstart="buttonPressed"
        @touchend="buttonReleased"
    >
        <component
            class="button"
            v-bind="attrsAndClass.attrsWithoutClass"
            :is="component"
            :disabled="disabled"
        >
            <Icon
                v-if="iconName"
                :name="iconName"
                color="#fff"
            />
            <slot />
        </component>
    </div>
</template>


<style lang="scss">
@use '../assets/styles/_variables' as *;

.button-wrapper {
    position: relative;
    width: clamp($min-width, 100%, $max-width);
    height: 50px;
    margin: auto;
    cursor: pointer;

    .button {
        cursor: pointer;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: var(--border-radius);
        transform: translate3d(0, 4px, 0);
        background-color: var(--primary-dark);
        z-index: -1;
    }

    &:hover,
    &--is-touched {
        .button {
            transform: translate3d(0, 2px, 0);
        }
    }

    &:active {
        .button {
            transform: translate3d(0, 4px, 0);
        }
    }

    &--easy {

        &::after {
            background-color: var(--green-dark);
            border-color: var(--green-dark);
        }


        .button {
            background-color: var(--green);
            border-color: var(--green-dark);
        }
    }

    &--hard {

        &::after {
            background-color: var(--red-dark);
            border-color: var(--red-dark);
        }


        .button {
            background-color: var(--red);
            border-color: var(--red-dark);
        }
    }

    &--good {

        &::after {
            background-color: var(--yellow-dark);
            border-color: var(--yellow-dark);
        }


        .button {
            background-color: var(--yellow);
            border-color: var(--yellow-dark);
        }
    }

    &--secondary {

        &::after {
            background-color: var(--purple);
            border-color: var(--purple);
        }


        .button {
            background-color: var(--purple-light);
            border-color: var(--purple);
        }
    }

    &--disabled {
        cursor: not-allowed;

        &::after {
            background-color: var(--secondary-light);
            border-color: var(--secondary-light);
        }

        &:hover {
            .button {
                transform: translate3d(0, 4px, 0);
            }
        }

        .button {
            transform: translate3d(0, 4px, 0);
            background-color: var(--secondary-light);
            border-color: var(--secondary-light);
            pointer-events: none;
        }

    }

}

.button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
    height: 100%;
    margin: auto;
    border: var(--border);
    border-color: var(--primary-dark);
    border-radius: var(--border-radius);
    padding: var(--space-2xs) var(--space-xs);
    color: #fff;
    background-color: var(--primary);
    font-size: var(--font-1);
    font-weight: 700;
    text-decoration: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 1;
}
</style>