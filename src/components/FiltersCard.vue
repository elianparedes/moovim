<template>
  <div class="my-2">
    <v-layout column>
      <v-flex class="mb-n1 py-1 d-flex flex-row-reverse" align-self-end>

        <v-card flat style="background-color: transparent; margin: 0">
          <v-card-text class="white--text px-0">
            <v-btn icon left @click="expand=!expand">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
            Filtros
          </v-card-text>
        </v-card>
        <v-card flat style="background-color: transparent; margin: 0" class="mr-12" v-show="expand">
          <v-card-text class="white--text px-0">
            <v-btn icon left @click="restoreFilters">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            Borrar filtros
          </v-card-text>
        </v-card>

      </v-flex>

      <v-expand-transition duration="200" >
      <v-flex class="mt-n1 pt-1"  v-if="expand">

      <v-card color="#252525" :rounded="'lg'" flat>
        <v-layout row>
        <v-flex class="px-8 py-4" md3 wrap>
          <div class="text-h6 font-weight-thin">Categorías</div>
          <div class="my-2">
            <SelectButton v-for="categoria in categorias" :key="categoria" vue-style="mr-2 my-1"
                          :toggle="categoria.toggle" @click="categoria.toggle=!categoria.toggle">
              {{categoria.text}}</SelectButton>
          </div>
        </v-flex >

          <v-flex md6 wrap class="px-8 py-4">
          <div class="text-h6 font-weight-thin">Grupos Musculares</div>
          <div class="my-2">
            <SelectButton v-for="grupo in gruposMusculares" :key="grupo" vue-style="mr-2 my-1"
            :toggle="grupo.toggle" @click="grupo.toggle=!grupo.toggle">{{grupo.text}}</SelectButton>
          </div>
          </v-flex>

          <v-flex class="px-8 py-4" md3 wrap>
            <div class="text-h6 font-weight-thin">Dificultad</div>
            <div class="my-2">
              <div class="my-2">
                <SelectButton v-for="dificultad in dificultades" :key="dificultad" vue-style="mr-2 my-1"
                              :toggle="dificultad.toggle" @click="dificultad.toggle=!dificultad.toggle">
                  {{dificultad.text}}</SelectButton>
              </div>
            </div>
          </v-flex >
        </v-layout>
      </v-card>

      </v-flex>
      </v-expand-transition>

      <v-flex class="mt-n4 d-flex flex-row-reverse" align-self-end v-if="expand">

      </v-flex>

    </v-layout>
  </div>


</template>

<script>
//import SelectButton from "@/components/SelectButton";
import SelectButton from "@/components/SelectButton";
export default {
  name: "FiltersCard",
  components: {SelectButton},
  data: () => ({
    expand: false,
    gruposMusculares: [{text:"Pecho",toggle:false},
      {text:"Hombros",toggle:false},
      {text:"Tríceps",toggle:false},
      {text:"Isquiotibiales",toggle:false},
      {text:"Glúteos",toggle: false},
      {text:"Espalda",toggle:false},
      {text:"Abdominales",toggle:false},
      {text:"Bíceps",toggle:false},
      {text:"Cuádriceps",toggle:false}],
    categorias: [{text:"Rutinas",toggle:false},{text:"Ejercicios",toggle:false}],
    dificultades: [{text:"Fácil",toggle:false},
      {text:"Intermedio",toggle:false},
      {text:"Díficil",toggle:false}]

  }),
  methods: {
    restoreFilters(){
      for (let i = 0; i < this.gruposMusculares.length; i++) {
        this.gruposMusculares[i].toggle = false;
      }
      for (let i = 0; i < this.categorias.length; i++) {
        this.categorias[i].toggle = false;
      }
      for (let i = 0; i < this.dificultades.length; i++) {
        this.dificultades[i].toggle = false;
      }
    }
  }
}
</script>

<style scoped>

</style>