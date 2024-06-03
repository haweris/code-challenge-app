<template>
  <div class="unauthorized-page">
    <div class="page-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { onMounted } from "vue";

onMounted(() => {
  if (localStorage.getItem("access_token")) {
    router.push({ name: "myArticles" });
  }
});
</script>

<style scoped lang="scss">
.unauthorized-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.page-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}
</style>
