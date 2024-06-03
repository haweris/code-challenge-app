<template>
  <div class="app">
    <router-view />
    <Notification />
  </div>
</template>

<script setup>
import Notification from "./components/Notification";
import { onMounted } from "vue";
import { notificationService } from "@/services/notificationService";

onMounted(() => {
  notificationService.clearNotification();
});
</script>

<style>
body {
  margin: 0;
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
