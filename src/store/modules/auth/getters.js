export default {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
