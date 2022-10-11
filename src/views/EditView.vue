<template>
  <div class="d-flex flex-column px-4" style="gap: 32px" v-if="!loading">
    <v-card elevation="0" class="rounded-xl" color="transparent">
      <v-img
        class="pl-4 pr-16 pt-4"
        style="width: 100%; height: 350px; border: red 2px"
        :src="routine.metadata.image"
        :aspect-ratio="16 / 9"
        gradient="to right, #212121 0%, rgba(43, 43, 43, 1) 15%, rgba(43, 43, 43, 0.6) 50%"
      >
        <v-card-title class="font-weight-bold text-h3">{{
          routine.name
        }}</v-card-title>
        <v-card-text class="text-h6 font-weight-light pr-8">{{
          routine.detail
        }}</v-card-text>
      </v-img>
    </v-card>
    <div>
      <v-chip class="px-10" color="white" outlined>
        <v-icon left small class="material-icons-round">add</v-icon>
        Crear grupo
      </v-chip>
    </div>
    <div class="d-flex">
      <div style="width: 50%">
        <v-item-group v-model="selected">
          <div
            v-for="(cycle, n) in cycles"
            :key="n"
            class="d-flex flex-column mb-4"
          >
            <v-row class="text-body-1 mb-4 pr-4">
              <v-col>
                <div>
                  {{ cycle.name
                  }}<span>
                    <v-icon size="18px" class="ml-4 material-icons-round"
                      >loop</v-icon
                    >
                    {{ cycle.repetitions }}
                  </span>
                </div>
              </v-col>

              <v-btn icon>
                <v-icon class="material-icons-round">edit</v-icon>
              </v-btn>
              <v-btn icon class="ml-4">
                <v-icon class="material-icons-round">add</v-icon>
              </v-btn>
            </v-row>

            <v-item
              v-slot="{ active, toggle }"
              v-for="obj in cycle.exercises"
              :key="obj.order"
            >
              <ExerciseViewCard
                :name="obj.exercise.name"
                :detail="obj.exercise.detail"
                :duration="obj.duration"
                :weight="obj.weight"
                :repetitions="obj.repetitions"
                class="mb-4 rounded-xl"
                :click="
                  () => {
                    toggle();
                    selectExercise({
                      name: obj.exercise.name,
                      detail: obj.exercise.detail,
                      duration: obj.duration,
                      weight: obj.weight,
                      repetitions: obj.repetitions,
                    });
                  }
                "
                :active="active"
              />
            </v-item>
          </div>
        </v-item-group>
      </div>
      <div class="pa-12" style="width: 50%">
        <v-slide-y-transition>
          <ExerciseSet
            v-if="selected !== undefined"
            style="position: sticky; top: 128px"
            :name="selectedExercise.name"
            :detail="selectedExercise.detail"
            :repetitions="selectedExercise.repetitions"
            :weigth="selectedExercise.weigth"
            :duration="selectedExercise.duration"
          />
        </v-slide-y-transition>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";

import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useRoutineCycleStore } from "@/stores/routineCycleStore";
import { useExerciseCycleStore } from "@/stores/exerciseCycleStore";
import ExerciseSet from "@/components/ExerciseSet.vue";

export default {
  name: "RoutinesView",
  components: {
    ExerciseViewCard,
    ExerciseSet,
  },
  props: ["name", "id"],
  data: () => ({
    loading: false,
    routine: null,
    cycles: null,
    selectedExercise: null,
    selected: undefined,
  }),
  created() {
    this.fetchRoutine(this.id);
  },
  methods: {
    ...mapActions(useRoutineStore, { $getRoutine: "getRoutine" }),
    ...mapActions(useRoutineCycleStore, {
      $getAllRoutineCycles: "getAllRoutineCycles",
    }),
    ...mapActions(useExerciseCycleStore, {
      $getAllExerciseCycles: "getAllExerciseCycles",
    }),
    fetchRoutine(routineId) {
      this.loading = true;
      this.$getRoutine(routineId)
        .then((routine) => {
          console.log(routine);
          this.routine = routine;
          return routine.id;
        })
        .then((id) => {
          this.fetchRoutineCycles(id);
          this.loading = false;
        });
    },
    fetchRoutineCycles(routineId) {
      this.$getAllRoutineCycles(routineId).then((cycles) => {
        Promise.all(
          cycles.content.map((cycle) =>
            this.$getAllExerciseCycles(cycle.id).then((exercises) => {
              cycle["exercises"] = exercises.content;
              return cycle;
            })
          )
        ).then((cycles) => {
          console.log(cycles);
          this.cycles = cycles;
        });
      });
    },
    fetchCycleExercises(cycleId) {
      this.$getAllExerciseCycles(cycleId).then((exercises) => {
        this.exercises[cycleId] = exercises.content;
      });
    },
    selectExercise(exercise) {
      this.selectedExercise = { ...exercise };
    },
  },
};
</script>
