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
          Confirmar acción
        </div>
        <v-btn
          icon
          style="position: absolute; right: 0px; top: 0px; margin: 32px"
          @click.stop="show = false"
        >
          <v-icon class="material-icons-round">close</v-icon>
        </v-btn>
      </div>

      <div class="my-16">{{ message }}</div>

      <div class="d-flex" style="gap: 16px">
        <v-btn
          large
          style="flex: 1"
          rounded
          outlined
          elevation="0"
          class="font-weight-bold white--text"
          :loading="loading"
          @click="close"
          >Cancelar</v-btn
        >
        <v-btn
          large
          style="flex: 1"
          rounded
          elevation="0"
          class="font-weight-bold"
          color="#BF3D3D"
          :loading="loading"
          @click="confirm"
          >Confirmar</v-btn
        >
      </div>
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
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
