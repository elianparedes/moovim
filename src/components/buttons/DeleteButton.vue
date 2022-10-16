<template>
  <div class="d-inline-block">
    <ConfirmationDialog
      v-if="confirmationDialog"
      v-model="confirmationDialog"
      :message="message"
      :title="title"
      @confirm="doAction"
    />

    <template>
      <v-chip
        class="px-8"
        color="gray"
        outlined
        @click="confirmationDialog = true"
      >
        <v-icon left small class="material-icons-round">delete</v-icon>
        Eliminar
      </v-chip>
    </template>
  </div>
</template>

<script>
import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";

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
  },
  data() {
    return {
      confirmationDialog: false,
    };
  },
  methods: {
    doAction() {
      this.$emit("click");
    },
  },
  components: { ConfirmationDialog },
};
</script>
