<template>
  <v-dialog
    v-model="show"
    width="50%"
    transition="fade-transition"
    overlay-opacity="0.9"
    overlay-color="#121212"
  >
    <v-card class="pa-4" color="#1e1e1e" flat>
      <v-card-title
        class="d-inline-block font-weight-regular text-center mb-16"
      >
        Editar rutina
      </v-card-title>
      <v-card-text>
        <div class="d-flex" style="gap: 32px">
          <div class="d-flex flex-column" style="flex: 50%">
            <v-text-field
              outlined
              label="Nombre"
              v-model="editedRoutine.name"
              class="rounded-lg"
            ></v-text-field>

            <v-textarea
              outlined
              label="Descripción"
              v-model="editedRoutine.detail"
              counter="100"
              no-resize
              rows="4"
              style="flex: 1"
              class="rounded-lg"
            ></v-textarea>
          </div>
          <div class="d-flex flex-column" style="flex: 50%">
            <v-img
              style="background-color: grey"
              class="rounded-xl"
              :src="editedRoutine.metadata.image"
              :aspect-ratio="16 / 9"
            />
          </div>
        </div>

        <div class="d-flex mt-8" style="gap: 32px">
          <div class="d-flex flex-column" style="flex: 50%">
            <v-select
              outlined
              label="Categoría"
              no-resize
              class="rounded-lg"
            ></v-select>
          </div>
          <div class="d-flex flex-column" style="flex: 50%">
            <v-text-field
              outlined
              label="Portada"
              flat
              class="rounded-lg"
              v-model="editedRoutine.metadata.image"
            ></v-text-field>
          </div></div
      ></v-card-text>

      <div class="text-center my-4">
        <v-btn
          large
          style="flex: 1"
          rounded
          elevation="0"
          class="px-16"
          color="accent"
          :loading="loading"
          @click="save"
          >Guardar cambios</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";

export default {
  props: {
    routine: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      editedRoutine: this.routine,
      loading: false,
    };
  },
  watch: {
    routine(val) {
      if (val !== "") {
        this.editedRoutine = val;
      }
    },
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
    ...mapActions(useRoutineStore, {
      $modifyRoutine: "modifyRoutine",
    }),
    save() {
      this.loading = true;
      this.$modifyRoutine({
        id: this.editedRoutine.id,
        name: this.editedRoutine.name,
        detail: this.editedRoutine.detail,
        isPublic: this.editedRoutine.isPublic,
        difficulty: this.editedRoutine.difficulty,
        category: this.editedRoutine.category,
        metadata: { image: this.editedRoutine.metadata.image },
      })
        .then(() => this.success())
        .catch((err) => console.log(err));
    },
    success() {
      this.loading = false;
      this.show = false;
      this.$emit("success", this.editedRoutine);
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
