<template>
  <div class="w-full">
    <div class="relative mt-8 flex rounded-full">
      <div
        v-for="i in 11"
        class="absolute w-0.5 h-4 rounded first:h-6 bg-black [&:nth-child(6)]:h-6 last:h-6 first:w-1 bg-black [&:nth-child(6)]:w-1 last:w-1"
        :style="getPosition(i)"
      />
    </div>

    <div class="-ml-0.5 mt-4">
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
    range: Number,
  },

  data() {
    return {
      radius: 150
    }
  },

  computed: {
    angle() {
      return (this.value / 2) * 180;
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
        left: x + 48 + this.radius * 2 + 'px'
      }
    }
  }
}
</script>
