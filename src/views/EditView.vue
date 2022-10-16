<template>
  <div class="d-flex flex-column pb-16 pr-16" style="gap: 32px" v-if="!loading">
    <v-snackbar v-model="success" rounded="lg">
      Cambios guardados correctamente

      <template>
        <v-icon class="float-right material-icons-round" size="18" color="white"
          >check_circle</v-icon
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="orange" rounded="lg">
      No se pudieron guardar los cambios

      <template>
        <v-icon class="float-right material-icons-round" size="18" color="white"
          >error</v-icon
        >
      </template>
    </v-snackbar>

    <EditCycleDialog
      v-if="selectedCycle"
      v-model="editCycleDialog"
      :cycle="selectedCycle"
      :routine-id="routine.id"
      @success="editCycle"
    />

    <EditRoutineDialog
      v-model="editRoutineDialog"
      :routine="{
        ...routine,
        metadata: { ...routine.metadata },
      }"
      @success="editRoutine"
    />

    <ConfirmationDialog
      v-if="deleteCycleConfirmationDialog"
      v-model="deleteCycleConfirmationDialog"
      title="¿Eliminar ciclo?"
      message="Si eliminas este ciclo, se eliminará de forma permanente de esta rutina."
      @confirm="deleteCycle(deleteTargetCycle)"
    />

    <v-snackbar v-model="saving" rounded="lg">
      Guardando cambios

      <template>
        <v-progress-circular
          class="float-right"
          :width="2"
          :size="18"
          indeterminate
          color="white"
        >
        </v-progress-circular>
      </template>
    </v-snackbar>

    <v-card elevation="0" class="rounded-xl" color="transparent">
      <v-img
        content-class="pl-4 pr-16 pt-4 pb-4 d-flex flex-column"
        style="width: 100%; height: 350px"
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
        <v-fade-transition>
          <v-card-text
            v-if="exercisesCount"
            class="text-body-1 font-weight-light pr-8 mt-auto"
          >
            <v-icon class="mr-2">subject</v-icon>{{ exercisesCount }} ejercicios
          </v-card-text>
        </v-fade-transition>
      </v-img>
    </v-card>

    <div v-if="userCanEdit">
      <v-dialog
        v-model="createCycleDialog"
        width="30%"
        transition="fade-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            class="px-10 py-4"
            color="gray"
            outlined
            @click="editRoutineDialog = true"
          >
            <v-icon left small class="material-icons-round">edit</v-icon>
            Editar detalles
          </v-chip>

          <v-chip
            class="px-10 py-4 ml-4"
            color="gray"
            outlined
            @click="autosave"
          >
            <v-icon left small class="material-icons-round">save</v-icon>
            Guardar cambios </v-chip
          ><v-chip
            class="px-10 py-4 ml-4"
            color="gray"
            outlined
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left small class="material-icons-round">add</v-icon>
            Nuevo ciclo
          </v-chip>
        </template>
        <v-card :key="name" class="d-inline-block pa-4" color="#1e1e1e" flat>
          <v-card-title
            class="d-inline-block font-weight-regular text-center mb-16"
          >
            Nuevo ciclo
          </v-card-title>

          <v-card-text>
            <v-text-field
              outlined
              label="Nombre"
              flat
              v-model="newCycleName"
              class="rounded-lg"
            ></v-text-field>
          </v-card-text>

          <v-divider class="mb-8 mx-6"></v-divider>
          <v-card-text>
            <v-row class="mb-4">
              <v-col class="text-center">
                <v-icon size="18px" class="material-icons-round mr-2"
                  >loop</v-icon
                >Repeticiones
              </v-col>
            </v-row>

            <v-text-field
              outlined
              placeholder="1"
              type="number"
              maxlength="3"
              class="white--text rounded-lg text-h6 font-weight-regularmb-16 centered-input"
              style="width: 100%; text-align: center"
              v-model="newCycleRepetitions"
              hide-spin-buttons
              hide-details
            />
          </v-card-text>
          <div class="text-center">
            <v-btn
              large
              style="flex: 1"
              rounded
              elevation="0"
              class="px-16 mt-16 mb-4"
              color="accent"
              :loading="buttonLoading"
              @click="createCycle"
              >Crear ciclo</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </div>

    <div class="d-flex">
      <div style="width: 50%">
        <v-item-group v-model="selected">
          <v-slide-x-transition group leave-absolute mode="default">
            <div
              v-for="(cycle, cycleIndex) in cycles"
              :key="cycle.id"
              class="d-flex flex-column mb-4"
            >
              <v-hover v-slot="{ hover }" close-delay="100">
                <div>
                  <v-row class="text-body-1 mb-2 align-center pl-4">
                    <v-col cols="6">
                      <div class="py-2">
                        {{ cycle.name
                        }}<span>
                          <v-icon size="18px" class="ml-4 material-icons-round"
                            >loop</v-icon
                          >
                          {{ cycle.repetitions }}
                        </span>
                      </div>
                    </v-col>

                    <template v-if="cycleIndex === 0">
                      <v-col cols="1" class="text-center" align="center">
                        <v-icon size="22px" class="material-icons-round"
                          >replay</v-icon
                        >
                      </v-col>
                      <v-col cols="1" class="text-center" align="center">
                        <v-icon size="22px" class="material-icons-round"
                          >fitness_center</v-icon
                        >
                      </v-col>
                      <v-col cols="1" class="text-center" align="center">
                        <v-icon size="22px" class="material-icons-outlined"
                          >timer</v-icon
                        >
                      </v-col>
                    </template>

                    <v-spacer></v-spacer>

                    <v-col cols="2" align="end">
                      <v-fade-transition>
                        <span v-if="userCanEdit && hover">
                          <v-tooltip
                            top
                            color="black"
                            transition="fade-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                class="mr-2"
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click.stop="openEditCycleDialog(cycle)"
                              >
                                <v-icon class="material-icons-round" size="18px"
                                  >edit</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>Editar ciclo</span>
                          </v-tooltip>

                          <v-tooltip
                            top
                            color="black"
                            transition="fade-transition"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                @click="
                                  deleteCycleConfirmationDialog = true;
                                  deleteTargetCycle = cycleIndex;
                                "
                                v-on="on"
                                v-bind="attrs"
                              >
                                <v-icon class="material-icons-round" size="18px"
                                  >delete</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>Eliminar ciclo</span></v-tooltip
                          >
                        </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>

                  <template v-if="cycle.exercises.length > 0">
                    <div>
                      <v-slide-x-transition group leave-absolute>
                        <v-item
                          v-slot="{ active, toggle }"
                          v-for="(obj, exerciseIndex) in cycle.exercises"
                          :key="obj.exercise.id"
                        >
                          <ExerciseViewCard
                            :id="obj.exercise.id"
                            :name="obj.exercise.name"
                            :detail="obj.exercise.detail"
                            :duration="obj.duration"
                            :weight="obj.weight"
                            :repetitions="obj.repetitions"
                            class="rounded-xl included"
                            :click="
                              () => {
                                toggle();
                                selectExercise({
                                  name: obj.exercise.name,
                                  detail: obj.exercise.detail,
                                  exercise: exerciseIndex,
                                  cycle: cycleIndex,
                                });
                              }
                            "
                            :active="userCanEdit && active"
                          />
                        </v-item>
                      </v-slide-x-transition></div
                  ></template>
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
              </v-hover>
            </div>
          </v-slide-x-transition>
        </v-item-group>
      </div>
      <div class="pa-12" style="width: 50%">
        <v-slide-y-transition>
          <ExerciseSet
            v-if="userCanEdit && selected !== undefined"
            style="position: sticky; top: 128px"
            :index="selectedExercise.exercise"
            :cycleIndex="selectedExercise.cycle"
            :name="selectedExercise.name"
            :detail="selectedExercise.detail"
            v-model="
              cycles[selectedExercise.cycle].exercises[
                selectedExercise.exercise
              ]
            "
            @delete="deleteExercise"
          />
        </v-slide-y-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useRoutineCycleStore } from "@/stores/routineCycleStore";
