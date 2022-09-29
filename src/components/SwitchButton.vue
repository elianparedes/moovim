<template>
  <v-container>
    <v-chip v-for="(chip,index) in chips" :key="chip.text" v-bind="{outlined: !chip.toggle}" color="white"
            :class="{'hidden-border': chip.toggle}" @click="changeSelectedChip(index)" class="mx-1 px-16 py-4 font-weight-regular text-body-2" :ripple="false">
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
    }
  },
}
</script>

<style scoped>
.hidden-border{
  border-width: thin;
  border-style: solid;
}
</style>