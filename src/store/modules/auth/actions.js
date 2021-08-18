let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const api = context.getters.api;
    const mode = payload.mode;
    let url = api + "auth/login";

    if (mode === "signup") {
      url = api + "auth/signup";
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to authenticate. Check your login data.");
      return error;
    }

    const expiresIn = 1000 * 60 * 60; // 1 hour
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("user", JSON.stringify(responseData.user));
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.token,
      user: responseData.user,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token) {
      context.commit("setUser", {
        token: token,
        user: JSON.parse(user),
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      user: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
