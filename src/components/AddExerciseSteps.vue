<template>
  <v-dialog
    v-model="show"
    width="30%"
    transition="fade-transition"
    class="rounded-xl"
  >
    <v-card color="#1e1e1e" class="rounded-xl pb-4 d-flex flex-column">
      <div class="my-8">
        <div
          class="d-flex flex-row text-body font-weight-thin justify-center pt-4"
        >
          Agregar ejercicio
        </div>
        <div
          class="d-flex flex-row justify-center align-content-space-around py-4"
        >
          <v-avatar
            size="32"
            color="#BF3D3D"
            class="mx-4 font-weight-black text-h6"
          >
            {{ number }}
          </v-avatar>
          <div class="font-weight-medium text-h6">
            {{ instruction }}
          </div>
        </div>
      </div>

      <div
        v-if="!loading && step < 2"
        class="mx-8 d-flex flex-column rounded-lg"
        style="height: 400px; outline: gray 1px solid"
      >
        <div style="border-bottom: gray 1px solid">
          <v-text-field
            prepend-inner-icon="search"
            v-model="search"
            label="Buscar rutina"
            solo
            hide-details
            clearable
            clear-icon="mdi-close-circle"
            color="white"
            class="white--text rounded-t-lg rounded-b-0"
          ></v-text-field>
        </div>

        <v-treeview
          :items="items"
          :search="search"
          :filter="filter"
          :active.sync="active"
          :open.sync="open"
          return-object
          activatable
          hoverable
          color="white"
          class="overflow-y-auto"
          item-key="key"
          item-children="cycles"
        >
        </v-treeview>
      </div>

      <div
        v-if="step === 2"
        class="px-4 py-4 d-flex flex-column justify-center"
        style="height: 400px; max-height: 400px"
      >
        <div class="my-2">
          <v-row>
            <v-col class="text-center">
              <v-icon size="24px" class="material-icons-round mr-2"
                >replay
              </v-icon>
              Reps.
            </v-col>

            <v-col class="text-center">
              <v-icon size="24px" class="material-icons-round mr-2"
                >fitness_center
              </v-icon>
              Kg.
            </v-col>

            <v-col class="text-center">
              <v-icon size="24px" class="material-icons-outlined mr-2"
                >timer
              </v-icon>
              Segs.
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col>
              <input
                @input="(e) => checkStepInput(e, 'repetitions')"
                v-model="input.repetitions"
                type="number"
                class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
                style="
                  width: 100%;
                  text-align: center;
                  background-color: #1e1e1e;
                "
              />
            </v-col>

            <v-col>
              <input
                @input="(e) => checkStepInput(e, 'weight')"
                :value="input.weight"
                type="number"
                class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
                style="
                  width: 100%;
                  text-align: center;
                  background-color: #1e1e1e;
                "
              />
            </v-col>

            <v-col>
              <input
                @input="(e) => checkStepInput(e, 'duration')"
                :value="input.duration"
                type="number"
                class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
                style="
                  width: 100%;
                  text-align: center;
                  background-color: #1e1e1e;
                "
              />
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="pt-8 pb-4 text-center">
        <div>
          <v-btn
            large
            :ripple="false"
            class="rounded-xl px-16"
            color="#BF3D3D"
            :disabled="!btnAvailable"
            @click="checkStepBtn()"
          >
            {{ btnMessage }}
            <v-icon class="material-icons-round"> navigate_next </v-icon>
          </v-btn>
        </div>
        <div
          v-if="exerciseRepeated"
          class="d-flex column justify-center"
          style="color: #bf3d3d"
        >
          El ciclo seleccionado ya contiene este ejercicio
        </div>
      </div>
    </v-card></v-dialog
  >
</template>

<script>
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
import { useRoutineCycleStore } from "@/stores/routineCycleStore";
import { useExerciseCycleStore } from "@/stores/exerciseCycleStore";

