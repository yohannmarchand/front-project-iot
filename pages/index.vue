<template>
  <div class="py-10 px-8 text-neutral-400 mx-auto rounded mt-16 border-8 ring-8 ring-neutral-50 border-neutral-100 max-w-4xl">
    <div class="flex justify-between items-end">
      <h1 class="text-3xl font-bold text-neutral-400">Guitar Tuner</h1>
      <div class="flex space-x-5">
        <MeterSelector />
        <UserSetting />
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div>
        <Guitar @click="(value) => onClick(value)"/>
      </div>

      <div
        class="flex flex-col space-y-10 w-full mt-10"
        :class="activeNote && !isLoading ? 'justify-between' : 'justify-end'"
      >
        <SelectingNote :note="frequencies.find(({ frequency }) => frequency == activeNote)"/>

        <Accordeur
          v-if="activeNote && !isLoading && !isListenMode"
          class="mt-16"
          :rightValue="activeNote"
        />
        <div
          v-if="isLoading"
          class="flex flex-col items-center fill-neutral-500 text-neutral-500 mt-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-40 h-40 animate-pulse">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
          </svg>
          <div class="text-xl">Trying to connect the tuner...</div>
        </div>
        <div class="rounded bg-neutral-50 shadow-lg pt-6 px-4 mt-8">
          <div class="text-xl uppercase text-neutral-500 tracking-widest font-bold">tunings</div>
          <div class="flex flex-col items-start mt-4 pb-2 max-h-40 overflow-auto">
            <button
              v-for="[name, tuning] in Object.entries(tunings)"
              :key="name"
              class="hover:text-neutral-600 hover:text-xl"
              @click="activeTuning = tuning"
              :class="activeTuning === tuning ? 'text-neutral-600 text-xl' : 'text-lg '"
            >
              {{ name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordeur from "../components/Accordeur";
import UserSetting from "../components/UserSetting"
import MeterSelector from "../components/MeterSelector"

import frequencies from '../content/frequency.js'
import tunings from "../content/tuning"

import { mapState } from 'vuex'

export default {
  components: {
    Accordeur,
    MeterSelector,
    UserSetting,
  },

  data() {
    return {
      frequencies,
      tunings,
      activeFrequency: null,
      openSetting: false,
    }
  },

  computed: {
    ...mapState('websocket', ['isConnected', 'isLoading', "note"]),
    ...mapState('userPreference', ['isListenMode', 'isDetectingNote']),

    activeTuning: {
      get: function () {
        return this.$store.state.userPreference.tuning
      },
      set: function (tuning) {
        this.$store.commit('userPreference/SET_TUNING', tuning)
      },
    },

    activeNote() {
      return this.isDetectingNote ? frequencies.find(({ name }) => name == this.note).frequency : this.activeFrequency
    }
  },

  methods: {
    onClick(value) {
      this.activeFrequency = this.frequencies.find(({ name }) => name === this.activeTuning[value]).frequency
    },
  }
}
</script>
