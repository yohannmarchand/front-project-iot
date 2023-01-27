<template>
  <div class="flex flex-col grow justify-end">
    <div class="text-center text-3xl text-zinc-400 font-bold">{{ input }}</div>
    <component
      :is="meter"
      :value="input"
      :rightValue="correctValue"
      :range="range"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FrenquencyMeter from "./FrequencyMeter";
import HorizontalMeter from "./HorizontalMeter"

export default {
  components: {
    HorizontalMeter,
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
    ...mapState('userPreference', ['meter']),

    correctValue() {
      return this.rightValue
    }
  },

  watch: {
    correctValue() {
      this.$store.commit('websocket/SET_INPUT', Math.ceil(this.correctValue) - (this.range / 2))
    }
  },
}
</script>
