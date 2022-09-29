<template>
  <v-container>
    <v-chip v-for="(chip,index) in chips" :key="chip.text" v-bind="chipProps(index)" color="white"
            @click="changeSelectedChip(index)" class="mx-1 px-16 py-4 font-weight-regular text-body-2" :ripple="false">
      {{ chips[index].text }}
    </v-chip>
  </v-container>
</template>

<script>
export default {
  name: "SwitchButton",
  data() {
    return {
      selectedChip: 0,
      chips: [
        {text: "Explorar", toggle: true},
        {text: "Descubrir", toggle: false}
      ]
    }
  },
  methods: {
    changeSelectedChip(index) {
      this.chips[this.selectedChip].toggle = false;
      this.selectedChip = index;
      this.chips[this.selectedChip].toggle = true;
    },
    chipProps(index) {
      if (this.chips[index].toggle) {
        return {
          outlined: false
        }
      }
      return {
        outlined: true
      }
    }
  },
}
</script>