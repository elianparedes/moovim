<template>
  <v-app :style="{ background: $vuetify.theme.themes['dark'].background }">
    <v-item-group mandatory>
      <div class="pa-2" style="width: 700px; height: 700px; overflow-y: scroll">
        <v-item
          v-slot="{ active, toggle }"
          v-for="routine in routines"
          :key="routine.id"
        >
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
        </v-item>
      </div>
      <div
        class="red"
        style="
          position: absolute;
          bottom: 0;
          left: 0;
          height: 50px;
          width: 100%;
        "
      ></div>
    </v-item-group>
  </v-app>
</template>

<script>
import WorkoutResultCard from "./components/WorkoutResultCard.vue";
import routines from "./assets/mock/routines.json";
export default {
  name: "App",
  components: {
    WorkoutResultCard,
  },
  data: () => ({
    routines: routines,
  }),
};
</script>

<style scoped>
::-webkit-scrollbar-corner {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 8px;
  background-clip: padding-box;
}
</style>
