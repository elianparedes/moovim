<template>
  <v-dialog v-model="show" width="30%" transition="fade-transition">
    <v-card class="d-inline-block pa-8" color="#1e1e1e" flat>
      <v-card-title
        class="d-inline-block font-weight-regular text-center mb-16"
      >
        Editar ciclo
      </v-card-title>

      <v-card-text>
        <v-text-field
          outlined
          label="Nombre"
          flat
          v-model="editedCycle.name"
          class="rounded-lg"
        ></v-text-field>
      </v-card-text>

      <v-divider class="mb-8"></v-divider>
      <v-card-text>
        <v-row class="mb-4">
          <v-col class="text-center">
            <v-icon size="24px" class="material-icons-round mr-2">loop</v-icon
            >Repeticiones
          </v-col>
        </v-row>

        <v-text-field
          outlined
          type="number"
          maxlength="3"
          class="white--text rounded-lg text-h6 font-weight-regular centered-input"
          style="width: 100%; text-align: center"
          v-model.number="editedCycle.repetitions"
          hide-spin-buttons
          hide-details
        />
      </v-card-text>
      <div class="text-center">
        <v-btn
          large
          style="flex: 1"
          rounded
          elevation="0"
          class="px-16 mt-16 mb-4"
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

.centered-input >>> input {
  text-align: center;
}
</style>
