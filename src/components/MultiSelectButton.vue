<template>
  <v-container>
    <v-chip v-for="(chip,index) in chips" :key="chip.text" v-bind="chipProps(index)" color="white"
            @click="updateChip(index)" class="mx-1 px-4 py-1 font-weight-light x-small text-caption" :ripple="false">
      {{ chips[index].text }}
    </v-chip>
  </v-container>
</template>

<script>
export default {
  name: "MultiSelectButton",
  data() {
    return {
      chips: [
        {text: "Explorar", toggle: false},
        {text: "Descubrir", toggle: false},
        {text: "Descubrir", toggle: false},
        {text: "Descubrir", toggle: false},
        {text: "Descubrir", toggle: false}
      ]
    }
  },
  methods: {
    updateChip(index) {
      this.chips[index].toggle = !this.chips[index].toggle
    },
    chipProps(index) {
      if (this.chips[index].toggle) {
        return {
          outlined: false,
        }
      }
      return {
        outlined: true,
      }
    }
  },
}
</script>
