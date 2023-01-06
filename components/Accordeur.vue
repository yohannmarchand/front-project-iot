<template>
  <div class="flex flex-col space-y-4 w-full">
    <NoteMeter
      :value="(input / rightValue)"
    />

    <div class="mt-6 mx-auto">
      <input v-model="input" type="range" :min="0" :max="rightValue * 2">
    </div>
  </div>
</template>

<script>
import NoteMeter from "./NoteMeter";
export default {
  components: {
    NoteMeter
  },

  data() {
    return {
      input: 0,
      rightValue: 440
    }
  }
}
</script>
