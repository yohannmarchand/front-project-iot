<template>
  <div class="mt-4 relative">
    <div class="h-3 border border-zinc-500 rounded bg-gradient-to-r from-red-500 via-green-400 to-red-500" />
    <div
      class="absolute top-0 h-3 w-3 rounded ring-2 ring-white transition-[left]"
      :style="{ left: position+'%'}"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    rightValue: Number,
    range: Number
  },

  computed: {
    minValue() {
      return this.rightValue - this.range / 2
    },

    maxValue() {
      return this.rightValue + this.range / 2
    },

    position() {
      if (this.value < this.minValue) return 0
      if (this.value > this.maxValue) return 100

      return ((this.value - this.minValue) / (this.maxValue - this.minValue)) * 100
    },
  }
}
</script>
