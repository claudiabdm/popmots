<script lang="ts" setup>
import { default as ButtonBase, type ButtonBaseProps } from './ButtonBase.vue';

interface Props extends Omit<ButtonBaseProps, 'component'> {
  type?: HTMLButtonElement['type']
}

withDefaults(defineProps<Props>(), {
  action: 'primary',
  type: 'button'
})
</script>

<template>
  <ButtonBase
    component="button"
    :type="type"
    :action="action"
    :icon-name="iconName"
    :disabled="disabled"
  >
    <slot />
  </ButtonBase>

</template>
