<template>
  <v-card :key="name" class="rounded-lg d-inline-block ma-8" elevation="0">
    <v-img
      class="pr-16"
      :src="image"
      :aspect-ratio="16 / 9"
      :width="width"
      gradient="to right, #212121, rgba(43, 43, 43, 0.356)"
    >
      <v-card-title class="font-weight-bold text-h3">{{ name }}</v-card-title>
      <v-card-text class="text-h6 font-weight-regular pr-8">{{
        desc
      }}</v-card-text>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "WorkoutCategoryCard",
  props: ["name", "desc", "image"],
};
</script>

<style>
.container {
  height: 100px;
  padding: 600px;
}
</style>
