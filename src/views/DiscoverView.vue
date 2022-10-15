<template>
<div >

    <div style="height: 80px">
      <v-spacer class="my-8"></v-spacer>
      <div class="font-weight-thin text-h6 d-flex row">
        <span class="mx-2">Rutinas de otros usuarios</span>
        <v-spacer></v-spacer>
        <SwitchButton
          class="mx-6"
          :chip-content="['Populares', 'Verificados', 'Recientes']"
          :vue-style="'mx-1'"
          v-on:newOrder="$event==='Recientes'? getOrdered('date', 'desc') : $event==='Populares'? getOrdered('score', 'desc'): getAllRoutines()"
        ></SwitchButton>
      </div>
    </div>
    <div class="mr-6">
      <v-carousel hide-delimiters height="100%" cycle show-arrows-on-hover>
        <v-carousel-item v-for="i in Math.ceil(routines.length / 6)" :key="i" height="100%">
          <v-row
            v-for="k in [(i - 1) * 2, (i - 1) * 2 + 1]"
            :key="k"

          >
            <v-col v-for="routine in getArray(k)" :key="routine.id" md="4" xs="3">
              <WorkoutResultCard
                v-if="routine"
                :name="routine.name"
                :desc="routine.detail"
                :image=routine.metadata.image
                :author="routine.user.username"
                :avatar="routine.avatar"
                :verified="routine.verified"
                :stars="routine.score"
                :bookmarks="routine.bookmarks"
              />
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  <div class="font-weight-thin text-h6 my-2">
    <span class="mx-2">Ejercicios</span>
    </div>
  <div>
      <ExerciseSummaryCard v-for="exercise in exercises" :key="exercise.name" category="exercise.type" :exercise="exercise.name" class="my-4 mr-6"></ExerciseSummaryCard>
    </div>
  </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useExerciseStore } from "@/stores/exerciseStore";
export default {
  name: "DiscoverView",
  components: { ExerciseSummaryCard, WorkoutResultCard, SwitchButton },
  routines: [],
  exercises:[],
  data: () => {
    return {
      routines: [],
      carousel: 0,
      exercises:[],
    };
  },
  methods: {
    getArray(k) {
      return [0, 0, 0].map(
        (a, b) => this.routines.slice(k * 3, (k + 1) * 3)[b] || 0
      );
    },
    getOrdered(orderBy, direction){
      this.$getRoutineOrdered(orderBy,direction)
      .then((routines) => {
        this.routines = routines.content;
      })
    },
    getAllRoutines(){
      this.$getAllRoutine()
      .then((routines) => {
        this.routines = routines.content;
      })
    },
    ...mapActions(useRoutineStore, {
      $getAllRoutine: "getAllRoutine",
      $getRoutineOrdered : "getRoutineOrdered"
    }),
    ...mapActions(useExerciseStore, { $getAllExercises: "getAllExercises" }),
  },
  created() {
    this.getOrdered('score', 'desc')
    this.$getAllExercises()
    .then((exercises) => {
      this.exercises = exercises.content
    })
  },
};
</script>

<style scoped></style>
