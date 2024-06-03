<template>
  <h2 class="title">Reset Password</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="password">New Password</label>
      <input
        type="password"
        id="new_password"
        v-model="formData.new_password"
        required
      />
    </div>
    <div class="form-group">
      <label for="password_confirmation">Confirm New Password</label>
      <input
        type="password"
        id="password_confirmation"
        v-model="formData.password_confirmation"
        required
      />
    </div>
    <p v-if="showError && passwordsDoNotMatch" class="error-message">
      Passwords do not match
    </p>
    <p v-if="showError && passwordTooShort" class="error-message">
      Password must be at least 8 characters long
    </p>
    <button type="submit" class="button">Reset Password</button>
  </form>
  <div class="additional-links">
    <router-link class="link" to="/login">Log In</router-link>
  </div>
</template>

<script setup>
import router from "@/router";
import { request } from "@/services/apiService";
import { computed, ref } from "vue";

const formData = ref({
  new_password: "",
  password_confirmation: "",
});

const showError = ref(false);

const passwordsDoNotMatch = computed(() => {
  return formData.value.new_password !== formData.value.password_confirmation;
});

const passwordTooShort = computed(() => {
  return formData.value.new_password.length < 8;
});

const handleSubmit = async () => {
  try {
    if (passwordsDoNotMatch.value || passwordTooShort.value) {
      showError.value = true;
      return;
    }

    const response = await request("reset_password", "post", {
      user: formData.value,
    });
    if (response.response_info.status_code === 200) {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
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

input,
select {
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
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
