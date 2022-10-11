<template>
<div >

    <div style="height: 100px">
      <v-spacer class="my-8"></v-spacer>
      <div class="font-weight-thin text-h6 d-flex row">
        <span class="mx-2">Rutinas de otros usuarios</span>
        <v-spacer></v-spacer>
        <SwitchButton
          class="mx-6"
          :chip-content="['Populares', 'Verificados', 'Recientes']"
          :vue-style="'mx-1'"
        ></SwitchButton>
      </div>
    </div>
    <div>
      <v-carousel hide-delimiters height="100%" cycle show-arrows-on-hover>
        <v-carousel-item v-for="i in Math.floor(routines.length / 6)" :key="i" height="100%">
          <v-row
            v-for="k in [(i - 1) * 2, (i - 1) * 2 + 1]"
            :key="k"

          >
            <v-col v-for="routine in getArray(k)" :key="routine.id" md="4" xs="3">
              <WorkoutResultCard
                v-if="routine"
                :name="String(routine.id)"
                :desc="routine.desc"
                :image="routine.image"
                :author="routine.author"
                :avatar="routine.avatar"
                :verified="routine.verified"
                :stars="routine.stars"
                :bookmarks="routine.bookmarks"
              />
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  <div class="font-weight-thin text-h6 my-2">
    <span class="mx-2">Ejercicios</span>
    </div>
  <div>
      <ExerciseSummaryCard v-for="n in 15" :key="n" category="Bíceps" :exercise="'Curl con barra'+ ' ' + n" class="my-4 mr-6"></ExerciseSummaryCard>
    </div>
  </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import routines from "@/assets/mock/routines.json";
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
export default {
  name: "DiscoverView",
  components: { ExerciseSummaryCard, WorkoutResultCard, SwitchButton },
  data: () => {
    return {
      routines: routines,
      carousel: 0
    };
  },
  methods: {
    getArray(k) {
      return [0, 0, 0].map(
        (a, b) => routines.slice(k * 3, (k + 1) * 3)[b] || 0
      );
    },
  },
};
</script>

<style scoped></style>
