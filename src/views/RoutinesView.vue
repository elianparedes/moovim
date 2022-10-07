<template>
  <div
    id="routines"
    class="d-flex"
    style="gap: 32px; height: calc(100vh - 128px)"
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
      <v-toolbar
        color="transparent"
        style="
          position: sticky;
          top: 0px;
          z-index: 1;
          height: 96px;
          background-image: linear-gradient(#181818, rgba(24, 24, 24, 0));
        "
        flat
        class="mb-4"
      >
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

      <div class="d-flex flex-column px-3" style="gap: 16px">
        <v-row class="text-body-1">
          <v-col cols="4">
            <div class="text-body-1">
              Calentamiento<span>
                <v-icon size="24px" class="ml-4 material-icons-round"
                  >loop</v-icon
                >
                2
              </span>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1" align="center">
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
          <v-spacer> </v-spacer>
        </v-row>

        <v-expansion-panels flat style="z-index: 0" multiple>
          <ExerciseViewCard
            v-for="session in sessions"
            :key="session"
            :sessions="session"
            exercise="Skipping"
            category="Tren inferior"
            class="mb-4 rounded-xl"
          ></ExerciseViewCard>
        </v-expansion-panels>

        <div class="text-body-1">
          Principal<span>
            <v-icon size="24px" class="ml-4 material-icons-round">loop</v-icon>
            4
          </span>
        </div>
        <v-expansion-panels flat style="z-index: 0" multiple>
          <ExerciseViewCard
            v-for="session in sessions1"
            :key="session"
            :sessions="session"
            exercise="Hola"
            category="adgaadgadgadgdg"
            class="mb-4 rounded-xl"
          ></ExerciseViewCard
        ></v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutResultCard from "@/components/WorkoutResultCard.vue";
import routines from "@/assets/mock/routines.json";
import ExerciseViewCard from "@/components/ExerciseViewCard.vue";
export default {
  name: "RoutinesView",
  components: {
    WorkoutResultCard,
    ExerciseViewCard,
  },
  data: () => ({
    routines: routines,
    items: [
      { icon: "home", title: "Inicio" },
      { icon: "search", title: "Explorar" },
      { icon: "fitness_center", title: "Mis Rutinas" },
    ],
    sessions1: [
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
    ],
    sessions: [
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
      [
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
        { reps: 13, weight: 13, secs: 13 },
      ],
    ],
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
