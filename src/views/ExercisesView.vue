<template>
  <v-slide-x-transition hide-on-leave>
    <div
      class="d-flex pl-8"
      v-if="exercises"
      style="gap: 32px; height: calc(100vh - 128px)"
    >
      <div class="d-flex flex-column" style="gap: 16px; width: 50%; flex: 50%">
        <v-item-group
          mandatory
          v-model="selected"
          class="d-flex flex-column px-4 pt-1"
          style="gap: 16px; overflow-y: auto"
        >
          <v-item
            v-slot="{ active, toggle }"
            v-for="exercise in exercises"
            :key="exercise.id"
          >
            <SelectableExerciseSummaryCard
              :exercise="exercise.name"
              :category="exercise.detail"
              :id="exercise.id"
              :active="active"
              :click="toggle"
            ></SelectableExerciseSummaryCard>
          </v-item>
        </v-item-group>
      </div>

      <ExerciseView
        v-if="selectedExercise"
        :name="selectedExercise.name"
        :id="selectedExercise.id"
        :key="selectedExercise.id"
        class="px-8"
        style="flex: 50%; overflow-y: auto"
      /></div
  ></v-slide-x-transition>
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore.js";
import SelectableExerciseSummaryCard from "@/components/SelectableExerciseSummaryCard.vue";
import ExerciseView from "./ExerciseView.vue";

export default {
  data() {
    return {
      exercises: null,
      selectedExercise: null,
      images: [],
      selected: null,
    };
  },
  created() {
    this.fetchAllExercises();
  },
  watch: {
    selected: function (val) {
      this.selectedExercise = this.exercises[val];
    },
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $getAllExercises: "getAllExercises",
    }),
    fetchAllExercises() {
      this.$getAllExercises().then((exercises) => {
        this.exercises = exercises.content;
      });
    },
  },
  components: { SelectableExerciseSummaryCard, ExerciseView },
};
</script>
