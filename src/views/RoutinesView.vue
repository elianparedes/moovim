<template>
  <v-slide-x-transition hide-on-leave>
    <div
      id="routines"
      class="d-flex"
      style="gap: 8px; height: calc(100vh - 128px)"
      v-if="!loading"
    >
      <v-item-group
        mandatory
        class="px-4 py-1 d-flex flex-column"
        style="overflow-y: auto; gap: 32px; width: 40%"
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
            :avatar="routine.user.avatarUrl"
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
      <div style="flex: 90%; overflow-y: scroll" class="pr-4">
        <div style="position: sticky; top: 0px; z-index: 1">
          <v-toolbar color="#181818" flat>
            <v-toolbar-title class="font-weight-bold text-h3 pb-4">{{
              routines[selected]?.name
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex" style="gap: 16px">
              <DeleteButton
                title="¿Eliminar rutina?"
                message="Si eliminas esta rutina, se eliminará de forma permanente de tu biblioteca de rutinas."
                @click="deleteRoutine"
              />
              <v-chip class="px-8" color="gray" outlined @click="editRoutine">
                <v-icon left small class="material-icons-round">edit</v-icon>
                Editar
              </v-chip>
            </div>
          </v-toolbar>
          <div
            style="
              height: 32px;
              background-image: linear-gradient(#181818, rgba(24, 24, 24, 0));
              position: sticky;
              top: 0px;
              z-index: 1;
            "
          ></div>
        </div>
        <v-slide-y-transition mode="in" group hide-on-leave>
          <div v-for="(cycle, n) in cycles" :key="cycle.id" class="px-4 mb-6">
            <v-row class="text-body-1 pl-4 align-center mb-4">
              <v-col cols="6">
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

              <template v-if="n === 0">
                <v-col cols="1" class="text-center" align="center">
                  <v-icon size="24px" class="material-icons-round"
                    >replay</v-icon
                  >
                </v-col>
                <v-col cols="1" class="text-center" align="center">
                  <v-icon size="24px" class="material-icons-round"
                    >fitness_center</v-icon
                  >
                </v-col>
                <v-col cols="1" class="text-center" align="center">
                  <v-icon size="24px" class="material-icons-outlined"
                    >timer</v-icon
                  >
                </v-col>
              </template>
            </v-row>

            <template v-if="cycle.exercises.length > 0">
              <ExerciseViewCard
                v-for="obj in cycle.exercises"
                :key="obj.order"
                :id="obj.exercise.id"
                :name="obj.exercise.name"
                :detail="obj.exercise.detail"
                :duration="obj.duration"
                :weight="obj.weight"
                :repetitions="obj.repetitions"
                class="rounded-xl"
              ></ExerciseViewCard>
            </template>
            <template v-else>
              <div
                class="rounded-xl py-6 px-4"
                style="background-color: #1e1e1e; margin: -12px -12px 0 0"
              >
                <v-card-text style="color: gray">
                  Este ciclo no contiene ejercicios.
                </v-card-text>
              </div>
            </template>
          </div>
        </v-slide-y-transition>
      </div>
    </div></v-slide-x-transition
  >
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";

import { mapActions, mapState } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useRoutineCycleStore } from "@/stores/routineCycleStore";
import { useExerciseCycleStore } from "@/stores/exerciseCycleStore";
import { useSecurityStore } from "@/stores/securityStore";
import DeleteButton from "@/components/buttons/DeleteButton.vue";

export default {
  name: "RoutinesView",
  components: {
    WorkoutResultCard,
    ExerciseViewCard,
    DeleteButton,
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
    ...mapActions(useRoutineStore, {
      $getAllRoutine: "getAllRoutine",
      $deleteRoutine: "deleteRoutine",
    }),
    ...mapActions(useRoutineCycleStore, {
      $getAllRoutineCycles: "getAllRoutineCycles",
    }),
    ...mapActions(useExerciseCycleStore, {
      $getAllExerciseCycles: "getAllExerciseCycles",
    }),
    ...mapActions(useSecurityStore, {
      $getCurrentUserRoutines: "getCurrentUserRoutines",
    }),
    ...mapState(useSecurityStore, {
      $getUser: "getUser",
    }),
    editRoutine() {
      this.$router.push({
        name: "routine_detail",
        params: {
          id: this.routines[this.selected]?.id,
          name: this.routines[this.selected]?.name,
        },
      });
    },
    deleteRoutine() {
      this.$deleteRoutine(this.routines[this.selected]).then(() => {
        this.routines.splice(this.selected, 1);
      });
    },
    fetchRoutines() {
      this.loading = true;
      this.$getCurrentUserRoutines()
        .then((routines) => {
          this.routines = routines.content;

          this.routines.map((routine) => {
            routine["user"] = this.$getUser();
          });

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
