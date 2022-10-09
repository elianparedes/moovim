<template>
  <div>
  <div style="height: 128px">
    <SwitchButton :chip-content="['Categorias','Descubrir']">
      
    </SwitchButton>
    <v-spacer class="my-8"></v-spacer>
    <div class="font-weight-thin text-h6 d-flex row">
      <span class="mx-2">Rutinas de otros usuarios</span>
      <v-spacer></v-spacer>
      <SwitchButton class="mx-6"
          :chip-content="['Populares','Verificados','Recientes']" :vue-style="'mx-1'"></SwitchButton>
    </div>
  </div>
    <!--
  <div class="mr-4">
      <v-layout row wrap >
        <v-flex  v-for="routine in routines"
                 :key="routine.id" md4 class="pa-2" style="max-width: 500px">

          <WorkoutResultCard
              :key="routine.id"
              :name="routine.name"
              :desc="routine.desc"
              :image="routine.image"
              :author="routine.author"
              :avatar="routine.avatar"
              :verified="routine.verified"
              :stars="routine.stars"
              :bookmarks="routine.bookmarks"
              :click="toggle"
              :active="active"
          />
        </v-flex>
        <v-flex v-for="routine in routines"
                :key="routine.id" md4 class="pa-2" style="max-width: 500px">
          <WorkoutResultCard
              :key="routine.id"
              :name="routine.name"
              :desc="routine.desc"
              :image="routine.image"
              :author="routine.author"
              :avatar="routine.avatar"
              :verified="routine.verified"
              :stars="routine.stars"
              :bookmarks="routine.bookmarks"
              :click="toggle"
              :active="active"
          />
        </v-flex>
      </v-layout>
  </div> -->
    <div>
      <!--
      <v-carousel style="background-color: aqua" hide-delimiters height="100%">
        <v-carousel-item v-for="i in Math.ceil(routines.length / 6)" :key="i" >
          <v-row v-for="k in 2" :key="k">
            <v-col v-for="j in 3" :key="j">

          <WorkoutResultCard  v-for="(routine,index) in routines" :key="routine.id"
                              v-show="index <= i*6 & ((index+1) > (i-1)*6) & (((index+1)%6 === 0 & k*j === 6) || ((index+1)%6) === (3*(k-1) + j))"
                              :name="routine.name"
                              :desc="routine.desc"
                              :image="routine.image"
                              :author="routine.author"
                              :avatar="routine.avatar"
                              :verified="routine.verified"
                              :stars="routine.stars"
                              :bookmarks="routine.bookmarks"
                              :click="toggle"
                              :active="active"/>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel> -->

      <v-carousel style="background-color: aqua" hide-delimiters height="100%">
        <v-carousel-item v-for="i in Math.ceil(routines.length / 6)" :key="i" >
          <v-row rows="3" v-for="k in [(i-1)*2,((i-1)*2)+1]" :key="k">
            <v-col cols="4" v-for="routine in ([0,0,0].map((a,b) => ((routines.slice((k)*3,(k+1)*3))[b])))" :key="routine.id">
              <WorkoutResultCard
                                  :name="routine.name"
                                  :desc="routine.desc"
                                  :image="routine.image"
                                  :author="routine.author"
                                  :avatar="routine.avatar"
                                  :verified="routine.verified"
                                  :stars="routine.stars"
                                  :bookmarks="routine.bookmarks"
                                  :click="toggle"
                                  :active="active"/>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>

    </div>
  </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import routines from "@/assets/mock/routines.json";
export default {
  name: "DiscoverView",
  components: {WorkoutResultCard,SwitchButton},
  data: () => {
    return {
      routines: routines,
      indexes: [1,2,3,4,5,6,7,8,9,10,11]
    }
  }
}
</script>

<style scoped>

</style>