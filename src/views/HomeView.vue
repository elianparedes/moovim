<template>
  <div>
  <div>
    <h1>Inicio</h1>
  </div>
  <div>
    <SwitchButton :chip-content="states" @switch="switchHandler" :selected-chip="index">

    </SwitchButton>
    <div>
      {{ message }}
    </div>
  </div>
  </div>
</template>
<script>
import SwitchButton from "@/components/SwitchButton";
export default {
  components: {SwitchButton},
  data: () => {
    return {
      states: ["Left","Right"],
      index: 0
    }
  },
  methods: {
    switchHandler(i){
      this.index = i
      console.log()
    }
  },
  computed: {
    message(){
      return this.states[this.index] + " Is selected"
    }
  }
}
</script>