<template>
  <div
    id="routines"
    class="d-flex"
    style="gap: 32px; height: calc(100vh - 96px)"
  >
    <v-item-group
      mandatory
      class="px-4 py-1 d-flex flex-column"
      style="overflow-y: auto; gap: 32px"
      v-model="selected"
    >
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
    </v-item-group>
    <div style="flex: 90%; overflow-y: scroll">
      <div style="position: sticky; top: 0px; z-index: 1">
        <v-toolbar color="#181818" flat>
          <v-toolbar-title class="font-weight-bold text-h3">{{
            routines[selected]?.name
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-chip class="px-10" color="white" outlined @click="editRoutine">
              <v-icon left small class="material-icons-round">edit</v-icon>
              Editar rutina
            </v-chip>
          </div>
        </v-toolbar>
        <div
          style="
            height: 64px;
            width: 100%;
            background-image: linear-gradient(#181818, rgba(24, 24, 24, 0));
          "
        ></div>
      </div>
      <div
        v-for="(stage, n) in exercises"
        :key="n"
        class="d-flex flex-column px-4 mb-4"
      >
        <v-row class="text-body-1 mb-4">
          <v-col cols="4">
            <div>
              {{ stage.name
              }}<span>
                <v-icon size="24px" class="ml-4 material-icons-round"
                  >loop</v-icon
                >
                {{ stage.loops }}
              </span>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <!---<v-col cols="1" align="center">
            <v-icon size="24px" class="material-icons-round pl-2"
              >replay</v-icon
            >
          </v-col>
          <v-col cols="1" align="center">
            <v-icon size="24px" class="material-icons-round"
              >fitness_center</v-icon
            ></v-col
          >
          <v-col cols="1" align="center"
            ><v-icon size="24px" class="material-icons-outlined pr-4"
              >timer</v-icon
            >
          </v-col>
          <v-spacer> </v-spacer>-->
        </v-row>

        <v-expansion-panels flat style="z-index: 0" multiple>
          <ExerciseViewCard
            v-for="exercise in stage.exercises"
            :key="exercise.name"
            :sessions="exercise.sessions"
            :exercise="exercise.name"
            :category="exercise.desc"
            class="mb-4 rounded-xl"
          ></ExerciseViewCard>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import routines from "@/assets/mock/routines.json";
import routinesExercises from "@/assets/mock/routine-exercises.json";
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";
export default {
  name: "RoutinesView",
  components: {
    WorkoutResultCard,
    ExerciseViewCard,
  },
  mounted: () => {
    fetch(
      "http://localhost:5000/api/users?page=0&size=10&orderBy=username&direction=asc"
    )
      .then((res) => JSON.stringify(res))
      .then((data) => console.log(data));
  },
  data: () => ({
    routines: routines,
    items: [
      { icon: "home", title: "Inicio" },
      { icon: "search", title: "Explorar" },
      { icon: "fitness_center", title: "Mis Rutinas" },
    ],
    exercises: routinesExercises,
    selected: Number,
  }),
  methods: {
    editRoutine() {
      this.$router.push("/routines/edit");
    },
  },
};
</script>

<style>
.v-expansion-panel:not(:first-child)::after {
  border-top: 0;
}

/*.v-main__wrap {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}*/
</style>
