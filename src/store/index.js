import { createStore } from "vuex";
import authModule from "./modules/auth/index";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default createStore({
  state: {
    api: "https://chat-app-mnboy.herokuapp.com/",
    users: [],
  },
  getters,
  actions,
  mutations,
  modules: {
    auth: authModule,
  },
});
