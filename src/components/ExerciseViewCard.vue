<template>
  <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header class="pb-0">
        <v-row align="center" class="text-body-1">
          <v-col cols="4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{exercise}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{category}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="2">
            {{'S' + sessionNumber++}}
          </v-col>
          <v-col cols="2">
            {{sessions[0].reps}}
          </v-col>
          <v-col cols="2">
            {{sessions[0].weight}}
          </v-col>
          <v-col cols="2">
            {{sessions[0].secs}}
          </v-col>
          <v-spacer>

          </v-spacer>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pr-6">
        <v-row v-for="session in sessions" :key="session">
          <v-col cols="4">

          </v-col>
          <v-col cols="2">
            {{'S' + sessionNumber++}}
          </v-col>
          <v-col cols="2">
            {{session.reps}}
          </v-col>
          <v-col cols="2">
            {{session.weight}}
          </v-col>
          <v-col cols="2">
            {{session.secs}}
          </v-col>
          <v-spacer>

          </v-spacer>
        </v-row>

      </v-expansion-panel-content>
  </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
  export default{
    name:'ExerciseViewCard',
    props: {
      exercise:{
        type: String,
        required: true
      },
      category:{
        type: String,
        required:true
      },
      sessions:{
        type: Array,
        required: true
      }
    },
    data(){
      return {
        sessionNumber : 1
      }
    },
    methods(){

    }
  };
</script>