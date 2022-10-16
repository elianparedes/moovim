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
    children: [
      {
        path: "categories",
        name: "Categorias",
        component: () => import("../views/CategoriesView.vue"),
      },
      {
        path: "discover",
        name: "Descubrir",
        component: () => import("../views/DiscoverView.vue"),
      },
      {
        path: "search",
        name: "Buscar",
        component: () => import("../views/SearchView"),
      },
      {
        path: "objective",
        name: "Objetivos",
        component: () => import("../views/ObjectiveView"),
      },
      {
        path: "muscleGroup",
        name: "Grupos musculares",
        component: () => import("../views/muscleGroupView"),
      },
    ],
  },
  {
    path: "/routines",
    name: "routines",
    component: () => import("../views/RoutinesView.vue"),
  },
  {
    path: "/exercises",
    name: "exercises",
    component: () => import("../views/ExercisesView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileInfoView.vue"),
  },
  {
    path: "/routines/edit/:name-:id",
    name: "edit",
    component: () => import("../views/EditView.vue"),
    props: true,
  },
  {
    path: "/exercises/:name-:id",
    name: "exercises_detail",
    component: () => import("../views/ExerciseView.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/loginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/verify/:email?",
    name: "verify",
    component: () => import("../views/VerificationView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
