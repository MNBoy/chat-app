import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
export default {
  state: {
    token: null,
    user: null,
    didAutoLogout: false,
  },
  mutations,
  actions,
  getters,
};
