<template>
  <v-card
    :key="name"
    class="rounded-xl d-inline-block pa-8"
    color="#252525"
    flat
  >
    <div class="font-weight-bold text-h4">{{ name }}</div>
    <div class="text-h6 font-weight-regular pr-8 mb-16">{{ detail }}</div>
    <div class="pb-8 mt-8" align="end">
      <DeleteButton
        title="¿Eliminar ejercicio?"
        message="Si eliminas este ejercicio, se eliminará de forma permanente de esta rutina."
        @click="deleteExercise"
      />
      <v-chip class="px-10 ml-4" color="gray" outlined @click="showMore">
        <v-icon left small class="material-icons-round">info_outline</v-icon>
        Ver detalles
      </v-chip>
    </div>
    <v-divider class="pt-16"></v-divider>
    <div>
      <v-row>
        <v-col class="text-center">
          <v-icon size="24px" class="material-icons-round mr-2">replay</v-icon
          >Reps.
        </v-col>

        <v-col class="text-center">
          <v-icon size="24px" class="material-icons-round mr-2"
            >fitness_center</v-icon
          >Kg.
        </v-col>

        <v-col class="text-center">
          <v-icon size="24px" class="material-icons-outlined mr-2">timer</v-icon
          >Segs.
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input
            @input="updateValue('repetitions', $event.target.value)"
            :value="value.repetitions"
            type="number"
            class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
            style="width: 100%; text-align: center"
          />
        </v-col>

        <v-col>
          <input
            @input="updateValue('weight', $event.target.value)"
            :value="value.weight"
            type="number"
            class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
            style="width: 100%; text-align: center"
          />
        </v-col>

        <v-col>
          <input
            @input="updateValue('duration', $event.target.value)"
            :value="value.duration"
            type="number"
            class="white--text rounded-lg text-h6 font-weight-regular py-2 numeric-input"
            style="width: 100%; text-align: center"
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import DeleteButton from "@/components/buttons/DeleteButton.vue";
export default {
  name: "ExerciseSet",
  components: { DeleteButton },
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    cycleIndex: {
      type: Number,
      required: true,
    },
    name: { type: String, required: false },
    detail: { type: String, required: false },
    value: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    debounce: null,
  }),
  methods: {
    debounceEdit() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("debounce");
      }, 2000);
    },
    updateValue(key, value) {
      if (value.length > 2) value = value.slice(0, 2);

      this.$emit("input", { ...this.value, [key]: Number(value) });
    },
    deleteExercise() {
      this.$emit("delete", this.index, this.cycleIndex);
    },
    showMore() {
      this.$router.push({
        name: "exercises_detail",
        params: {
          name: this.name,
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
::-webkit-input-placeholder {
  /* Edge */
  color: white;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::placeholder {
  color: white;
}

.centered-input input {
  text-align: center;
}

.v-text-field__details {
  display: none;
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

.centered-input >>> input {
  text-align: center;
}

.numeric-input:focus-visible,
.numeric-input:focus {
  outline: 1.5px #bf3d3d solid !important;
}
.numeric-input:hover {
  outline: 1.5px white solid;
}

.numeric-input {
  transition: all 150ms ease-in-out;
  outline: 1.5px gray solid;
}
</style>
