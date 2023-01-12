<template>
  <div>
    <div class="relative mt-8 flex rounded-full">
      <div
        v-for="i in 11"
        class="absolute w-0.5 h-4 rounded first:h-6 bg-black [&:nth-child(6)]:h-6 last:h-6 first:w-1 bg-black [&:nth-child(6)]:w-1 last:w-1"
        :style="getPosition(i)"
      />
    </div>

    <div class="-ml-1 mt-4">
      <div
        class="mx-auto h-24 w-1 transition-transform bg-green-400 origin-bottom"
        :style="{
          transform: `rotate(${angle - 90}deg)`
        }"
      />
      <div class="h-3 w-3 -mt-1.5 rounded-full bg-black mx-auto bg-green-400"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    rightValue: Number,
    range: Number
  },

  data() {
    return {
      radius: 150
    }
  },

  computed: {
    angle() {
      if (this.value < this.minValue) return -0
      if (this.value > this.maxValue) return 0

      return ((this.value - this.minValue) / (this.maxValue - this.minValue)) * 180
    },

    minValue() {
      return this.rightValue - this.range / 2
    },

    maxValue() {
      return this.rightValue + this.range / 2
    },
  },

  watch: {
    rightValue() {
      this.value = this.minValue
    }
  },

  methods: {
    getPosition(index) {
      const elCount = 12
      const angle = (Math.PI / elCount) * index

      const x = this.radius * Math.cos(angle)
      const y = this.radius * Math.sin(angle)

      return {
        bottom: y - this.radius + 'px',
        left: x + this.radius / 2 - 16 + 'px'
      }
    }
  }
}
</script>
