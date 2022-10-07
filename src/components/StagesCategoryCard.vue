<template>
  <v-card
    :key="name"
    class="rounded-xl"
    elevation="0"
    content-class="no-padding-bottom"
  >
    <v-img
      class="pl-2 pr-16"
      style="width: 502px; height: 150px"
      :src="image"
      :aspect-ratio="16 / 9"
      :width="width"
      gradient="to right, #212121 0%, rgba(43, 43, 43, 1) 25%, rgba(43, 43, 43, 0.3) 100%"
    >
      <v-card-title class="font-weight-bold text-h4">{{ name }}</v-card-title>
      <v-card-text class="text-subtitle-1 font-weight-light pr-8">{{
        desc
      }}</v-card-text>
    </v-img>
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
