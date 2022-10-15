<template>
  <div id="nav">
    <SelectButton
      v-for="(chip, index) in chipContent"
      :key="chip"
      :vue-style=vueStyle
      @click="changeSelectedChip(index); $emit('newOrder',chipContent[index])"
      :toggle="chipStatus[index].toggle"
      >{{ chip }}</SelectButton
    >
  </div>
</template>

<script>
import SelectButton from "@/components/SelectButton";

export default {
  name: "SwitchButton",
  components: { SelectButton },
  props: {
    chipContent: {
      type: Array,
      required: true,
    },
    vueStyle:{
      type: String,
      required: false,
      default: "mx-1 px-16 py-4 font-weight-regular text-body-2"
    },
    selectedChip: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      chipStatus: [],
      indexChip : this.selectedChip
    };
  },
  methods: {
    changeSelectedChip(index) {
      this.chipStatus[this.indexChip].toggle = false;
      this.$emit('switch',index)
      this.indexChip = index
      this.chipStatus[index].toggle = true;
    },

  },
  created() {
    for (let i = 0; i < this.chipContent.length; i++) {
      console.log("Item" + ' ' + i)
      this.chipStatus.push({ toggle: false });
    }
    this.chipStatus[this.selectedChip].toggle = true;
  }
};
</script>

<style scoped></style>
