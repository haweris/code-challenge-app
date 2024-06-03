<template>
  <h2 class="title">Forgot Password</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Email</label>
      <input type="username" id="username" v-model="username" required />
    </div>
    <button type="submit" class="button">Reset Password</button>
  </form>
  <div class="additional-links">
    <router-link class="link" to="/login">Log In</router-link>
  </div>
</template>

<script setup>
import { request } from "@/services/apiService";
import { ref } from "vue";

const username = ref("");

const handleSubmit = async () => {
  const payload = {
    user: {
      username: username.value,
    },
  };

  try {
    await request("forgot_password", "post", payload);
  } catch (error) {
    console.log(error, "error");
  }
};
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
