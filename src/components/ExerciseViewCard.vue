<template>
  <v-card
    class="pl-4 mb-8"
    flat
    style="cursor: pointer"
    color="transparent"
    :ripple="false"
    @click.native="click"
  >
    <AddExerciseSteps v-if="stepDialog" v-model="stepDialog" :exerciseId="id" />

    <v-row
      align="center"
      class="text-body-1"
      style="background-color: #252525"
      :class="{ 'active-card': active }"
    >
      <v-col cols="6">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
              {{ detail }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col
        cols="1"
        :class="{
          'grey--text text--darken-2 text-center': repetitions === null,
        }"
        class="text-h6 font-weight-light text-center"
      >
        {{ repetitions ? repetitions : "•" }}
      </v-col>
      <v-col
        cols="1"
        :class="{ 'grey--text text--darken-2 text-center': weight === null }"
        class="text-h6 font-weight-light text-center"
      >
        {{ weight ? weight : "•" }}
      </v-col>
      <v-col
        cols="1"
        :class="{
          'grey--text text--darken-2 text-center': duration === null,
        }"
        class="text-h6 font-weight-light text-center"
      >
        {{ duration }}
      </v-col>
      <v-spacer></v-spacer>

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
  </v-card>
</template>

<script>
import AddExerciseSteps from "@/components/AddExerciseSteps.vue";
export default {
  name: "ExerciseViewCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    repetitions: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    click: {
      default: () => ({}),
      type: Function,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      items: [
        { title: "Ver detalles", action: this.showMore },
        { title: "Añadir a rutina...", action: this.add },
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
.active-card {
  outline: solid #bf3d3d 2px;
}
</style>
