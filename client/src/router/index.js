import { createRouter, createWebHashHistory } from "vue-router";
import TextField from "../components/Secret/TextField";
import PageNotFound from "../components/PageNotFound";
import ContentUser from "../components/Secret/ContentUser";

const routes = [
  {
    path: "/",
    name: "home",
    component: TextField,
  },
  {
    path: "/:id",
    name: "getContent",
    component: ContentUser,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
