<template>
  <div>
    <h1>Home</h1>
    <v-dialog
        width="500"
        transition="fade-transition"
        class="rounded-xl"
        persistent
        v-model="stepDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-chip class="px-10" color="white" @click="stepDialog=true" outlined v-bind="attrs" v-on="on">
          <v-icon left small class="material-icons-round">add</v-icon>
          Nuevo ciclo
        </v-chip>
      </template>
      <AddExerciseSteps @finish="stepDialog=false">hola</AddExerciseSteps>
    </v-dialog>
  </div>
</template>

<script>

import AddExerciseSteps from "@/components/AddExerciseSteps";

export default {
  components: {AddExerciseSteps},
  data: () => {
    return {
      stepDialog: false
    }
  }
}
</script>

<style scoped>

</style>