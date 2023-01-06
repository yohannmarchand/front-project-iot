<template>
  <div class="flex flex-col space-y-4">
    <FrenquencyMeter
      :value="input"
      :rightValue="rightValue"
      :range="range"
    />

    <div class="mt-6 mx-auto">
      <input v-model="input" type="range" :min="rightValue - (range / 2)" :max="(range / 2) + rightValue">
    </div>
    <div class="text-center">
      Value : {{ input }}
    </div>
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
      range: 800
    }
  }
}
</script>
