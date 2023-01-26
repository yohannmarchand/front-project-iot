<template>
  <div class="mt-16 max-w-[272px] mx-auto">
    <div class="relative rounded-full">
      <div
        v-for="i in 9"
        class="absolute w-0.5 h-4 rounded first:h-6 bg-black [&:nth-child(5)]:h-6 last:h-6 first:w-1 bg-black [&:nth-child(5)]:w-1 [&:nth-child(5)]:-ml-1 last:w-1"
        :style="getPosition(i)"
      />
    </div>

    <div class="-ml-1 mt-4 mx-auto">
      <div
        class="mx-auto h-14 w-1 transition-transform origin-bottom"
        :class="meterColor"
        :style="{
          transform: `rotate(${angle - 90}deg)`
        }"
      />
      <div
        class="h-3 w-3 -mt-1.5 rounded-full bg-black mx-auto bg-green-400"
        :class="meterColor"
      />
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
      offset: 10,
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

    meterColor() {
      if (this.angle > 90 - this.offset && this.angle < 90 + this.offset) {
        return 'bg-green-400'
      } else if (45 < this.angle && this.angle < 135) {
        return 'bg-orange-400'
      } else {
        return 'bg-red-400'
      }
    },
  },

  watch: {
    rightValue() {
      this.value = this.minValue
    }
  },

  methods: {
    getPosition(index) {
      const radius = 272 / 2
      const elCount = 10
      const angle = (Math.PI / elCount) * index

      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      return {
        bottom: y - radius + 'px',
        left: x + 'px'
      }
    }
  }
}
</script>
