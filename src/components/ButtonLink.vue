<script lang="ts" setup>
import { default as ButtonBase, type ButtonBaseProps } from './ButtonBase.vue';

interface Props extends Omit<ButtonBaseProps, 'component'> {
    href: HTMLAnchorElement['href'],
    rel?: HTMLAnchorElement['rel']
    download?: HTMLAnchorElement['download']
}

withDefaults(defineProps<Props>(), {
    action: 'primary',
})

</script>

<template>
    <ButtonBase
        component="a"
        :href="href"
        :rel="rel"
        :download="download"
        :action="action"
        :icon-name="iconName"
        :disabled="disabled"
    >
        <slot />
    </ButtonBase>

</template>
