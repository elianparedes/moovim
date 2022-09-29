<template>
  <i :class="standardClass">{{ parsed.id }}</i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    parsed() {
      const check = (customSuffixes, standardSuffix) => {
        for (let suffix of customSuffixes) {
          suffix = `_${suffix}`;
          if (this.name.endsWith(suffix)) {
            return {
              suffix: standardSuffix,
              id: this.name.substring(0, this.name.indexOf(suffix)),
            };
          }
        }
        return false;
      };

      return (
        check(["fill", "filled"], "") ||
        check(["round", "rounded"], "round") || {
          suffix: "",
          id: this.name,
        }
      );
    },
    standardClass() {
      if (this.parsed.suffix) {
        return `material-icons-${this.parsed.suffix}`;
      }
      return "material-icons";
    },
  },
};
</script>
