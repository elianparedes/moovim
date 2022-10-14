<template>
  <v-chip
    color="gray"
    :text-color="this.toggle ? 'black' : 'white'"
    :class="[{ 'hidden-border': this.toggle }, vueStyle]"
    :ripple="false"
    v-bind="[{ outlined: !this.toggle }]"
    @click="clickHandler"
  >
    <v-icon v-bind="[{ small: true }, { left: true }]"
      ><slot name="icon"></slot
    ></v-icon>
    <slot> </slot>
  </v-chip>
</template>

<script>
export default {
  name: "SelectButton",
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    vueStyle: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: false,
    },
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    },
  },
  computed: {},
};
</script>

<style scoped>
.hidden-border {
  border-width: thin;
  border-style: solid;
  background-color: white !important;
}
</style>
