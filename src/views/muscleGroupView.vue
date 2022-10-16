<template>
    <div>
      <div style="height: 80px">
        <v-spacer class="my-8"></v-spacer>
        <div class="font-weight-thin text-h6 d-flex row">
          <span class="mx-2">Ejercicios de {{this.$route.query.query}}</span>
        </div>
      </div>
      <div>
        <ExerciseSummaryCard
          v-for="exercise in exercises"
          :key="exercise.name"
          :category="exercise.detail"
          :exercise="exercise.name"
          class="my-4 mr-6"
        ></ExerciseSummaryCard>
      </div>
    </div>
  </template>
  
  <script>
  import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
  import { mapActions } from "pinia";
  import { useExerciseStore } from "@/stores/exerciseStore";
  export default {
    name: "DiscoverView",
    components: { ExerciseSummaryCard },
    routines: [],
    exercises: [],
    data: () => {
      return {
        routines: [],
        carousel: 0,
        exercises: [],
      };
    },
    methods: {
      getAllExercisesWrapper(){
        this.getAllExercises(0)
      },
      getAllExercises(page){
        this.$getPageExercise(page)
        .then((exercise) => {
          this.exercises = this.exercises.concat(exercise.content).filter((item)=>{return item.detail===this.$route.query.query});
          return exercise.isLastPage;
        }).then((isLast) => {
          if(!isLast && page<5){
            this.getAllExercises(page+1)
            return;
          }
        })
      },
      ...mapActions(useExerciseStore, { $getPageExercise: "getPageExercise" }),
    },
    created() {
      this.getAllExercisesWrapper()
    },
  };
  </script>
  
  <style scoped></style>