<template>
  <div
    v-if="exercise"
    class="d-flex flex-column pb-16"
    style="gap: 64px; width: 50%"
  >
    <div class="d-flex flex-column" style="gap: 16px">
      <div class="font-weight-bold text-h3">{{ name }}</div>
      <div class="text-h6">{{ exercise.detail }}</div>
    </div>

    <div class="d-flex" style="gap: 16px; height: 400px">
      <div class="d-flex flex-column" style="gap: 16px; overflow-y: scroll">
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
        src="https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Bench-Press_0316b783-43b2-44f8-8a2b-b177a2cfcbfc_600x600.png?v=1612137800"
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
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore.js";

export default {
  props: ["name", "id"],
  data() {
    return {
      exercise: null,
      images: [],
    };
  },
  created() {
    this.fetchExercise();
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $getExercise: "getExercise",
    }),
    fetchExercise() {
      this.$getExercise({ id: this.id }).then((exercise) => {
        this.exercise = exercise;
      });
    },
  },
};
</script>
