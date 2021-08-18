<template>
  <!--  BEGIN CONTENT AREA  -->
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-header">
        <nav class="breadcrumb-one" aria-label="breadcrumb">
          <div class="title">
            <h3>Chat</h3>
          </div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">Created By MNBoy</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <a target="_blank" href="https://github.com/MNBoy">GitHub</a>
            </li>
          </ol>
        </nav>

        <div class="toggle-switch">
          <label class="switch s-icons s-outline s-outline-secondary">
            <input type="checkbox" checked="" class="theme-shifter" />
            <span class="slider round" @click="toggleTheme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-moon"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                ></path>
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div class="chat-section layout-top-spacing">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="chat-system">
              <div
                class="hamburger"
                style="cursor: pointer"
                @click="toggleListUsersShow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-menu mail-menu d-lg-none"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div
                class="user-list-box"
                :class="{ 'user-list-box-show': listUsersShow }"
              >
                <div class="search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    style="height: 100%"
                    @keyup="searchUser"
                  />
                </div>
                <!-- Users List  -->
                <div class="people">
                  <div
                    class="person"
                    v-for="user in users"
                    :key="user.id"
                    :data-chat="user.id"
                    @click="getMessages(user.id, user.username)"
                  >
                    <div class="user-info">
                      <div class="f-head">
                        <img src="../assets/img/profile.png" alt="avatar" />
                      </div>
                      <div class="f-body">
                        <div class="meta-info mt-2">
                          <span class="user-name" :data-name="user.username">
                            {{
                              user.username.charAt(0).toUpperCase() +
                              user.username.slice(1)
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="chat-box"
                :class="{ 'height-calc': messages.length > 0 || openChat }"
              >
                <!-- Chat Section  -->
                <div
                  class="chat-box-inner"
                  v-if="messages.length > 0 || openChat"
                  style="height: 100%"
                >
                  <div class="chat-meta-user chat-active">
                    <div class="current-chat-user-name">
                      <span
                        ><img
                          src="../assets/img/profile.png"
                          alt="dynamic-image" /><span
                          class="name"
                          id="nameUser"
                        ></span
                      ></span>
                    </div>

                    <div class="chat-action-btn align-self-center">
                      <div
                        class="dropdown d-inline-block"
                        @click="toggleDropDown"
                      >
                        <a
                          class="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink-2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-more-vertical"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </a>

                        <div
                          class="dropdown-menu dropdown-menu-right"
                          :class="{ show: dropDown }"
                          aria-labelledby="dropdownMenuLink-2"
                          style="will-change: transform"
                        >
                          <a class="dropdown-item" href="javascript:void(0);"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-trash-2"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path
                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              ></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Delete</a
                          >
                          <a
                            class="dropdown-item"
                            href="javascript:void(0);"
                            @click="logOut"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-log-out"
                            >
                              <path
                                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                              ></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Log out</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="chat-conversation-box ps ps--active-y">
                    <div
                      id="chat-conversation-box-scroll"
                      class="chat-conversation-box-scroll"
                    >
                      <div class="chat active-chat">
                        <div
                          class="bubble"
                          v-for="message in messages"
                          :key="message.message"
                          :class="{
                            me: message.sender_id === userId,
                            you: message.sender_id !== userId,
                          }"
                        >
                          {{ message.message }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="chat-footer chat-active">
                    <div class="chat-input">
                      <form class="chat-form" action="javascript:void(0);">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-message-square"
                        >
                          <path
                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                          ></path>
                        </svg>
                        <input
                          type="text"
                          class="mail-write-box form-control"
                          placeholder="Message"
                          style="height: 100%"
                          @keyup.enter="sendMessage"
                          @change="typing"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <!-- Chat Not Selcted  -->
                <div class="chat-not-selected" v-else>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-message-square"
                    >
                      <path
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      ></path>
                    </svg>
                    Click User To Chat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import webSocket from "socket.io-client";

export default {
  data() {
    return {
      dropDown: false,
      darkTheme: false,
      listUsersShow: false,
      actualUsers: [],
      users: [],
      messages: [],
      userIdSelected: null,
      openChat: false,
    };
  },
  computed: {
    userId() {
      return this.$store.getters.getUser.id;
    },
  },
  methods: {
    toggleDropDown() {
      this.dropDown = !this.dropDown;
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      if (this.darkTheme) {
        require("../assets/dark/css/apps/mailing-chat.css");
        document.body.style.background = "#060818";
      } else {
        location.reload();
      }
    },
    toggleListUsersShow() {
      this.listUsersShow = !this.listUsersShow;
    },
    searchUser(query) {
      const search = query.target.value.toLowerCase();
      if (search.length > 0) {
        this.users = this.actualUsers.filter((user) =>
          user.username.toLowerCase().includes(search)
        );
      } else {
        this.users = this.actualUsers;
      }
    },
    typing() {
      const socket = webSocket("https://chat-app-mnboy.herokuapp.com", {
        transports: ["websocket"],
      });
      socket.on("connect", () => {
        socket.emit("typing", {
          userId: this.userId,
        });
      });
    },
    sendMessage(message) {
      if (message.target.value.trim().length > 0) {
        const element = document.getElementsByClassName("active-chat")[0];
        const messageElement = document.createElement("div");
        messageElement.classList.add("bubble");
        messageElement.classList.add("me");
        messageElement.innerHTML = message.target.value;
        element.appendChild(messageElement);
        this.updateScroll();

        this.$store.dispatch("sendMessage", {
          message: message.target.value,
          userId: this.userIdSelected,
        });
        message.target.value = "";
      }
    },
    reciveMessage(message) {
      const element = document.getElementsByClassName("active-chat")[0];
      const messageElement = document.createElement("div");
      messageElement.classList.add("bubble");
      messageElement.classList.add("you");
      messageElement.innerHTML = message;
      element.appendChild(messageElement);
      this.updateScroll();

      const notification = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3"
      );
      notification.play();
    },
    updateScroll() {
      const element = document.getElementsByClassName(
        "chat-conversation-box-scroll"
      )[0];
      element.scrollTop = element.scrollHeight;
    },
    async getUsers() {
      await this.$store.dispatch("getUsers");
      const users = await this.$store.getters.getUsers;
      this.users = users;
      this.actualUsers = users;
    },
    async getMessages(userId, username) {
      if (userId !== this.userIdSelected) {
        this.userIdSelected = userId;
        this.openChat = true;
        const messages = await this.$store.dispatch("getMessages", {
          userId,
        });
        this.messages = [];
        this.messages = messages;
        setTimeout(() => {
          const elementUserName = document.getElementById("nameUser");
          elementUserName.innerHTML =
            username.charAt(0).toUpperCase() + username.slice(1);
          this.updateScroll();
        }, 10);
      } else {
        this.openChat = false;
        this.messages = [];
        this.userIdSelected = null;
      }
    },
    async logOut() {
      await this.$store.dispatch("logout");
      location.href = "/login";
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {
    const socket = webSocket("https://chat-app-mnboy.herokuapp.com", {
      transports: ["websocket"],
    });
    socket.on("message", (message) => {
      if (
        message.sender_id === this.userIdSelected &&
        message.reciver_id === this.userId
      ) {
        this.reciveMessage(message.message);
      }
    });

    socket.on("enableTyping", (data) => {
      if (data.userId === this.userIdSelected) {
        <div class="conversation-start">
          <span>Is Typing...</span>
        </div>;
        const element = document.getElementsByClassName("active-chat")[0];
        const typingElement = document.createElement("div");
        typingElement.classList.add("conversation-start");
        const spanElement = document.createElement("span");
        spanElement.innerHTML = "Is Typing...";
        typingElement.appendChild(spanElement);
        element.appendChild(typingElement);
        this.updateScroll();
        setTimeout(() => {
          element.removeChild(typingElement);
          this.updateScroll();
        }, 3000);
      }
    });
  },
};
</script>

<style scoped>
@import url("../assets/assets/css/apps/mailing-chat.css");

.dropdown-toggle::after {
  display: none;
}

.height-calc {
  height: calc(100vh - 250px) !important;
}

.chat-conversation-box-scroll {
  overflow-y: scroll;
  height: 100%;
  scroll-behavior: smooth;
}

.chat-conversation-box-scroll::-webkit-scrollbar {
  display: none;
}
</style>