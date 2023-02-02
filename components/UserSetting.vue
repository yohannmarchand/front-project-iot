<template>
  <div class="relative text-neutral-600">
    <div
      class="cursor-pointer"
      @click="openSetting = !openSetting"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 stroke-neutral-400 hover:scale-110 transition-all" :class="{'scale-110': openSetting}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <div
      v-if="openSetting"
      class="absolute z-10 drop-shadow-md mt-2 bg-neutral-50 border rounded p-4 top-full right-0"
    >
      <div class="space-y-3 text-sm">
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
              <template v-if="IS_LOADING">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6 animate-spin">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>
              </template>
              <template v-else-if="IS_CONNECTED">
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
        <div class="flex flex-col">
          <label class="mb-2">Select your tuning</label>
          <select v-model="tuning" class="border rounded px-2 py-1">
            <option
              v-for="[name, tuning] in Object.entries(tunings)"
              :key="tuning"
              :value="tuning"
            >
              {{ name }}
            </option>
          </select>
        </div>
        <SwitchInput v-model="isDetectingNote" label="Note detection" />
        <SwitchInput v-model="isListenMode" label="Listening Mode" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import tunings from "../content/tuning"
import SwitchInput from "../components/SwitchInput"

export default {
  name: "UserSetting",

  components: {
    SwitchInput
  },

  data() {
    return {
      ip: '172.20.10.2',
      tunings,
      openSetting: false,
    }
  },

  computed: {
    ...mapState('websocket', ['IS_CONNECTED', 'IS_LOADING']),

    isDetectingNote: {
      get: function () {
        return this.$store.state.userPreference.isDetectingNote
      },
      set: function (isDetectingNote) {
        this.$store.commit('userPreference/SET_IS_DETECTING_NOTE', isDetectingNote)
      },
    },

    isListenMode: {
      get: function () {
        return this.$store.state.userPreference.isListenMode
      },
      set: function (isListenMode) {
        this.$store.commit('userPreference/SET_IS_LISTEN_MODE', isListenMode)
      },
    },

    tuning: {
      get: function () {
        return this.$store.state.userPreference.tuning
      },
      set: function (tuning) {
        this.$store.commit('userPreference/SET_TUNING', tuning)
      },
    }
  },

  created() {
    this.$store.dispatch('websocket/connectToWebSocket', this.ip)
  },

  methods: {
    onChange() {
      this.$store.dispatch('websocket/connectToWebSocket', this.ip)
    }
  }
}
</script>
