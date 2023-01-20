<template>
  <div class="flex flex-col space-y-16">
    <div class="text-center text-3xl text-zinc-400 font-bold">{{ input }}</div>

    <FrenquencyMeter
      :value="value"
      :rightValue="correctValue"
      :range="range"
    />

    <!-- Test: wait for reel data -->
   <!-- <div class="mt-6 mx-auto">
      <input v-model="input" type="range" :min="rightValue - (range / 2)" :max="(range / 2) + rightValue">
    </div>
    <div class="text-center">
      Value : {{ input }}
    </div> -->
  </div>
</template>

<script>
import FrenquencyMeter from "./FrequencyMeter";
export default {
  components: {
    FrenquencyMeter
  },

  props: {
    rightValue: Number
  },

  data() {
    return {
      input: 0,
      range: 200,
    }
  },

  computed: {
    value() {
      return Math.trunc(this.input);
    },

    correctValue() {
      return this.rightValue
    }
  },

  watch: {
    correctValue() {
      this.input = Math.ceil(this.correctValue) - (this.range / 2)
    }
  },
}
</script>
