import { createStore } from "vuex";
import user from "./modules/user";
import articles from "./modules/articles";

export default createStore({
  modules: {
    user,
    articles,
  },
});
