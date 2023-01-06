<template>
  <div class="pt-10 px-20 flex flex-col items-center">
    <h1 class="font-semi-bold text-4xl">Accordeur de guitare</h1>
    <Accordeur
      class="mt-6"
      :rightValue="activeFrequency"
    />

    <select v-model="activeFrequency">
      <option
        v-for="{ name, frequency } in frequencies"
        :value="frequency"
      >
        {{ name }} ({{frequency}}Hz)
      </option>
    </select>
  </div>
</template>

<script>
import Accordeur from "../components/Accordeur";
import frequencies from '../content/frequency.js'

export default {
  components: {
    Accordeur
  },

  data() {
    return {
      frequencies,
      activeFrequency: frequencies[0].frequency,
    }
  }
}
</script>
