<template>
  <v-slide-x-transition hide-on-leave appear>
    <div v-if="exercises && exercises.length == 0">
      <div style="background-color: #1e1e1e" class="rounded-xl pa-16 mr-8">
        Aún no has creado ningún ejercicio
      </div>
    </div>
    <div
      class="d-flex pl-8"
      v-if="exercises"
      style="gap: 32px; height: calc(100vh - 128px)"
    >
      <v-snackbar v-model="success" rounded="lg">
        Ejercicio agregado

        <template>
          <v-icon
            class="float-right material-icons-round"
            size="18"
            color="white"
            >check_circle</v-icon
          >
        </template>
      </v-snackbar>

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
              @finish="changeSuccess()"
              :exercise="exercise.name"
              :category="exercise.detail"
              :id="exercise.id"
              :active="active"
              :click="toggle"
            ></SelectableExerciseSummaryCard>
          </v-item>
        </v-item-group>
      </div>

      <v-fade-transition hide-on-leave appear>
        <ExerciseView
          v-if="selectedExercise"
          :name="selectedExercise.name"
          :id="selectedExercise.id"
          :key="selectedExercise.id"
          class="px-8"
          style="flex: 50%; overflow-y: auto"
          @delete="showDeleted"
        />
      </v-fade-transition></div
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
      success: false,
      exercises: [],
      selectedExercise: null,
      images: [],
      selected: null,
    };
  },
  created() {
    this.getAllExercisesWrapper();
  },
  watch: {
    selected: function (val) {
      this.selectedExercise = this.exercises[val];
    },
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $getPageExercise: "getPageExercise",
    }),
    getAllExercisesWrapper() {
      this.getAllExercises(0);
    },
    getAllExercises(page) {
      this.$getPageExercise(page)
        .then((exercise) => {
          this.exercises = this.exercises.concat(exercise.content);
          return exercise.isLastPage;
        })
        .then((isLast) => {
          if (!isLast) {
            this.getAllExercises(page + 1);
            return;
          }
        });
    },
    changeSuccess() {
      this.success = true;
    },
    showDeleted(deletedExercise) {
      this.exercises.splice(
        this.exercises.findIndex(
          (exercise) => exercise.id === deletedExercise.id
        ),
        1
      );
    },
  },
  components: { SelectableExerciseSummaryCard, ExerciseView },
};
</script>
