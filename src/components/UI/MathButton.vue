<script setup lang="ts">
import Button from 'primevue/button';
const props = defineProps({
  label: String,
  severity: String
});

</script>
<template>
  <Button :label="props.label" :severity="props.severity" class="w-full"/>
</template>
