<script lang="ts" setup>
import StudyCardBase from './StudyCardBase.vue';
import StudyCardTitle from './StudyCardTitle.vue';

interface Props {
    name: string
}

defineProps<Props>();

</script>
<template>
    <StudyCardBase class="study-card-front">
        <StudyCardTitle>
            {{ name }}
        </StudyCardTitle>
    </StudyCardBase>
</template>

<style lang="scss">
.study-card-front {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>