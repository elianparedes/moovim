<template>
  <v-chip color="white"
          :class="[{'hidden-border': this.toggle},vueStyle]"
          :ripple="false"
          v-bind="[{outlined : !this.toggle}]"
          @click="clickHandler">
    <slot>

    </slot>
  </v-chip>
</template>

<script>
export default {
  name: "SelectButton",
  props:{
    toggle :{
      type: Boolean,
      default: false
    },
    vueStyle:{
      type: String,
      required: true
    },
  },
  methods:{
    clickHandler(){
      this.$emit('click')
    }
  },
  computed:{

  }

}
</script>

<style scoped>
.hidden-border{
  border-width: thin;
  border-style: solid;
}
</style>