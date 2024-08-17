<script lang="ts" setup>
import type { RouterLinkProps } from 'vue-router';
import { default as ButtonBase, type ButtonBaseProps } from './ButtonBase.vue';

interface Props extends Omit<ButtonBaseProps, 'component'>, RouterLinkProps { }

withDefaults(defineProps<Props>(), {
    action: 'primary',
})

</script>

<template>
    <ButtonBase
        component="RouterLink"
        :to="to"
        :action="action"
        :icon-name="iconName"
        :disabled="disabled"
    >
        <slot />
    </ButtonBase>

</template>
