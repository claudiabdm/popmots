<script lang="ts" setup>
import { default as ButtonBase, type ButtonBaseProps } from './ButtonBase.vue';

interface Props extends Omit<ButtonBaseProps, 'component'> { }

withDefaults(defineProps<Props>(), {
  action: 'primary',
})
</script>

<template>
  <ButtonBase
    component="button"
    type="button"
    :action="action"
    :icon-name="iconName"
    :disabled="disabled"
  >
    <slot />
  </ButtonBase>

</template>
