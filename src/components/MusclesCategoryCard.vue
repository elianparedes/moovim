<template>
  <v-card
    :key="name"
    class="rounded-xl py-4 pl-2 d-flex reactive"
    elevation="0"
    :ripple="false"
    @click="$emit('clicked', name)"
  >
    <v-card-title class="font-weight-regular text-h6">{{ name }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "StagesCategoryCard",
  props: ["name", "desc", "image"],
};
</script>

<style scoped>
.reactive {
  transition: all 150ms ease-in-out;
}

.reactive:hover {
  background-color: #252525;
}

.container {
  height: 50px;
}

.v-responsive__sizer {
  padding-bottom: 0px !important;
}
</style>
