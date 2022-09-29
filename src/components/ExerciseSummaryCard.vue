<template>
  <v-card class="rounded-lg ma-8 card" outlined>
    <v-card-title class="text-md-h6">
      {{ exercise }}
    </v-card-title>
    <v-card-subtitle>
      {{ category }}
    </v-card-subtitle>
    <v-card-text class="d-flex" style="gap:20px;">
      <span v-show="sets">
        <span>
        {{sets}} x
        </span>
        <span v-show="repetitions">
          {{repetitions}}
        </span>
      </span>
      <span v-show="weight">
        {{weight}}kg
      </span>
      <span v-show="time">
        {{time}}s
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ExerciseSummaryCard',
  props: {
    exercise: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sets:{
      type: String,
      required: false,
    },
    repetitions: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    }
  }
};
</script>

<style>
.card {
  height: 115px;
  width: 812px;
}
</style>