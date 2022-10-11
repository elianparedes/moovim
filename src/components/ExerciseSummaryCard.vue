<template>
    <v-row no-gutters>
      <v-col cols="12">
  <v-card class="rounded-lg  card" flat color="#252525">
    <v-card-title class="text-md-h6">
      {{ exercise }}
    </v-card-title>
    <v-card-subtitle>
      {{ category }}
    </v-card-subtitle>
  </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "ExerciseSummaryCard",
  props: {
    exercise: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped>

</style>
