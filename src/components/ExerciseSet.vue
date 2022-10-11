<template>
  <v-card
    :key="name"
    class="rounded-xl d-inline-block pa-8"
    color="#252525"
    flat
  >
    <v-card-title class="font-weight-bold text-h4">{{ name }}</v-card-title>
    <v-card-subtitle class="text-h6 font-weight-regular pr-8">{{
      detail
    }}</v-card-subtitle>
    <div class="pr-8 pb-16">
      <v-chip class="px-10 float-right" color="white" outlined>
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
            @keyup="debounceEdit"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type="number"
            maxlength="3"
            class="white--text rounded-lg text-h6 font-weight-regular py-2"
            :value="repetitions"
            style="width: 100%; text-align: center; background-color: #1e1e1e"
          />
        </v-col>

        <v-col>
          <input
            @keyup="debounceEdit"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type="number"
            maxlength="3"
            class="white--text rounded-lg text-h6 font-weight-regular py-2"
            :value="weight"
            style="width: 100%; text-align: center; background-color: #1e1e1e"
          />
        </v-col>

        <v-col>
          <input
            @keyup="debounceEdit"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type="number"
            maxlength="3"
            class="white--text rounded-lg text-h6 font-weight-regular py-2"
            :value="duration"
            style="width: 100%; text-align: center; background-color: #1e1e1e"
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseSet",
  props: {
    name: { type: String, required: false },
    detail: { type: String, required: false },
    repetitions: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
  },
  data: () => ({
    debounce: null,
  }),
  methods: {
    debounceEdit() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        console.log("autosave");
      }, 2000);
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
</style>
