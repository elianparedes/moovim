<template>
  <div>
    <div class="font-weight-thin text-h6">
      Resultados de "{{ this.$route.query.query }}"
    </div>
    <v-spacer></v-spacer>

    <div class="my-2 mr-16">
      <v-layout column>
        <v-flex class="mb-n1 py-1 d-flex flex-row-reverse" align-self-end>
          <v-card flat style="background-color: transparent; margin: 0">
            <v-card-text class="white--text px-0">
              <v-btn icon left @click="expand = !expand">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
              Filtros
            </v-card-text>
          </v-card>
          <v-card
            flat
            style="background-color: transparent; margin: 0"
            class="mr-12"
            v-show="expand"
          >
            <v-card-text class="white--text px-0">
              <v-btn icon left @click="restoreFilters">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              Borrar filtros
            </v-card-text>
          </v-card>
        </v-flex>

        <v-expand-transition duration="200">
          <v-flex class="mt-n1 pt-1" v-if="expand">
            <v-card color="#252525" :rounded="'lg'" flat>
              <v-layout row>
                <v-flex class="px-8 py-4" md3 wrap>
                  <div class="text-h6 font-weight-thin">Categorías</div>
                  <div class="my-2">
                    <SelectButton
                      v-for="categoria in categorias"
                      :key="categoria.text"
                      vue-style="mr-2 my-1"
                      :toggle="categoria.toggle"
                      @click="
                        categoria.toggle = !categoria.toggle;
                        categoria.toggle
                          ? categoriasArray.push(categoria.text)
                          : categoriasArray.splice(
                              categoriasArray.indexOf(categoria.text),
                              1
                            );
                      "
                    >
                      {{ categoria.text }}</SelectButton
                    >
                  </div>
                </v-flex>

                <v-flex md6 wrap class="px-8 py-4">
                  <div class="text-h6 font-weight-thin">Grupos Musculares</div>
                  <div class="my-2">
                    <SelectButton
                      v-for="grupo in gruposMusculares"
                      :key="grupo.text"
                      vue-style="mr-2 my-1"
                      :toggle="grupo.toggle"
                      @click="
                        grupo.toggle = !grupo.toggle;
                        grupo.toggle
                          ? muscularesArray.push(grupo.text)
                          : muscularesArray.splice(
                              muscularesArray.indexOf(grupo.text),
                              1
                            );
                      "
                      >{{ grupo.text }}</SelectButton
                    >
                  </div>
                </v-flex>

                <v-flex class="px-8 py-4" md3 wrap>
                  <div class="text-h6 font-weight-thin">Dificultad</div>
                  <div class="my-2">
                    <div class="my-2">
                      <SelectButton
                        v-for="dificultad in dificultades"
                        :key="dificultad.text"
                        vue-style="mr-2 my-1"
                        :toggle="dificultad.toggle"
                        @click="
                          dificultad.toggle = !dificultad.toggle;
                          dificultad.toggle
                            ? dificultadesArray.push(dificultad.text)
                            : dificultadesArray.splice(
                                dificultadesArray.indexOf(dificultad.text),
                                1
                              );
                        "
                      >
                        {{ dificultad.text }}</SelectButton
                      >
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-expand-transition>

        <v-flex
          class="mt-n4 d-flex flex-row-reverse"
          align-self-end
          v-if="expand"
        >
        </v-flex>
      </v-layout>
    </div>

    <div v-show="categoriasArray.includes('Rutinas')">
      <div class="font-weight-thin text-h6 my-8">Rutinas</div>
      <div class="media-scroller">
        <router-link
          class="mr-4"
          v-for="routine in routines.filter(function (item) {
            return dificultadesArray.includes(item.difficulty);
          })"
          :key="routine.id"
          :to="`routines/${routine.name}-${routine.id}`"
          style="text-decoration: none; color: inherit"
        >
          <WorkoutResultCard
            :name="routine.name"
            :desc="routine.detail"
            :image="routine.metadata.image"
            :author="routine.user.username"
            :avatar="routine.avatar"
            :verified="routine.verified"
            :stars="routine.score"
            :bookmarks="routine.bookmarks"
        /></router-link>
      </div>
    </div>
    <div v-show="categoriasArray.includes('Ejercicios')">
      <div class="font-weight-thin text-h6 my-2">
        <span>Ejercicios</span>
      </div>
      <div>
        <ExerciseSummaryCard
          v-for="exercise in exercises.filter(function (item) {
            return muscularesArray.includes(item.detail);
          })"
          :key="exercise.id"
          :category="exercise.detail"
          :exercise="exercise.name"
          class="my-4 mr-6"
        ></ExerciseSummaryCard>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard";
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
import { useRoutineStore } from "@/stores/routineStore";
import { useExerciseStore } from "@/stores/exerciseStore";

