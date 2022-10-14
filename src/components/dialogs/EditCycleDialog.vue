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
          Editar ciclo
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
        v-model="editedCycle.name"
      ></v-text-field>

      <v-divider class="mb-8"></v-divider>
      <v-row class="mb-4">
        <v-col class="text-center">
          <v-icon size="24px" class="material-icons-round mr-2">loop</v-icon
          >Repeticiones
        </v-col>
      </v-row>

      <input
        placeholder="1"
        type="number"
        maxlength="3"
        class="white--text rounded-lg text-h6 font-weight-regular py-2 mb-16"
        style="width: 100%; text-align: center; background-color: #1e1e1e"
        v-model.number="editedCycle.repetitions"
      />

      <div class="d-flex">
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
import { useRoutineCycleStore } from "@/stores/routineCycleStore";

export default {
  props: {
    cycle: {
      type: Object,
      required: true,
    },
    routineId: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      editedCycle: this.cycle,
      loading: false,
    };
  },
  watch: {
    cycle(val) {
      if (val !== "") {
        this.editedCycle = val;
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
    ...mapActions(useRoutineCycleStore, {
      $modifyRoutineCycle: "modifyRoutineCycle",
    }),
    save() {
      this.loading = true;
      this.$modifyRoutineCycle(this.routineId, {
        //TODO: verify  routine id
        id: this.editedCycle.id,
        name: this.editedCycle.name,
        detail: this.editedCycle.detail,
        type: this.editedCycle.type,
        order: this.editedCycle.order,
        repetitions: this.editedCycle.repetitions,
        metadata: null,
      })
        .then(() => this.success())
        .catch((err) => console.log(err));
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
