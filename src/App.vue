<script setup lang="ts">
import { Button } from '@/components/ui/button'

function onClick() {
  alert('it works')
}
</script>

<template>
  <main>
    <Button @click.prevent="onClick">test</Button>
  </main>
</template>
