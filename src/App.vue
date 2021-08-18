<template>
  <router-view v-slot="{ Component }">
    <transition name="router" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap");
@import url("./assets/assets/css/plugins.css");
@import url("./assets/bootstrap/css/bootstrap.min.css");
@import url("./assets/assets/css/loader.css");

* {
  font-family: Quicksand;
}

/* Router Transition  */

.router-enter-from,
.router-leave-to {
  opacity: 0;
}

.router-enter-active {
  transition: all 0.2s ease-out;
}

.router-leave-active {
  transition: all 0.2s ease-in;
}

.router-enter-to,
.router-leave-from {
  opacity: 1;
}
</style>
