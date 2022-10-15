<template>
  <div>
    <h1>Home</h1>
    <v-btn @click="stepDialog = true">Hola que tal</v-btn>
    <AddExerciseSteps v-model="stepDialog" :exerciseId="1" />
  </div>
</template>

<script>
import AddExerciseSteps from "@/components/AddExerciseSteps";

export default {
  components: { AddExerciseSteps },
  data: () => {
    return {
      stepDialog: false,
    };
  },
};
</script>

<style scoped></style>
