<template>
  <v-dialog
    v-model="show"
    width="600"
    transition="fade-transition"
    overlay-opacity="0.9"
    overlay-color="#181818"
  >
    <v-card class="d-inline-block pa-4" color="#1e1e1e" flat>
      <v-card-title
        class="d-inline-block font-weight-regular text-center mb-16"
      >
        Editar ejercicio
      </v-card-title>

      <v-card-text class="d-flex flex-column" style="gap: 16px">
        <v-text-field
          class="rounded-lg"
          label="Nombre"
          flat
          outlined
          v-model="editedExercise.name"
        ></v-text-field>

        <v-select
          class="rounded-lg"
          :items="items"
          item-text="category"
          item-value="category"
          label="Músculos principales"
          outlined
          flat
          item-color="gray"
          v-model="editedExercise.detail"
        ></v-select>

        <v-textarea
          class="rounded-lg"
          outlined
          label="Ejecución"
          v-model="editedExercise.metadata.procedure"
          flat
          counter="350"
          rows="6"
          row-height="20"
          no-resize
          :rules="procedureRules"
        ></v-textarea>

        <div class="text-center">
          <v-btn
            large
            style="flex: 1"
            rounded
            elevation="0"
            class="font-weight-bold px-16"
            color="#BF3D3D"
            :loading="loading"
            @click="modifyExercise"
            >Guardar cambios</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useExerciseStore } from "@/stores/exerciseStore";

export default {
  props: {
    exercise: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      editedExercise: this.exercise,
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
      procedureRules: [
        (v) =>
          v.length < 350 ||
          "El procedimiento debe tener menos de 350 caractéres",
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
      $modifyExercise: "modifyExercise",
    }),
    modifyExercise() {
      this.loading = true;
      this.$modifyExercise({
        id: this.editedExercise.id,
        name: this.editedExercise.name,
        type: "exercise",
        detail: this.editedExercise.detail,
        metadata: {
          pos: this.editedExercise.metadata.pos,
          procedure: this.editedExercise.metadata.procedure,
        },
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
