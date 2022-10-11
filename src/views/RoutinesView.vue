<template>
  <div
    id="routines"
    class="d-flex"
    style="gap: 32px; height: calc(100vh - 96px)"
    v-if="!loading"
  >
    <v-item-group
      mandatory
      class="px-4 py-1 d-flex flex-column"
      style="overflow-y: auto; gap: 32px"
      v-model="selected"
    >
      <v-item
        v-slot="{ active, toggle }"
        v-for="routine in routines"
        :key="routine.id"
      >
        <WorkoutResultCard
          :key="routine.id"
          :name="routine.name"
          :desc="routine.detail"
          :image="routine.metadata.image"
          :author="routine.user.username"
          :avatar="routine.metadata.image"
          :verified="routine.verified"
          :stars="routine.stars"
          :bookmarks="routine.bookmarks"
          :active="active"
          :click="
            () => {
              toggle();
              fetchRoutineCycles(routine.id);
            }
          "
        />
      </v-item>
    </v-item-group>
    <div style="flex: 90%; overflow-y: scroll">
      <div style="position: sticky; top: 0px; z-index: 1">
        <v-toolbar color="#181818" flat>
          <v-toolbar-title class="font-weight-bold text-h3">{{
            routines[selected]?.name
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-chip class="px-10" color="white" outlined @click="editRoutine">
              <v-icon left small class="material-icons-round">edit</v-icon>
              Editar rutina
            </v-chip>
          </div>
        </v-toolbar>
        <div
          style="
            height: 64px;
            background-image: linear-gradient(#181818, rgba(24, 24, 24, 0));
          "
        ></div>
      </div>
      <v-scroll-y-transition mode="in" group>
        <div v-for="(cycle, n) in cycles" :key="cycle.id" class="px-4 mb-4">
          <v-row class="text-body-1 ma-4" no-gutters>
            <v-col>
              <div>
                {{ cycle.name
                }}<span>
                  <v-icon size="24px" class="ml-4 material-icons-round"
                    >loop</v-icon
                  >
                  {{ cycle.repetitions }}
                </span>
              </div>
            </v-col>

            <template v-if="n === 0">
              <v-col cols="1" class="text-center" align="center">
                <v-icon size="24px" class="material-icons-round">replay</v-icon>
              </v-col>
              <v-col cols="1" class="text-center" align="center">
                <v-icon size="24px" class="material-icons-round"
                  >fitness_center</v-icon
                >
              </v-col>
              <v-col cols="1" class="text-center" align="center">
                <v-icon size="24px" class="material-icons-round">timer</v-icon>
              </v-col>
            </template>
          </v-row>

          <ExerciseViewCard
            v-for="obj in cycle.exercises"
            :key="obj.order"
            :name="obj.exercise.name"
            :detail="obj.exercise.detail"
            :duration="obj.duration"
            :weight="obj.weight"
            :repetitions="obj.repetitions"
            class="mb-4 rounded-xl"
          ></ExerciseViewCard>
        </div>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";

import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useRoutineCycleStore } from "@/stores/routineCycleStore";
import { useExerciseCycleStore } from "@/stores/exerciseCycleStore";

export default {
  name: "RoutinesView",
  components: {
    WorkoutResultCard,
    ExerciseViewCard,
  },
  data() {
    return {
      loading: true,
      routines: null,
      cycles: null,

      selected: null,
      items: [
        { icon: "home", title: "Inicio" },
        { icon: "search", title: "Explorar" },
        { icon: "fitness_center", title: "Mis Rutinas" },
      ],
    };
  },
  created() {
    this.fetchRoutines();
  },
  watch: {
    $route: "fetchRoutines",
  },
  methods: {
    ...mapActions(useRoutineStore, { $getAllRoutine: "getAllRoutine" }),
    ...mapActions(useRoutineCycleStore, {
      $getAllRoutineCycles: "getAllRoutineCycles",
    }),
    ...mapActions(useExerciseCycleStore, {
      $getAllExerciseCycles: "getAllExerciseCycles",
    }),
    editRoutine() {
      this.$router.push({
        name: "edit",
        params: {
          id: this.routines[this.selected]?.id,
          name: this.routines[this.selected]?.name,
        },
      });
    },
    fetchRoutines() {
      this.loading = true;
      this.$getAllRoutine()
        .then((routines) => {
          this.routines = routines.content;
          return routines.content[0].id;
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
  },
};
</script>

<style>
.v-expansion-panel:not(:first-child)::after {
  border-top: 0;
}
</style>
