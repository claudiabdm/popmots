<script lang="ts" setup>
import type { IconName } from '@/types/icon-names';
import SvgIcon from './SvgIcon.vue';
import { type RouterLink } from 'vue-router';
export interface ButtonBaseProps {
    component: 'button' | typeof RouterLink,
    action?: 'primary' | 'hard' | 'good' | 'easy'
    iconName?: IconName,
    disabled?: boolean
}

withDefaults(defineProps<ButtonBaseProps>(), {})
</script>

<template>
    <div :class="[
        'button-wrapper',
        `button-wrapper--${action}`,
        { 'button-wrapper--disabled': disabled }
    ]">
        <component
            class="button"
            v-bind="$attrs"
            :is="component"
            :disabled="disabled"
        >
            <SvgIcon
                v-if="iconName"
                :name="iconName"
                color="#fff"
            />
            <slot />
        </component>
    </div>
</template>


<style lang="scss">
.button-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
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
    }

    &:hover {
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
    margin: auto;
    border: var(--border);
    border-color: var(--primary-dark);
    border-radius: var(--border-radius);
    padding: var(--space-2xs) var(--space-xs);
    color: #fff;
    background-color: var(--primary);
    font-size: var(--font-xl);
    font-weight: 700;
    text-decoration: none;
    z-index: 1;
}
</style>