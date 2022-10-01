<template>
  <v-container>
    <SelectButton v-for="(chip,index) in chipContent" :key="chip" vue-style="mx-1 px-16 py-4 font-weight-regular text-body-2"
                  @click="changeSelectedChip(index)" :toggle="chipStatus[index].toggle">{{ chip }}</SelectButton>
  </v-container>
</template>

<script>
import SelectButton from "@/components/SelectButton";
export default {
  name: "SwitchButton",
  components: {SelectButton},
  props: {
    chipContent: {
      type: Array,
      required: true
    }
  },
  data() {
    return{
      chipStatus: [],
      selectedChip: 0
    }
  },
  methods: {
    changeSelectedChip(index) {
      this.chipStatus[this.selectedChip].toggle = false;
      this.selectedChip = index;
      this.chipStatus[this.selectedChip].toggle = true;
    }
  },
  created(){
    for(let i = 0 ; i < this.chipContent.length ; i++){
      this.chipStatus.push({toggle: false})
    }
    this.chipStatus[0].toggle = true
  }
}
</script>

<style scoped>

</style>