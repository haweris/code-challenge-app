<template>
  <h2 class="title">Login</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit" class="button">Login</button>
  </form>

  <div class="additional-links">
    <router-link class="link" to="/signup">Sign Up</router-link>
    <router-link class="link" to="/forgot-password"
      >Forgot Password?</router-link
    >
  </div>
</template>

<script setup>
import router from "@/router";
import { request } from "@/services/apiService";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const username = ref("");
const password = ref("");

const handleSubmit = async () => {
  const payload = {
    user: {
      username: username.value,
      password: password.value,
    },
  };

  try {
    const response = await request("sign_in", "post", payload);
    if (response) {
      if (response.response_info.status_code === 200) {
        const token = response.headers.get("authorization");
        localStorage.setItem("access_token", token);

        const articles = response.data.articles;
        const user = response.data.user;

        store.commit("setUser", user);
        store.commit("setUserArticles", articles);

        router.push({ name: "myArticles" });
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
};

onMounted(() => {
  if (localStorage.getItem("access_token")) {
    router.push({ name: "myArticles" });
  }
});
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  width: 100%;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: -webkit-fill-available;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.button:hover {
  background-color: #555;
}
.additional-links {
  margin-top: 10px;
}
.link {
  margin-right: 10px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}
</style>
