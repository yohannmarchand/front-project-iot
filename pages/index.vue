<template>
  <div class="pt-10 px-20 flex flex-col items-center">
    <h1 class="font-semi-bold text-4xl">Accordeur de guitare</h1>
    <Accordeur class="mt-6"/>
  </div>
</template>

<script>
import Accordeur from "../components/Accordeur";

export default {
  name: 'IndexPage',
  components: {
    Accordeur
  }
}
</script>
