<template>
  <div class="relative">
    <div
      class="cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-10 w-10 stroke-neutral-400 hover:scale-110 transition-all" :class="{'scale-110': isOpen}">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
      </svg>
    </div>
    <div
      v-if="isOpen"
      class="absolute z-10 mt-2 drop-shadow-md rounded top-full right-0 w-40 w-auto"
    >
      <div class="grid grid-flow-col grid-cols-2 w-40">
        <div
          v-for="{name , component} in meters"
          :key="name"
          class="border transition-all rounded bg-neutral-50 text-xs flex items-center hover:scale-110 w-20 h-20 truncate cursor-pointer"
          :class="{ 'border-neutral-500': meter === component}"
          @click="$store.commit('userPreference/SET_METER', component)"
        >
          <div class="text-center w-full">{{ name }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isOpen: false,
      meters: [
        { name: 'Horizontal', component: 'HorizontalMeter' },
        {  name: 'Circle', component: 'FrequencyMeter' }
      ]
    }
  },

  computed: {
    ...mapState('userPreference', ['meter'])
  }
}
</script>
