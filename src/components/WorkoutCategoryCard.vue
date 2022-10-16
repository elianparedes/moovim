<template>
  <v-card :key="name" elevation="0" class="rounded-xl" color="transparent" @click="$emit('clicked', name)">
    <v-img
      class="pl-2 pr-16"
      style="width: 502px; height: 350px; border: red 2px"
      :src="image"
      :aspect-ratio="16 / 9"
      gradient="to right, #212121 0%, rgba(43, 43, 43, 1) 15%, rgba(43, 43, 43, 0.6) 100%"
    >
      <v-card-title class="font-weight-bold text-h3">{{ name }}</v-card-title>
      <v-card-text class="text-h6 font-weight-light pr-8">{{
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
  height: 50px;
}
</style>
