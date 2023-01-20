<template>
  <div class="space-y-3">
    <div>
      <label>Connection to Esp</label>
      <div class="flex items-center">
        <input
          type="text"
          v-model="ip"
          class="grow border border-neutral-400 rounded px-2 py-1"
          @input="onChange"
          placeholder="Your ip"
        >
        <div class="ml-1">
          <template v-if="isLoading">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6 animate-spin">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
            </svg>
          </template>
          <template v-else-if="isConnected">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#22c55e"
                 class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          </template>
          <button
            v-else
            @click="onChange"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ef4444"
                 class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>

          </button>
        </div>
      </div>
    </div>
    <div>
      <SwitchInput v-model="isDectetingNote" label="Tone auto detection" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SwitchInput from "../components/SwitchInput"

export default {
  name: "UserSetting",

  components: {
    SwitchInput
  },

  data() {
    return {
      ip: '172.20.10.2',
      isDectetingNote: false,
    }
  },

  computed: {
    ...mapState('websocket', ['isConnected', 'isLoading']),
  },

  methods: {
    onChange() {
      this.$store.dispatch('websocket/connectToWebSocket', this.ip)
    }
  }
}
</script>
