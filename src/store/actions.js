export default {
  async getUsers(context) {
    const api = context.getters.api;
    const token = context.getters.getToken;
    const currentUser = context.getters.getUser;

    let url = api + "users";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to get Users.");
      context.dispatch("logout");
      return error;
    }

    const users = responseData.users.filter((user) => user.username.toLowerCase() !== currentUser.username.toLowerCase());
    context.commit("setUsers", {
      users,
    });
  },
  async getMessages(context, payload) {
    const api = context.getters.api;
    const token = context.getters.getToken;
    const userId = payload.userId;

    let url = api + "messages/" + userId;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch Messages.");
      return error;
    }

    return responseData.messages;
  },
  async sendMessage(context, payload) {
    const api = context.getters.api;
    const token = context.getters.getToken;
    const userId = payload.userId;
    const message = payload.message;

    let url = api + "sendMessage/" + userId;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to connect api.");
      throw error;
    }

  },
};
