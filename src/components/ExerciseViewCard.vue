<template>
  <v-expansion-panel style="background-color: #252525">
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

        <v-col cols="1" class="text-h6 font-weight-light">
          {{ "S" + 1 }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ sessions[0].reps }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ sessions[0].weight }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ sessions[0].secs }}
        </v-col>

        <v-spacer> </v-spacer>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pr-6">
      <v-row v-for="(session, n) in sessions" :key="session">
        <v-col cols="4"> </v-col>
        <v-spacer> </v-spacer>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ "S" + (n + 2) }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ session.reps }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ session.weight }}
        </v-col>
        <v-col cols="1" class="text-h6 font-weight-light">
          {{ session.secs }}
        </v-col>
        <v-spacer> </v-spacer>
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
  data() {
    return {
      sessionNumber: 1,
    };
  },
  methods() {},
};
</script>
