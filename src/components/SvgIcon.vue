<script lang="ts" setup>
const props = defineProps<{
	name: 'settings',
	size?: 'l',
}>();
</script>

<template>
	<svg :class="['svg', { 'svg--l': size === 'l' }]">
		<use :href="`/sprite.svg#${props.name}`"></use>
	</svg>
</template>


<style lang="scss">
svg {
	width: var(--font-2xl);
	height: var(--font-2xl);

	&.svg--l {
		width: var(--font-5xl);
		height: var(--font-5xl);
	}
}
</style>