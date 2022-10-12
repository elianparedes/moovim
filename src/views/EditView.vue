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
      <v-dialog
        v-model="createGroupDialog"
        width="500"
        transition="fade-transition"
        class="rounded-xl"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip class="px-10" color="white" outlined v-bind="attrs" v-on="on">
            <v-icon left small class="material-icons-round">add</v-icon>
            Nuevo ciclo
          </v-chip></template
        >
        <v-card :key="name" class="d-inline-block pa-8" color="#252525" flat>
          <div class="mb-8">
            <div class="d-inline-block font-weight-regular text-h6">
              Crear ciclo
            </div>
            <v-btn icon class="float-right"
              ><v-icon class="material-icons-round">close</v-icon></v-btn
            >
          </div>

          <v-text-field solo placeholder="Nombre" flat></v-text-field>

          <v-divider class="mb-8"></v-divider>
          <v-row class="mb-4">
            <v-col class="text-center">
              <v-icon size="24px" class="material-icons-round mr-2">loop</v-icon
              >Repeticiones
            </v-col>
          </v-row>

          <input
            placeholder="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type="number"
            maxlength="3"
            class="
              white--text
              rounded-lg
              text-h6
              font-weight-regular
              py-2
              mb-16
            "
            style="width: 100%; text-align: center; background-color: #1e1e1e"
          />

          <div class="d-flex">
            <v-btn
              large
              style="flex: 1"
              flat
              rounded
              elevation="0"
              class="font-weight-bold"
              color="red"
              :loading="buttonLoading"
              @click="saveChanges"
              >Crear ciclo</v-btn
            >
          </div>
        </v-card></v-dialog
      >
    </div>

    <v-snackbar v-model="error" color="red" rounded="lg">
      Se ha producido un error

      <template>
        <v-icon
          class="float-right material-icons-round"
          size="18"
          color="white"
        >error_outline</v-icon>
      </template>
    </v-snackbar>

    <v-snackbar v-model="saving" rounded="lg">
      Guardando cambios

      <template>
        <v-progress-circular
          class="float-right"
          :width="2"
          :size="18"
          indeterminate
          color="white"
        ></v-progress-circular>
      </template>
    </v-snackbar>

    <div class="d-flex">
      <div style="width: 50%">
        <v-item-group v-model="selected">
          <div
            v-for="(cycle, n) in cycles"
            :key="n"
            class="d-flex flex-column mb-4"
          >
            <v-hover v-slot="{ hover }" close-delay="100">
              <div>
                <v-row class="text-body-1 mb-4 pr-4 align-center">
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

                  <v-fade-transition>
                    <span v-if="hover">
                      <v-btn icon>
                        <v-icon class="material-icons-round">edit</v-icon>
                      </v-btn>
                      <v-btn icon class="ml-4">
                        <v-icon class="material-icons-round">add</v-icon>
                      </v-btn></span
                    ></v-fade-transition
                  >
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
                </v-item></div
            ></v-hover>
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
    createGroupDialog: false,
    buttonLoading: false,
    saving: false,
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
    saveChanges() {
      this.saving = true;
      setTimeout(() => {
        this.saving = false;
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 1000)
      }, 3000);
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
