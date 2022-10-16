<template>
  <v-dialog v-model="show" width="30%" transition="fade-transition" class="rounded-xl" overlay-opacity="0.9"
    overlay-color="#181818">
    <v-card class="d-inline-block pa-4" color="#1e1e1e" flat>
      <v-card-title class="d-inline-block font-weight-regular text-center mb-16">
        Nueva rutina
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field :rules=nameRules outlined class="rounded-lg" label="Nombre" v-model="routineName" counter="100"></v-text-field>
          <v-textarea :rules=detailRules outlined label="Descripción" v-model="routineDetail" counter="100" rows="4" row-height="20"
            no-resize class="rounded-lg"></v-textarea>

          <v-select outlined class="rounded-lg" :items="items" item-text="category" item-value="id" label="Categoría"
            item-color="gray" v-model="routineCategory"></v-select>
        </v-form>
      </v-card-text>

      <div class="text-center">
        <v-btn :disabled="!valid" large style="flex: 1" rounded elevation="0" color="accent" class="px-16 mt-8 mb-8" :loading="loading"
          @click="create">Crear rutina</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import router from "@/router";
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";

export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      routineName: "",
      routineDetail: "",
      routineCategory: "",
      loading: false,
      items: [{ id: 1, category: "Tonificación" }],
      nameRules:
        [v => (v.length <= 100) || 'El nombre debe tener menos de 100 caracteres',
        (v) => !!v || "Se debe especificar el nombre de la rutina"],
      detailRules:
        [v => (v.length <= 100) || 'La descripción debe tener menos de 100 caracteres',
        (v) => !!v || "Se debe especificar la descripción"],
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
    ...mapActions(useRoutineStore, {
      $addRoutine: "addRoutine",
    }),
    create() {
      this.loading = true;
      this.$addRoutine(
        this.routineName,
        this.routineDetail,
        true,
        { id: this.routineCategory },
        "rookie",
        {
          image:
            "https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }
      ).then((routine) => {
        this.success();
        router.push({
          name: "routine_detail",
          params: {
            id: routine.id,
            name: routine.name,
          },
        });
      });
    },
    success() {
      this.loading = false;
      this.show = false;
      this.$emit("success", this.editedCycle);
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
