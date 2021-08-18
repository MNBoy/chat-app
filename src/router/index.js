import { createRouter, createWebHistory } from "vue-router";
import TheHome from "../views/TheHome.vue";
import TheLogin from "../views/auth/TheLogin.vue";
import TheSignup from "../views/auth/TheSignup.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "TheHome",
    component: TheHome,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "TheLogin",
    component: TheLogin,
    meta: { requiresUnauth: true },
  },
  {
    path: "/signup",
    name: "TheSignup",
    component: TheSignup,
    meta: { requiresUnauth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
