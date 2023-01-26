<template>
  <div v-if="note" class="text-xl font-bold text-neutral-400">You are tunning the note : <span class="text-2xl">{{ note.name }}</span> </div>
</template>

<script>
export default {
  props: {
    note: String
  }
}
</script>
