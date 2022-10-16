<template>
  <v-dialog
    v-model="show"
    width="500"
    transition="fade-transition"
    class="rounded-xl"
  >
    <v-card class="d-inline-block pa-8" color="#1e1e1e" flat>
      <v-card-title class="d-inline-block font-weight-regular text-center mb-4">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions class="d-flex mt-8" style="gap: 16px">
        <v-btn
          large
          style="flex: 1"
          rounded
          outlined
          elevation="0"
          content-class="white--text"
          color="grey"
          :loading="loading"
          @click="close"
          >Cancelar</v-btn
        >
        <v-btn
          large
          style="flex: 1"
          rounded
          color="#BF3D3D"
          :loading="loading"
          @click="confirm"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      loading: false,
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
    confirm() {
      this.show = false;
      this.$emit("confirm");
    },
    close() {
      this.show = false;
      this.$emit("close");
    },
  },
};
</script>
