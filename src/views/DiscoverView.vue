<template>
  <div>
    <div style="height: 80px">
      <v-spacer class="my-8"></v-spacer>
      <div class="font-weight-thin text-h6 d-flex row">
        <span class="mx-2">Rutinas de otros usuarios</span>
        <v-spacer></v-spacer>
        <SwitchButton
          class="mx-6"
          :chip-content="['Mas recientes', 'Mas antiguos', 'Mas faciles', 'Mas dificiles']"
          :vue-style="'mx-1'"
          v-on:newOrder="
            $event === 'Mas recientes'
              ? getOrderedWrapper('date', 'desc')
              : $event === 'Mas antiguos'
              ? getOrderedWrapper('date', 'asc')
              : $event === 'Mas faciles'
              ? getOrderedWrapper('difficulty', 'asc')
              : getOrderedWrapper('difficulty', 'desc')
          "
        ></SwitchButton>
      </div>
    </div>
    <div class="mr-6">
      <v-carousel hide-delimiters height="100%" cycle show-arrows-on-hover>
        <v-carousel-item
          v-for="i in Math.ceil(routines.length / 6)"
          :key="i"
          height="100%"
        >
          <v-row v-for="k in [(i - 1) * 2, (i - 1) * 2 + 1]" :key="k">
            <v-col
              v-for="routine in getArray(k)"
              :key="routine.id"
              md="4"
              xs="3"
            >
              <router-link
                :to="`routines/${routine.name}-${routine.id}`"
                style="text-decoration: none; color: inherit"
              >
              <WorkoutResultCard
                v-if="routine"
                :routineId="routine.id"
                :name="routine.name"
                :desc="routine.detail"
                :image="routine.metadata.image"
                :author="routine.user.username"
                :avatar="routine.user.avatarUrl"
                :verified="routine.verified"
                :stars="routine.score"
                :bookmarks="routine.bookmarks"
              />
            </router-link>
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
