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
        props:{ viewIndex: 0}
      },
      {
        path: "discover",
        name: "Descubrir",
        component: () => import("../views/DiscoverView.vue"),
        props:{ viewIndex: 1}
      }
    ]
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
    path: "/routines/edit/:name-:id",
    name: "edit",
    component: () => import("../views/EditView.vue"),
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/verify",
    name: "verify",
    component: () => import("../views/VerificationView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
