<template>
  <v-expansion-panel style="background-color: #252525" @click="expand=!expand">
    <v-expansion-panel-header>
      <v-row align="center" class="text-body-1">
        <v-col cols="4">
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
        <v-spacer> </v-spacer>

        <v-col cols="1" class="text-h6 font-weight-light" align="center">
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light" align="center">
          <v-btn @click.stop="onClick" icon>
            <v-icon size="24px" class="material-icons-round"
              >replay</v-icon
            ></v-btn
          >
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light" align="center">
          <v-btn @click.stop="onClick" icon>
            <v-icon
              size="24px"
              class="material-icons-round"
              :class="{ 'grey--text text--darken-2': !this.hasWeight }"
              >fitness_center</v-icon
            ></v-btn
          >
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light" align="center">
          <v-btn @click.stop="onClick" icon>
            <v-icon
              size="24px"
              class="material-icons-outlined"
              :class="{ 'grey--text text--darken-2': !this.hasTime }"
              >timer</v-icon
            ></v-btn
          >
        </v-col>
        <v-spacer> </v-spacer>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pr-6">
      <v-row v-for="(session, n) in sessions" :key="session">
        <v-col cols="4"></v-col>
        <v-spacer> </v-spacer>
        <v-col cols="1" class="text-h6 font-weight-light" align="center">
          {{ "S" + (n + 1) }}
        </v-col>
        <v-col
          cols="1"
          :class="{ 'grey--text text--darken-2': session.reps === null }"
          class="text-h6 font-weight-light"
          align="center"
        >
          {{ session.reps ? session.reps : "•" }}
        </v-col>
        <v-col
          cols="1"
          :class="{ 'grey--text text--darken-2': session.weight === null }"
          class="text-h6 font-weight-light"
          align="center"
        >
          {{ session.weight ? session.weight : "•" }}
        </v-col>
        <v-col
          cols="1"
          :class="{ 'grey--text text--darken-2': session.secs === null }"
          class="text-h6 font-weight-light"
          align="center"
        >
          {{ session.secs ? session.secs : "•" }}
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ExerciseViewCard",
  props: {
    exercise: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sessions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasTime: function () {
      return this.sessions.some((session) => session.secs !== null);
    },
    hasWeight: function () {
      return this.sessions.some((session) => session.weight !== null);
    },
  },
};
</script>