import SelectButton from "@/components/SelectButton";

import { mapActions } from "pinia";
export default {
  name: "SearchView",
  components: {WorkoutResultCard, ExerciseSummaryCard, SelectButton},
  
  data: () => ({
  routines: [],
  exercises:[],
  expand: false,
  muscularesArray: ["Pectorales", "Hombros", "Tríceps", "Gemelos", "Piernas", "Espalda", "Abdominales", "Bíceps"],
  categoriasArray: ["Rutinas", "Ejercicios"],
  dificultadesArray: ["rookie", "intermediate", "expert"],
  gruposMusculares: [
    {text:"Pectorales",toggle:true},
    {text:"Tríceps",toggle:true},
    {text:"Gemelos",toggle:true},
    {text:"Hombros",toggle: true},
    {text:"Espalda",toggle:true},
    {text:"Abdominales",toggle:true},
    {text:"Bíceps",toggle:true},
    {text:"Piernas",toggle:true}],
  categorias: [{text:"Rutinas",toggle:true},{text:"Ejercicios",toggle:true}],
  dificultades: [{text:"rookie",toggle:true},
    {text:"intermediate",toggle:true},
    {text:"expert",toggle:true}]
  }),
  beforeMount() {
    this.searchQueryWrapper();
  },

  methods: {
    ...mapActions(useRoutineStore, {
      $getPageRoutineQuery: "getPageRoutineQuery",
    }),
    ...mapActions(useExerciseStore, {
      $getPageExerciseQuery: "getPageExerciseQuery",
    }),
    searchQueryWrapper() {
      this.exercises = [];
      this.routines = [];
      this.getAllExercisesQuery(0);
      this.getAllRoutinesQuery(0);
    },
    getAllExercisesQuery(page) {
      this.$getPageExerciseQuery(this.$route.query.query, page)
        .then((exercise) => {
          this.exercises = this.exercises.concat(exercise.content);
          return exercise.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 4) {
            this.getAllExercisesQuery(page + 1);
            return;
          }
        });
    },
    getAllRoutinesQuery(page) {
      this.$getPageRoutineQuery(this.$route.query.query, page)
        .then((routines) => {
          this.routines = this.routines.concat(routines.content);
          return routines.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 4) {
            this.getAllRoutinesQuery(page + 1);
            return;
          }
        });
    },
    restoreFilters() {
      for (let i = 0; i < this.gruposMusculares.length; i++) {
        this.gruposMusculares[i].toggle = false;
      }
      for (let i = 0; i < this.categorias.length; i++) {
        this.categorias[i].toggle = false;
      }
      for (let i = 0; i < this.dificultades.length; i++) {
        this.dificultades[i].toggle = false;
      }
      this.muscularesArray = [];
      this.dificultadesArray = [];
      this.categoriasArray = [];
    },
  },

  watch: {
    $route() {
      this.searchQueryWrapper();
    },
  },
};
</script>

<style>
.media-scroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 33%;
  overflow-x: auto;
  padding-bottom: 16px;
}
::-webkit-scrollbar-track {
  margin-right: calc(100vw - (3 * 396px + 16px * 4 + 256px));
  background-color: #1e1e1e;
  border-radius: 8px;
}
</style>
