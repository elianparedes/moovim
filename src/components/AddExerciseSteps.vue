<template>
  <v-dialog
    v-model="show"
    width="500"
    transition="fade-transition"
    class="rounded-xl"
  >
    <v-sheet
      color="#252525"
      elevation="16"
      width="100%"
      height="80vh"
      class="rounded-xl pb-4 d-flex flex-column"
    >
      <div>
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
        class="px-4 py-4 d-flex flex-column"
        style="height: 400px; max-height: 400px"
      >
        <v-text-field
          v-model="search"
          label="Buscar rutina"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
          style="max-height: 10%"
          class="mb-4"
        ></v-text-field>
        <div style="height: 100%" class="my-2">
          <v-treeview
            :items="items"
            :search="search"
            :filter="filter"
            :active.sync="active"
            :open.sync="open"
            return-object
            activatable
            hoverable
            rounded
            color="#BF3D3D"
            class="overflow-y-auto"
            item-key="key"
            item-children="cycles"
            style="max-height: 270px"
          >
          </v-treeview>
        </div>
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
                class="white--text rounded-lg text-h6 font-weight-regular py-2"
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
                class="white--text rounded-lg text-h6 font-weight-regular py-2"
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
                class="white--text rounded-lg text-h6 font-weight-regular py-2"
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

      <div class="d-flex justify-center mx-4 my-auto">
        <v-btn
          :ripple="false"
          elevation="0"
          class="rounded-xl"
          color="#BF3D3D"
          block
          :disabled="!btnAvailable"
          @click="checkStepBtn()"
        >
          {{ btnMessage }}
          <v-icon class="material-icons-round"> navigate_next </v-icon>
        </v-btn>
      </div>
    </v-sheet></v-dialog
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
              data.steps[data.step].toggle
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
      if (this.step === 1) this.checkStep();
      else {
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
      const cycleId = this.active[0].id;
      this.$getAllExerciseCycles(cycleId)
        .then((exercises) => exercises.content.length + 1)
        .then((exercisesCount) =>
          this.$addExerciseCycle(
            cycleId,
            this.exerciseId,
            exercisesCount,
            Number(this.input.duration),
            Number(this.input.repetitions)
          ).then(() => {
            this.show = false;
            this.$emit("finish");
          })
        );
    },
  },
  watch: {
    open() {
      this.checkStep();
    },
    active() {
      this.checkStep();
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
</style>
