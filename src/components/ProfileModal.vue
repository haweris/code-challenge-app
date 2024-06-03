<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ userData.full_name }}</h2>
        <button class="close-button" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="avatar-wrapper">
          <img
            :src="userData.avatar"
            alt="Avatar"
            class="avatar"
            v-if="userData.avatar"
          />
          <div v-else class="avatar" v-html="defaultAvatar"></div>
        </div>
        <p><strong>Name:</strong> {{ userData.full_name }}</p>
        <p><strong>Username:</strong> {{ userData.username }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <p><strong>Gender:</strong> {{ userData.gender }}</p>
        <p><strong>Date of Birth:</strong> {{ userData.date_of_birth }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const { user, show } = toRefs(props);

const userData = computed(() => user.value);
const defaultAvatar = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30" height="30" fill="currentColor">
  <circle cx="32" cy="20" r="12" />
  <path d="M32 36c-13.255 0-24 10.745-24 24h48c0-13.255-10.745-24-24-24z" />
</svg>`;
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-title {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.modal-body {
  text-align: center;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
