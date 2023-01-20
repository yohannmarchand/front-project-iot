<template>
  <div>
    <div>
      <Guitar @click="(value) => onClick(value)"/>
    </div>
  </div>
</template>

<script>
import Guitar from './Guitar'

export default {
  name: "GuitarView",

  components: {
    Guitar,
  },

  methods: {
    onClick(value) {
      this.$emit('change', value)
    }
  }
}
</script>
