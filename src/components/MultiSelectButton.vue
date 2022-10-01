<template>
  <v-container>
    <SelectButton v-for="(chip,index) in chipContent" :key="chip" :toggle="chipStatus[index].toggle"
                  @click="updateChip(index)" vue-style="mx-1 px-4 py-1 font-weight-light text-caption" size="large">{{chip}}</SelectButton>
  </v-container>
</template>

<script>
import SelectButton from "@/components/SelectButton";

export default {
  name: "MultiSelectButton",
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
  }
    }
  ,
  methods: {
    updateChip(index) {
      console.log(index)
      console.log(this.chipStatus[index].toggle)
      this.chipStatus[index].toggle = !this.chipStatus[index].toggle
      console.log(this.chipStatus[index].toggle)
    },
  },
  created(){
    for(let i = 0 ; i < this.chipContent.length ; i++){
      this.chipStatus.push({toggle: false})
    }
  }
}
</script>

<style scoped>

</style>