<template>
  <h2 class="title">Sign Up</h2>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        v-model="formData.first_name"
        required
      />
    </div>
    <div class="form-group">
      <label for="last_name">Last Name</label>
      <input type="text" id="last_name" v-model="formData.last_name" required />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="formData.username" required />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" required />
    </div>
    <div class="form-group">
      <label for="gender">Gender</label>
      <select id="gender" v-model="formData.gender" required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="unspecified">Unspecified</option>
      </select>
    </div>
    <div class="form-group">
      <label for="date_of_birth">Date of Birth</label>
      <input
        type="date"
        id="date_of_birth"
        v-model="formData.date_of_birth"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
      />
    </div>
    <div class="form-group">
      <label for="password_confirmation">Password Confirmation</label>
      <input
        type="password"
        id="password_confirmation"
        v-model="formData.password_confirmation"
        required
      />
    </div>
    <!-- Error message for password confirmation -->
    <p v-if="showError && passwordsDoNotMatch" class="error-message">
      Passwords do not match
    </p>

    <!-- Error message for password length -->
    <p v-if="showError && passwordTooShort" class="error-message">
      Password must be at least 8 characters long
    </p>
    <button type="submit" class="button">Sign Up</button>
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
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  gender: "",
  date_of_birth: "",
});

const showError = ref(false);

const passwordsDoNotMatch = computed(() => {
  return formData.value.password !== formData.value.password_confirmation;
});

const passwordTooShort = computed(() => {
  return formData.value.password.length < 8;
});

const handleSubmit = async () => {
  try {
    if (passwordsDoNotMatch.value || passwordTooShort.value) {
      showError.value = true;
      return;
    }

    const response = await request("sign_up", "post", { user: formData.value });
    if (response) {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
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
