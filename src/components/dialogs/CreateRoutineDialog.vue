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
          Crear rutina
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
        v-model="routineName"
      ></v-text-field>

      <v-textarea
        solo
        name="input-7-4"
        placeholder="Descripción"
        v-model="routineDetail"
        flat
        counter
        rows="4"
        row-height="20"
        no-resize
      ></v-textarea>

      <v-select
        :items="items"
        item-text="category"
        item-value="id"
        placeholder="Categoría"
        solo
        flat
        color="gray"
        item-color="gray"
        v-model="routineCategory"
      ></v-select>

      <div class="d-flex">
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
        this.$router.push({
          name: "edit",
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
