import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import MaterialIcon from "@/components/MaterialIcon";

function missingMaterialIcons(ids) {
  const icons = {};
  for (const id of ids) {
    for (const suffix of ["fill", "round"]) {
      const name = `${id}_${suffix}`;
      icons[name] = {
        component: MaterialIcon,
        props: {
          name,
        },
      };
    }
  }
  return icons;
}

Vue.use(Vuetify, {
  icons: {
    values: {
      ...missingMaterialIcons(["star", "bookmark"]),
    },
  },
});

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#BF3D3D',
        accent: '#BF3D3D',
        error: '#BF9B3D',
      }
    }
  } 
}
);
