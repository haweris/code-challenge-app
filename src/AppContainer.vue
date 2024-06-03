<template>
  <TopBar :user="user" />
  <div class="container">
    <SidePanel />
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import TopBar from "@/components/TopBar";
import SidePanel from "@/components/SidePanel";
import { jwtDecode } from "jwt-decode";

const store = useStore();

onMounted(async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decodedToken = jwtDecode(token.split(" ")[1]);
    const userId = decodedToken.sub;
    store.commit("setCurrentUserId", userId);

    if (!store.getters.getUser?.id) {
      store.dispatch("fetchUserDetail", userId).then((userData) => {
        store.commit("setCurrentUserId", userData);
      });
    }
  }
});

const user = computed(() => store.getters.getUser);
</script>

<style>
.container {
  display: flex;
  max-height: 100vh;
  min-height: calc(100vh - 5rem);
}
</style>
