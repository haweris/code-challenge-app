import { ref } from "vue";

const notificationState = ref({
  show: false,
  message: "",
  type: "",
});

const showNotification = (message, type) => {
  notificationState.value = {
    show: true,
    message,
    type,
  };

  setTimeout(() => {
    clearNotification();
  }, 5000);
};

const clearNotification = () => {
  notificationState.value = {
    show: false,
    message: "",
    type: "",
  };
};

const getState = () => notificationState;

export const notificationService = {
  getState,
  showNotification,
  clearNotification,
};
