<template>
  <v-card :key="name" class="rounded-lg d-inline-block ma-8" elevation="0">
    <v-card-title class="text-h6 font-weight-regular pr-8">
      Ejercicio
    </v-card-title>
    <v-card-title class="font-weight-bold text-h3">{{ name }}</v-card-title>
    <v-card-title class="text-h6 font-weight-regular pr-8">{{
      muscle
    }}</v-card-title>
    <v-row no-gutters class="fill-height mb-6">
      <v-col :cols="2">
        <template v-for="(img, i) in images">
          <v-hover v-slot="{ hover }">
            <v-card class="mb-4" :width="width" :class="{ 'on-hover': hover }">
              <v-img
                class="pr-16 red"
                :src="img.src"
                :aspect-ratio="16 / 9"
                :width="width"
                :min-height="36"
              >
                <div class="align-self-center">
                  <v-btn
                    v-for="(icon, index) in icons"
                    :key="index"
                    :class="{ 'show-btns': hover }"
                    :color="'rgba(255, 255, 255, 0)'"
                    icon
                  >
                    <v-icon
                      :class="{ 'show-btns': hover }"
                      :color="'rgba(255, 255, 255, 0)'"
                    >
                      {{ icon }}
                    </v-icon>
                  </v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </template>
      </v-col>
      <v-col :cols="1"></v-col>
      <v-col :cols="8">
        <v-img
          class="pr-16"
          :src="image"
          :aspect-ratio="16 / 9"
          :width="width"
          gradient="to right, #212121, rgba(43, 43, 43, 0.356)"
        ></v-img>
      </v-col>
    </v-row>
    <v-card-title class="text-h6 font-weight-regular pr-8">{{
      desc
    }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-play"],
    images: [
      {
        src: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
      },
    ],
  }),
  name: "ExerciseDescription",
  props: ["name", "muscle", "desc", "image"],
};
</script>

<style scoped>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