import { useExerciseCycleStore } from "@/stores/exerciseCycleStore";
import { useSecurityStore } from "@/stores/securityStore";

import ExerciseSet from "@/components/ExerciseSet.vue";
import EditCycleDialog from "@/components/dialogs/EditCycleDialog.vue";
import EditRoutineDialog from "../components/dialogs/EditRoutineDialog.vue";
import ConfirmationDialog from "@/components/dialogs/ConfirmationDialog.vue";
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";

export default {
  name: "RoutinesView",
  components: {
    ExerciseViewCard,
    ExerciseSet,
    EditCycleDialog,
    EditRoutineDialog,
    ConfirmationDialog,
  },
  props: ["name", "id"],
  data: () => ({
    userCanEdit: false,
    loading: false,
    routine: null,
    cycles: null,
    selectedExercise: null,
    selectedCycle: null,
    selected: undefined,
    createCycleDialog: false,
    editCycleDialog: false,
    editRoutineDialog: false,
    deleteCycleConfirmationDialog: false,
    newCycleName: "",
    newCycleRepetitions: 1,
    buttonLoading: false,
    saving: false,
    error: false,
    success: false,
    included: [],
    deleteTargetCycle: 0,
  }),
  watch: {
    $route: function (val) {
      this.fetchRoutine(val.params.id);
    },
  },
  created() {
    this.fetchRoutine(this.id);
  },
  computed: {
    newCycleRepetitionsNumber: function () {
      return Number(this.newCycleRepetitions); //Temporary workaround
    },
    exercisesCount: function () {
      if (!this.cycles || this.cycles.length === 0) return 0;
      return this.cycles.reduce(
        (acc, cycle) => acc + cycle.exercises.length,
        0
      );
    },
  },
  methods: {
    ...mapActions(useRoutineStore, { $getRoutine: "getRoutine" }),
    ...mapActions(useRoutineCycleStore, {
      $getAllRoutineCycles: "getAllRoutineCycles",
      $addRoutineCycle: "addRoutineCycle",
      $deleteRoutineCycle: "deleteRoutineCycle",
      $modifyRoutineCycle: "modifyRoutineCycle",
    }),
    ...mapActions(useExerciseCycleStore, {
      $getAllExerciseCycles: "getAllExerciseCycles",
      $modifyExerciseCycle: "modifyExerciseCycle",
      $deleteExerciseCycle: "deleteExerciseCycle",
    }),
    ...mapState(useSecurityStore, {
      $getUser: "getUser",
    }),
    fetchRoutine(routineId) {
      this.loading = true;
      this.$getRoutine(routineId)
        .then((routine) => {
          console.log(routine);
          this.routine = routine;
          this.userCanEdit = this.routine.user.id === this.$getUser().id;
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
    openEditCycleDialog(cycle) {
      this.editCycleDialog = true;
      this.selectedCycle = { ...cycle };
    },
    autosave() {
      this.saving = true;

      Promise.all(
        this.cycles.map((cycle) =>
          cycle.exercises.map((exercise) => {
            const cycleId = cycle.id;
            const exerciseId = exercise.exercise.id;

            const body = {
              order: exercise.order,
              duration: exercise.duration,
              repetitions: exercise.repetitions,
            };

            console.log({ cycleId, exerciseId, body });

            return this.$modifyExerciseCycle(cycleId, exerciseId, body);
          })
        )
      )
        .then(() => {
          this.saving = false;
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          this.saving = false;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 2000);
        });
    },
    createCycle() {
      this.saving = true;
      this.$addRoutineCycle(
        this.routine.id,
        this.newCycleName,
        this.newCycleName,
        "exercise",
        this.cycles[this.cycles.length - 1].order + 1,
        this.newCycleRepetitionsNumber,
        null
      )
        .then((newCycle) => {
          this.saving = false;
          this.success = true;
          newCycle["exercises"] = [];
          this.cycles.push(newCycle);
          this.createCycleDialog = false;
          setTimeout(() => {
            this.success = false;
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          this.saving = false;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 2000);
        });
    },
    deleteCycle(cycleIndex) {
      this.$deleteRoutineCycle(this.routine.id, {
        id: this.cycles[cycleIndex].id,
      }).then(() => {
        this.selected = undefined;
        this.cycles.splice(cycleIndex, 1);
      });
    },
    deleteExercise(exerciseIndex, cycleIndex) {
      const cycle = this.cycles[cycleIndex];
      const cycleId = cycle.id;
      const exerciseId = cycle.exercises[exerciseIndex].exercise.id;

      console.log(cycleId, exerciseId);

      this.$deleteExerciseCycle(cycleId, exerciseId, { id: exerciseId }).then(
        () => {
          this.selected = undefined;
          this.cycles[cycleIndex].exercises.splice(exerciseIndex, 1);
        }
      );
    },
    editCycle() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      this.fetchRoutineCycles(this.routine.id);
    },
    editRoutine(editedRoutine) {
      this.routine = {
        ...editedRoutine,
      };
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
}

.list-complete-item {
  transition: all 1s;
  display: block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to,
.list-complete-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.centered-input >>> input {
  text-align: center;
}
</style>
