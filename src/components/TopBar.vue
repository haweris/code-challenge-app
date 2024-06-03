<template>
  <div class="top-bar">
    <h2>Article Manager</h2>
    <div class="user-info">
      <div class="avatar-wrapper">
        <img
          :src="userData?.avatar"
          alt="Avatar"
          class="avatar"
          @click="showProfile = true"
          v-if="userData?.avatar"
        />
        <div
          v-else
          class="avatar"
          v-html="defaultAvatar"
          @click="showProfile = true"
        ></div>
      </div>
      <span class="name">{{ userData?.full_name }}</span>
      <button @click="logout">Logout</button>
    </div>
    <ProfileModal
      v-if="showProfile"
      @close="showProfile = false"
      :user="userData"
      :show="showProfile"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import ProfileModal from "@/components/ProfileModal.vue";

onMounted(() => {});

const store = useStore();
const user = computed(() => store.state.user.user);
const showProfile = ref(false);

const logout = () => {
  store
    .dispatch("logout")
    .then(() => router.push({ name: "login" }))
    .catch((error) => console.error("Error logging out:", error));
};

const userData = computed(() => user.value);
const defaultAvatar = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30" height="30" fill="currentColor">
  <circle cx="32" cy="20" r="12" />
  <path d="M32 36c-13.255 0-24 10.745-24 24h48c0-13.255-10.745-24-24-24z" />
</svg>`;
</script>

<style scoped lang="scss">
.top-bar {
  background-color: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar h2 {
  margin: 0.8rem 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.name {
  margin-right: 20px;
}
</style>
