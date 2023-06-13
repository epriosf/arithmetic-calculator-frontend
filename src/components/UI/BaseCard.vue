<script setup lang="ts">
import Card from 'primevue/card'
</script>
<template>
  <Card>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #content>
     <slot name="content"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>
