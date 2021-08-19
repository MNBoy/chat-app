<template>
  <div class="form-container">
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">
            <h1 class="">Get started with a free account</h1>
            <p class="signup-link">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
            <form class="text-left" @submit.prevent="signup">
              <div class="form">
                <div id="username-field" class="field-wrapper input">
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
                    class="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    ref="username"
                    @blur="
                      username5Error = false;
                      usernameError = false;
                    "
                  />
                  <p class="text-danger" v-if="username5Error">
                    Username must be at least 5 characters long
                  </p>
                  <p class="text-danger" v-if="usernameError">
                    Please enter a username
                  </p>
                </div>

                <div id="password-field" class="field-wrapper input mb-2">
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
                    class="feather feather-lock"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    ref="password"
                    @blur="
                      password5Error = false;
                      passwordError = false;
                    "
                  />
                  <p class="text-danger" v-if="passwordError">
                    Please enter a password
                  </p>
                  <p class="text-danger" v-if="password5Error">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div class="d-sm-flex justify-content-between">
                  <div class="field-wrapper">
                    <button type="submit" class="btn btn-primary" value="">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="form-image">
      <div class="l-image"></div>
    </div>
    <loading v-model:active="isLoading" is-full-page loader="dots" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      usernameError: false,
      username5Error: false,
      passwordError: false,
      password5Error: false,
      isLoading: false,
    };
  },
  methods: {
    async signup() {
      const { username, password } = this.$refs;
      this.usernameError = false;
      this.username5Error = false;
      this.passwordError = false;
      this.password5Error = false;
      if (username.value === "") {
        this.usernameError = true;
        return;
      } else if (username.value.length < 5) {
        this.username5Error = true;
        return;
      } else if (password.value === "") {
        this.passwordError = true;
        return;
      } else if (password.value.length < 6) {
        this.password5Error = true;
        return;
      }

      this.isLoading = true;
      const response = await this.$store.dispatch("signup", {
        username: username.value,
        password: password.value,
      });
      if (response) {
        this.isLoading = false;
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: response,
        });
        this.password = "";
      } else {
        this.isLoading = false;
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/assets/css/authentication/form-1.css");
</style>