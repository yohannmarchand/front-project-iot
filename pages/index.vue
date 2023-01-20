<template>
  <div class="py-10 px-8 mx-auto rounded mt-16 border-8 ring-8 ring-neutral-50 border-neutral-100 max-w-4xl">
    <h1 class="text-3xl font-bold text-neutral-400">Accordeur de Guitare</h1>
    <div class="flex items-end">
      <div>
        <Guitar @click="(value) => onClick(value)"/>
      </div>

      <div class="space-y-10 w-full">
        <Accordeur class="max-w-[272px]" :rightValue="activeFrequency" />
        <div class="border-4 rounded border-neutral-500 pt-8 px-4 w-full">
          <div class="text-xl uppercase font-bold text-neutral-700">accordage</div>
          <div class="flex flex-col items-start mt-4 pb-2">
            <button
              v-for="[name, accordage] in Object.entries(accordages)"
              :key="name"
              class="text-lg text-neutral-500 hover:text-neutral-700 hover:text-xl"
            >
              {{ name }} : {{ accordage }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordeur from "../components/Accordeur";
import GuitarView from "../components/GuitarView"
import frequencies from '../content/frequency.js'

import accordages from "../content/accordage"

export default {
  components: {
    Accordeur,
    GuitarView,
  },

  data() {
    return {
      frequencies,
      accordages,
      activeFrequency: frequencies[0].frequency,
    }
  },

  methods: {
    onClick(value) {

    }
  }
}
</script>
