<template>
  <v-slide-x-transition mode="in-out" appear hide-on-leave>
    <div class="d-flex flex-column" style="gap: 32px">
      <div>
        <div
          class="d-flex"
          style="margin-right: calc(100vw - (500px * 3 + 16px * 6 + 256px))"
        >
          <span class="mx-2 font-weight-thin text-h6"
            >Rutinas de otros usuarios</span
          >
          <v-spacer></v-spacer>
          <SwitchButton
            :chip-content="[
              'Más recientes',
              'Más antiguos',
              'Más fáciles',
              'Más difíciles',
            ]"
            :vue-style="'mx-1'"
            v-on:newOrder="
              $event === 'Más recientes'
                ? getOrderedWrapper('date', 'desc')
                : $event === 'Más antiguos'
                ? getOrderedWrapper('date', 'asc')
                : $event === 'Más fáciles'
                ? getOrderedWrapper('difficulty', 'asc')
                : getOrderedWrapper('difficulty', 'desc')
            "
          ></SwitchButton>
        </div>
      </div>
      <div
        style="
          padding-bottom: 16px;
          margin-right: calc(100vw - (500px * 3 + 16px * 6 + 256px));
        "
      >
        <v-row class="mb-6">
          <v-col cols="4" v-for="routine in routines" :key="routine.name">
            <v-fade-transition appear>
              <router-link
                :to="`routines/${routine.name}-${routine.id}`"
                style="text-decoration: none; color: inherit"
              >
                <WorkoutResultCard
                  :routineId="routine.id"
                  :name="routine.name"
                  :desc="routine.detail"
                  :image="routine.metadata.image"
                  :author="routine.user.username"
                  :avatar="routine.user.avatarUrl"
                  :verified="routine.verified"
                  :stars="routine.score"
                  :bookmarks="routine.bookmarks" /></router-link
            ></v-fade-transition>
          </v-col>
        </v-row>
      </div></div
  ></v-slide-x-transition>
</template>

<script>
import SwitchButton from "@/components/SwitchButton";
import WorkoutResultCard from "@/components/WorkoutResultCard";
import { mapActions } from "pinia";
import { useRoutineStore } from "@/stores/routineStore";
export default {
  name: "DiscoverView",
  components: {
    WorkoutResultCard,
    SwitchButton,
  },
  routines: [],

  data: () => {
    return {
      routines: [],
      carousel: 0,
    };
  },
  methods: {
    getArray(k) {
      return [0, 0, 0].map(
        (a, b) => this.routines.slice(k * 3, (k + 1) * 3)[b] || 0
      );
    },
    getOrderedWrapper(orderBy, direction) {
      this.routines = [];
      this.getOrdered(orderBy, direction, 0);
    },
    getOrdered(orderBy, direction, page) {
      this.$getPageRoutineOrdered(orderBy, direction, page)
        .then((routines) => {
          this.routines = this.routines.concat(routines.content);
          this.isLast = routines.isLastPage;
          return routines.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 6) {
            this.getOrdered(orderBy, direction, page + 1);
            return;
          }
        });
    },
    navigateToRoutine(name, id) {
      this.$router.push({
        name: "routine_detail",
        params: {
          id: id,
          name: name,
        },
      });
    },
    getAllRoutinesWrapper() {
      this.routines = [];
      this.getAllRoutines(0);
    },
    getAllRoutines(page) {
      this.$getPageRoutine(page)
        .then((routines) => {
          this.routines = this.routines.concat(routines.content);
          return routines.isLastPage;
        })
        .then((isLast) => {
          if (!isLast && page < 5) {
            this.getAllRoutines(page + 1);
            return;
          }
        });
    },
    ...mapActions(useRoutineStore, {
      $getPageRoutineOrdered: "getPageRoutineOrdered",
      $getPageRoutine: "getPageRoutine",
    }),
  },
  created() {
    this.getOrderedWrapper("date", "desc");
  },
};
</script>

<style scoped></style>
