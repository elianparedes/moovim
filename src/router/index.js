import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/explore",
    name: "explore",
    component: () => import("../views/ExploreView.vue"),
  },
  {
    path: "/routines",
    name: "routines",
    component: () => import("../views/RoutinesView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/routines/edit",
    name: "edit",
    component: () => import("../views/EditView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
