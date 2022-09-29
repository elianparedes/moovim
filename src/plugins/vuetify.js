import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {colors} from "vuetify/lib";

Vue.use(Vuetify);
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#3F3F3F",
                secondary: "#252525",
                accent: "#BF3D3D",
                background: "#181818"
                //...
            },
            dark: {
                primary: colors.blue.lighten3,
                secondary: "#252525",
                accent: "#252525",
                error: "#252525",
                background: "#181818"
                //...
            }
        },
    },
    icons: {
        iconfont: 'mdiSvg'
    },
});