export default {
  name: "AddExcerciseSteps.vue",
  components: {},
  props: {
    exerciseId: { type: Number, required: true },
    value: Boolean,
  },
  data: () => {
    return {
      search: null,
      step: 0,
      steps: [
        {
          num: 1,
          instruction: "Seleccione rutina",
          message: "Continuar",
          toggle: false,
          stepBtnAvailable: function () {
            return false;
          },
          hasNext: (data) => {
            return data.open.length > 0;
          },
        },
        {
          num: 2,
          instruction: "Seleccione ciclo",
          message: "Continuar",
          toggle: false,
          stepBtnAvailable: function (data) {
            return data.active.length > 0 && data.active[0].path.length > 1;
          },
          hasNext: (data) => {
            return (
              data.active.length > 0 &&
              data.active[0].path.length > 1 &&
              data.steps[data.step].toggle &&
              !data.exerciseRepeated
            );
          },
        },
        {
          num: 3,
          instruction: "Ingrese parametros",
          message: "Finalizar",
          toggle: false,
          stepBtnAvailable: function (data) {
            return !(
              data.input.repetitions === "" &&
              data.input.duration === "" &&
              data.input.weight === ""
            );
          },
          hasNext: () => {
            return false;
          },
        },
      ],
      open: [],
      active: [],
      containsExercise: [],
      notContainsExercise: [],
      exerciseRepeated: false,
      selectedCycle: null,
      counter: 0,
      success: false,
      items: [],
      loading: false,
      input: {
        repetitions: "",
        weight: "",
        duration: "",
      },
    };
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    number() {
      return this.steps[this.step].num;
    },
    instruction() {
      return this.steps[this.step].instruction;
    },
    btnMessage() {
      return this.steps[this.step].message;
    },
    btnAvailable() {
      return this.steps[this.step].stepBtnAvailable(this.$data);
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    this.fetchRoutines();
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $getAllRoutine: "getAllRoutine",
    }),
    ...mapActions(useRoutineCycleStore, {
      $getAllRoutineCycles: "getAllRoutineCycles",
    }),
    ...mapActions(useExerciseCycleStore, {
      $addExerciseCycle: "addExerciseCycle",
      $getAllExerciseCycles: "getAllExerciseCycles",
    }),
    checkStep() {
      if (this.steps[this.step].hasNext(this.$data)) {
        this.step++;
      } else if (
        this.step > 0 &&
        !this.steps[this.step - 1].hasNext(this.$data)
      )
        this.step--;
    },
    checkStepBtn() {
      this.steps[this.step].toggle = true;
      if (this.step === 1) {
        if(this.exerciseRepeated) {
          this.steps[this.step].toggle = false;
          return
        }
        this.checkStep();
      } else {
        this.$emit("finish");
        this.addExercise();
      }
    },
    checkStepInput(e, value) {
      this.input[value] = e.target.value;
    },
    fetchRoutines() {
      this.loading = true;
      let idCounter = 0;
      this.$getAllRoutine().then((routines) => {
        this.items = routines.content;
        Promise.all(
          this.items.map((routine, routineIndex) => {
            routine["path"] = [routineIndex];
            routine["key"] = idCounter++;

            return this.$getAllRoutineCycles(routine.id).then((cycles) => {
              routine["cycles"] = cycles.content.map((cycle, cycleIndex) => {
                const path = [...routine.path];
                path.push(cycleIndex);

                cycle["path"] = path;
                cycle["key"] = idCounter++;
                return cycle;
              });
              return routine;
            });
          })
        ).then((res) => {
          console.log(res);
          this.loading = false;
        });
      });
    },
    addExercise() {
      this.success = true
      const cycleId = this.active[0].id;
      this.$getAllExerciseCycles(cycleId)
        .then(
          (exercises) =>
            exercises.content[exercises.content.length - 1].order + 1
        )
        .then((newOrder) =>
          this.$addExerciseCycle(
            cycleId,
            this.exerciseId,
            newOrder,
            Number(this.input.duration),
            Number(this.input.repetitions)
          )
            .then(() => {
              this.show = false;
            })
            .catch(() => {})
        );
    },
    async checkExercise() {
      if (this.active.length < 1) {
        this.exerciseRepeated = false;
        return;
      }
      const cycleId = this.active[0].id;
      if (this.containsExercise.includes(cycleId)) {
        this.exerciseRepeated = true;
        return;
      }
      if (this.notContainsExercise.includes(cycleId)) {
        this.exerciseRepeated = false;
        return;
      }
      this.$getAllExerciseCycles(cycleId)
        .then((exercises) => {
          exercises.content.forEach((aux) => {
            if (aux.exercise.id === this.exerciseId) {
              this.containsExercise.push(cycleId);
            }
          });
          return exercises.content.length + 1;
        })
        .then((counter) => {
          this.counter = counter;
          if (this.containsExercise.includes(cycleId)) {
            return true;
          } else this.notContainsExercise.push(cycleId);
          return false;
        })
        .then((bool) => (this.exerciseRepeated = bool));
    },
  },
  watch: {
    open() {
      if (this.step === 1) {
        this.checkExercise().then(() => {
          this.checkStep();
        });
      } else {
        this.checkStep();
      }
    },
    active() {
      if (this.step === 1) {
        this.checkExercise().then(() => {
          this.checkStep();
        });
      } else {
        this.checkStep();
      }
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar-track {
  margin-right: calc(100vw - (500px * 3 + 16px * 4 + 256px));
  background-color: #1e1e1e;
  border-radius: 8px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.numeric-input:focus-visible,
.numeric-input:focus {
  outline: 1.5px #bf3d3d solid !important;
}
.numeric-input:hover {
  outline: 1.5px white solid;
}

.numeric-input {
  transition: all 150ms ease-in-out;
  outline: 1.5px gray solid;
}
</style>
