<template>
  <v-fade-transition hide-on-leave>
    <div class="d-flex flex-column pb-16" style="gap: 64px; width: 50%">
      <template v-if="exercise">
        <div class="d-flex flex-column" style="gap: 16px">
          <div class="font-weight-bold text-h3">{{ name }}</div>
          <div class="text-h6">{{ exercise.detail }}</div>
        </div>

        <div class="d-flex" style="gap: 16px; height: 400px">
          <div v-if="images.length > 1" class="d-flex flex-column" style="gap: 16px; overflow-y: scroll">
            <div
              v-for="n in 3"
              :key="n"
              style="height: 75px; width: 75px; background-color: #252525"
              class="rounded-lg"
            ></div>
          </div>
          <v-img
            class="rounded-lg"
            style="background-color: gray; filter: grayscale(100%)"
            :aspect-ratio="16 / 9"
            contain
            :src="images ? images[0].url : ''"
          ></v-img>
        </div>

        <div>
          <div class="font-weight-bold text-h6 mb-2">Posición inicial</div>

          <div>
            {{ exercise.metadata.pos }}
          </div>
        </div>

        <div>
          <div class="font-weight-bold text-h6 mb-2">Ejecución</div>

          <div class="text-body-1">
            {{ exercise.metadata.procedure }}
          </div>
        </div>
      </template>
    </div></v-fade-transition
  >
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore.js";
import { useExerciseImageStore } from "@/stores/exerciseImageStore.js";

export default {
  props: ["name", "id"],
  data() {
    return {
      exercise: null,
      images: null,
    };
  },
  created() {
    this.fetchExercise();
    this.fetchExerciseImages();
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $getExercise: "getExercise",
    }),
    ...mapActions(useExerciseImageStore, {
      $getAllExerciseImages: "getAllExerciseImages",
    }),
    fetchExercise() {
      this.$getExercise({ id: this.id }).then((exercise) => {
        this.exercise = exercise;
      });
    },
    fetchExerciseImages() {
      this.$getAllExerciseImages(this.id).then(
        (images) => (this.images = images.content)
      );
    },
  },
};
</script>
