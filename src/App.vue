<template>
  <v-app style="background: #181818; overflow-y: hidden">
    <v-navigation-drawer app color="transparent" floating width="300px">
      <v-spacer style="height: 90px"></v-spacer>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :ripple="false"
        >
          <v-list-item-icon class="material-icons-round">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="transparent" class="px-14" flat>
      <v-spacer></v-spacer>
      <v-avatar class="my-8" size="36px">
        <img
          src="https://avatars.akamai.steamstatic.com/dfa968b1f7f631cf91c0d26e47e7a6b7d029094b_full.jpg"
          alt="saul"
      /></v-avatar>
    </v-app-bar>
    <v-main>
      <div class="d-flex pa-4">
        <v-item-group
          mandatory
          class="pa-1 d-flex flex-column"
          style="overflow-y: scroll; gap: 32px; height: 100%"
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
        <div class="px-8" style="flex: 90%; overflow-y: scroll; height: 100%">
          <v-toolbar color="transparent" flat class="mb-4">
            <v-toolbar-title class="font-weight-bold text-h3"
              >Superseries</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <div>
              <v-chip class="px-10" color="white" outlined>
                <v-icon left small>edit</v-icon>
                Editar rutina
              </v-chip>
            </div>
          </v-toolbar>

          <div class="d-flex flex-column px-4" style="gap: 16px">
            <div class="text-subtitle-1">
              Calentamiento<v-icon size="20px" class="mx-4">loop</v-icon>2
            </div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div class="text-subtitle-1">
              Principal<v-icon size="20px" class="mx-4">loop</v-icon>4
            </div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
            <div
              style="
                height: 100px;
                background-color: #252525;
                border-radius: 16px;
              "
            ></div>
          </div>
        </div>
      </div>
    </v-main>
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
    items: [
      { icon: "home", title: "Inicio" },
      { icon: "search", title: "Explorar" },
      { icon: "fitness_center", title: "Mis Rutinas" },
    ],
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
