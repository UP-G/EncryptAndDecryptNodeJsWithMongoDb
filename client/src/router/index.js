import { createRouter, createWebHashHistory } from "vue-router";
import TextField from "../components/Secret/TextField";

const routes = [
  {
    path: "/",
    name: "home",
    component: TextField,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
