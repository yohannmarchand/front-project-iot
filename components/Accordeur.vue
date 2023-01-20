<template>
  <div class="flex flex-col space-y-4">
    <FrenquencyMeter
      :value="Math.trunc(input)"
      :rightValue="rightValue"
      :range="range"
    />

    <!-- Test: wait for reel data -->
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
      range: 400,
      url: 'ws://172.20.10.7/ws',
    }
  },

  watch: {
    rightValue() {
      this.input = Math.ceil(this.rightValue) - (this.range / 2)
    }
  },

  created() {
    if (this.url) {
      const socket = new WebSocket(this.url)

      socket.addEventListener('open', (event) => {
        console.log('Hello Server!');
      });

      socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);

        if (event.data.frequency) {
          this.input = event.data.frequency
        }
      });
    }
  },

}
</script>
