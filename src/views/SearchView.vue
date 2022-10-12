<template>
<div>
  <div  class="font-weight-thin text-h6">Resultados de "{{ this.$route.query.query }}" </div>
  <v-spacer></v-spacer>
  <FiltersCard class="mr-6 mb-n8" style="translate: 0 -60px">
  </FiltersCard>
  <div class="font-weight-thin text-h6 my-2">Rutinas</div>
  <div class="media-scroller">
    <WorkoutResultCard v-for="routine in routines"
                       :key="routine.text"
                       class="d-inline-block mr-4"
        :name="String(routine.id)"
        :desc="routine.desc"
        :image="routine.image"
        :author="routine.author"
        :avatar="routine.avatar"
        :verified="routine.verified"
        :stars="routine.stars"
        :bookmarks="routine.bookmarks"
    />
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
import FiltersCard from "@/components/FiltersCard";
import routines from "@/assets/mock/routines.json";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
export default {
  name: "SearchView",
  components: {FiltersCard,WorkoutResultCard, ExerciseSummaryCard},
  data: () => {
    return {
      routines: routines
    };
  },
}
</script>

<style>
.media-scroller{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 33%;
  overflow-x: auto;
  padding-bottom: 16px;
}
::-webkit-scrollbar-track {
  margin-right: calc(100vw - ( 3 *396px + 16px * 4 + 256px));
  background-color: #1e1e1e;
  border-radius: 8px;
}
</style>