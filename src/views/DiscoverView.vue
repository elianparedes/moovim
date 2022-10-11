<template>
  <div>
    <div style="height: 128px">
      <SwitchButton :chip-content="['Categorias', 'Descubrir']"> </SwitchButton>
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
      <v-carousel hide-delimiters height="100%">
        <v-carousel-item v-for="i in Math.ceil(routines.length / 6)" :key="i">
          <v-row
            v-for="k in [(i - 1) * 2, (i - 1) * 2 + 1]"
            :key="k"
            style="width: 100%; height: 290px"
          >
            <v-col v-for="routine in getArray(k)" :key="routine.id">
              <WorkoutResultCard
                v-if="routine"
                :name="routine.name"
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
  </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton.vue";
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import routines from "@/assets/mock/routines.json";
export default {
  name: "DiscoverView",
  components: { WorkoutResultCard, SwitchButton },
  data: () => {
    return {
      routines: routines,
      indexes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
