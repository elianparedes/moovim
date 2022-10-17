<template>
  <v-slide-x-transition mode="in-out" appear>
    <div class="d-flex flex-column" style="gap: 32px">
      <div>
        <div
          class="d-flex"
          style="margin-right: calc(100vw - (500px * 3 + 16px * 4 + 256px))"
        >
          <span class="mx-2 font-weight-thin text-h6"
            >Rutinas de otros usuarios</span
          >
          <v-spacer></v-spacer>
          <SwitchButton
            :chip-content="[
              'Más recientes',
              'Más antiguos',
              'Más fáciles',
              'Más difíciles',
            ]"
            :vue-style="'mx-1'"
            v-on:newOrder="
              $event === 'Más recientes'
                ? getOrderedWrapper('date', 'desc')
                : $event === 'Más antiguos'
                ? getOrderedWrapper('date', 'asc')
                : $event === 'Más fáciles'
                ? getOrderedWrapper('difficulty', 'asc')
                : getOrderedWrapper('difficulty', 'desc')
            "
          ></SwitchButton>
        </div>
      </div>
      <div
        style="
          padding-bottom: 16px;
          margin-right: calc(100vw - (500px * 3 + 16px * 4 + 256px));
        "
      >
        <v-row class="mb-6">
          <v-col cols="4" v-for="routine in routines" :key="routine.name">
            <v-fade-transition appear>
              <WorkoutResultCard
                :routineId="routine.id"
                :name="routine.name"
                :desc="routine.detail"
                :image="routine.metadata.image"
                :author="routine.user.username"
                :avatar="routine.user.avatarUrl"
                :verified="routine.verified"
                :stars="routine.score"
                :bookmarks="routine.bookmarks"
            /></v-fade-transition>
          </v-col>
        </v-row>
      </div></div
  ></v-slide-x-transition>
</template>

<script>
import SwitchButton from "@/components/SwitchButton";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useExerciseStore } from "@/stores/exerciseStore";
import router from "@/router";
export default {
  name: "DiscoverView",
  components: {
    WorkoutResultCard,
    SwitchButton,
  },
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
    getArray(k) {
      return [0, 0, 0].map(
        (a, b) => this.routines.slice(k * 3, (k + 1) * 3)[b] || 0
      );
    },
    getOrderedWrapper(orderBy, direction) {
      this.routines = [];
      this.getOrdered(orderBy, direction, 0);
    },
    getOrdered(orderBy, direction, page) {
      this.$getPageRoutineOrdered(orderBy, direction, page)
        .then((routines) => {
          this.routines = this.routines.concat(routines.content);
          this.isLast = routines.isLastPage;
          return routines.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 6) {
            this.getOrdered(orderBy, direction, page + 1);
            return;
          }
        });
    },
    getAllRoutinesWrapper() {
      this.routines = [];
      this.getAllRoutines(0);
    },
    getAllRoutines(page) {
      this.$getPageRoutine(page)
        .then((routines) => {
          this.routines = this.routines.concat(routines.content);
          return routines.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 5) {
            this.getAllRoutines(page + 1);
            return;
          }
        });
    },
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
          if (!isLast && page < 5) {
            this.getAllExercises(page + 1);
            return;
          }
        });
    },
    viewExerciseDetails(exercise) {
      router.push(`exercises/${exercise.name}-${exercise.id}`);
    },
    ...mapActions(useRoutineStore, {
      $getPageRoutineOrdered: "getPageRoutineOrdered",
      $getPageRoutine: "getPageRoutine",
    }),
    ...mapActions(useExerciseStore, { $getPageExercise: "getPageExercise" }),
  },
  created() {
    this.getOrderedWrapper("score", "desc");
    this.getAllExercisesWrapper();
  },
};
</script>

<style scoped></style>
