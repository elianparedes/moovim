<template>
  <v-dialog
    v-model="show"
    width="500"
    transition="fade-transition"
    class="rounded-xl"
    overlay-opacity="0.9"
    overlay-color="#181818"
  >
    <v-card class="d-inline-block pa-8" color="#252525" flat>
      <div class="mb-8 text-center">
        <div class="d-inline-block font-weight-regular text-h6 text-center">
          Crear ejercicio
        </div>
        <v-btn
          icon
          style="position: absolute; right: 0px; top: 0px; margin: 32px"
          @click.stop="show = false"
        >
          <v-icon class="material-icons-round">close</v-icon>
        </v-btn>
      </div>

      <v-text-field
        solo
        placeholder="Nombre"
        flat
        v-model="exerciseName"
      ></v-text-field>

      <v-select
        class="mt-4"
        :items="items"
        item-text="category"
        item-value="category"
        placeholder="Músculos principales"
        solo
        flat
        color="gray"
        item-color="gray"
        v-model="exerciseDetail"
      ></v-select>

      <v-textarea
        solo
        name="input-7-4"
        placeholder="Descripción"
        v-model="exerciseProcedure"
        flat
        counter
        rows="4"
        row-height="20"
        no-resize
      ></v-textarea>

      <div class="d-flex mt-8">
        <v-btn
          large
          style="flex: 1"
          rounded
          elevation="0"
          class="font-weight-bold"
          color="#BF3D3D"
          :loading="loading"
          @click="create"
          >Crear</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore";

export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      exerciseName: "",
      exerciseDetail: "",
      exerciseProcedure: "",
      loading: false,
      items: [
        { category: "Pectorales" },
        { category: "Bíceps" },
        { category: "Tríceps" },
        { category: "Espalda" },
        { category: "Gemelos" },
        { category: "Abdominales" },
        { category: "Hombros" },
        { category: "Piernas" },
      ],
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions(useExerciseStore, {
      $addexercise: "addExercise",
    }),
    create() {
      this.loading = true;
      this.$addexercise(this.exerciseName, "exercise", this.exerciseDetail, {
        procedure: this.exerciseProcedure,
      }).then(() => {
        this.success();
      });
    },
    success() {
      this.loading = false;
      this.show = false;
    },
    close() {
      this.$emit("close");
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
</style>
