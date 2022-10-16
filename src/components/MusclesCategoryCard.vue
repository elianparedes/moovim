<template>
  <v-card :key="name" class="rounded-xl py-4 pl-2" elevation="0" width="500px" @click="$emit('clicked', name)">
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
.container {
  height: 50px;
}

.v-responsive__sizer {
  padding-bottom: 0px !important;
}
</style>
