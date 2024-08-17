<script lang="ts" setup>
import { default as ButtonBase, type ButtonBaseProps } from './ButtonBase.vue';

interface Props extends Omit<ButtonBaseProps, 'component'> {
  type?: HTMLInputElement['type'],
  accept?: HTMLInputElement['accept'],
  name?: HTMLInputElement['name'],
}

withDefaults(defineProps<Props>(), {
  action: 'primary',
})
</script>

<template>
  <ButtonBase
    component="label"
    :for="name"
    :action="action"
    :icon-name="iconName"
    :disabled="disabled"
  >
    <input
      :type="type"
      :accept="accept"
      :name="name"
      :id="name"
      @change="$emit('change', $event)"
      class="sr-only"
    >
    <slot />
  </ButtonBase>

</template>
