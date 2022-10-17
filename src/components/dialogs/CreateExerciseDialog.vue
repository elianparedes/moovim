<template>
  <v-dialog
    v-model="show"
    width="30%"
    transition="fade-transition"
    class="rounded-xl"
    overlay-opacity="0.9"
    overlay-color="#181818"
  >
    <v-card class="d-inline-block pa-4" color="#1e1e1e" flat>
      <v-card-title
        class="d-inline-block font-weight-regular text-center mb-16"
      >
        Nuevo ejercicio
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            :rules="nameRules"
            class="rounded-lg"
            outlined
            label="Nombre"
            v-model="exerciseName"
            :counter="100"
          ></v-text-field>

          <v-select
            outlined
            class="rounded-lg"
            :items="items"
            item-text="category"
            item-value="category"
            label="Músculos principales"
            item-color="gray"
            v-model="exerciseDetail"
          ></v-select>

          <v-textarea
            :rules="detailRules"
            outlined
            name="input-7-4"
            placeholder="Descripción"
            v-model="exerciseProcedure"
            rows="4"
            row-height="20"
            no-resize
            class="rounded-lg"
            :counter="350"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <div class="text-center">
        <v-btn
          :disabled="!valid"
          style="flex: 1"
          rounded
          elevation="0"
          color="accent"
          class="px-16 mb-4 mt-8"
          :loading="loading"
          @click="createExercise"
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
      nameRules: [
        (v) =>
          v.length <= 100 || "El nombre debe tener menos de 100 caracteres",
        (v) => !!v || "Se debe especificar el nombre del ejercicio",
      ],
      detailRules: [
        (v) =>
          v.length <= 350 ||
          "La descripción de debe tener menos de 350 caracteres",
        (v) => !!v || "Se debe especificar la descripción",
      ],
      valid: false,
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
    createExercise() {
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
