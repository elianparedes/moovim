<template>
  <div
    class="rounded-xl card px-4 py-2 card"
    flat
    style="background-color: #252525; cursor: pointer;"
    :class="{ 'active-card': active }"
    @click="click"
    :ripple="false"
  >
    <AddExerciseSteps v-if="stepDialog" v-model="stepDialog" :exerciseId="id" />

    <v-row align="center">
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">
              {{ exercise }}
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
              {{ category }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col cols="1" align="center"
        ><v-menu bottom left rounded="lg" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs"
              ><v-icon class="material-icons-round text-center"
                >more_vert</v-icon
              ></v-btn
            >
          </template>

          <v-list>
            <v-list-item
              link
              v-for="(item, i) in items"
              :key="i"
              @click="item.action"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddExerciseSteps from "./AddExerciseSteps.vue";
export default {
  name: "ExerciseSummaryCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    exercise: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    active: Boolean,
    click: Function,
  },
  data() {
    return {
      items: [
        { title: "Añadir a rutina...", action: this.add },
        { title: "Compartir", action: this.share },
      ],
      stepDialog: false,
    };
  },
  methods: {
    add() {
      this.stepDialog = true;
    },
    share() {
      console.log("share");
    },
    showMore() {
      this.$router.push({
        name: "exercises_detail",
        params: {
          name: this.name,
          id: this.id,
        },
      });
    },
  },
  components: { AddExerciseSteps },
};
</script>

<style>
.card {
  transition: all 200ms ease-in;
  outline: solid transparent 2px;
}

.card:hover {
  transition: all 150ms ease-in-out;
  scale: 1.01;
}

.active-card {
  outline: solid #bf3d3d 2px;
}

.v-expansion-panel:not(:first-child)::after {
  border-top: 0;
}

.v-card--link:before {
  background: transparent;
}
</style>
