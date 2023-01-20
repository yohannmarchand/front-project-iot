<template>
  <div class="flex flex-col space-y-16">
    <div class="text-center text-3xl text-zinc-400 font-bold">{{ input }}</div>

    <FrenquencyMeter
      :value="value"
      :rightValue="correctValue"
      :range="range"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      range: 200,
    }
  },

  computed: {
    ...mapState('websocket', ['input']),

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
