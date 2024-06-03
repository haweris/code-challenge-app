<template>
  <div :class="['notification', type]" v-if="show">
    <span class="message">{{ message }}</span>
    <button class="close-button" @click="dismissNotification">X</button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { notificationService } from "@/services/notificationService";

const show = ref(false);
const message = ref("");
const type = ref("");

const notificationState = computed(() => notificationService.getState().value);

watch(
  notificationState,
  (newState) => {
    show.value = newState.show;
    message.value = newState.message;
    type.value = newState.type;
  },
  { immediate: true },
);

const dismissNotification = () => {
  notificationService.clearNotification();
};
</script>

<style scoped lang="scss">
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 4px;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.message {
  margin-right: 10px;
}

.success {
  background-color: #4caf50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}

.close-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>
