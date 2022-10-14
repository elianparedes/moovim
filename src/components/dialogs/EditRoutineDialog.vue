<template>
  <v-dialog
    v-model="show"
    width="500"
    transition="fade-transition"
    class="rounded-xl"
  >
    <v-card class="d-inline-block pa-8" color="#252525" flat>
      <div class="mb-8 text-center">
        <div class="d-inline-block font-weight-regular text-h6 text-center">
          Editar rutina
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
        v-model="editedRoutine.name"
      ></v-text-field>

      <v-textarea
        solo
        name="input-7-4"
        label="Descripción"
        v-model="editedRoutine.detail"
        flat
        counter
        rows="4"
        row-height="20"
        no-resize
      ></v-textarea>

      <v-text-field
        solo
        placeholder="Imagen"
        flat
        v-model="editedRoutine.metadata.image"
      ></v-text-field>

      <div class="d-flex mt-8">
        <v-btn
          large
          style="flex: 1"
          rounded
          elevation="0"
          class="font-weight-bold"
          color="#BF3D3D"
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
