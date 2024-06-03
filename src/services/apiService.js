import { API_URL } from "@/config";
import router from "@/router";
import { notificationService } from "@/services/notificationService";
import axios from "axios";

export const request = (url, method = "get", data = {}, options = {}) => {
  const { headers = {}, authenticatable = true, ...rest } = options;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authenticatable) {
    const access_token = localStorage.getItem("access_token");
    if (access_token) defaultHeaders["Authorization"] = access_token;
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  const config = {
    method,
    url: `${API_URL}/${url}`,
    headers: mergedHeaders,
    ...rest,
  };
  if (["post", "put", "patch", "delete"].includes(method.toLowerCase())) {
    config.data = data;
  } else {
    config.params = data;
  }

  return axios(config)
    .then(({ data, headers }) => {
      const { type, message } = data.response_info || {};
      if (message) {
        notificationService.showNotification(message, type);
      }
      return { headers, ...data };
    })
    .catch((error) => {
      const { type, message, status_code } =
        error.response?.data?.response_info || {};
      notificationService.showNotification(
        message || "An error occurred",
        type || "error",
      );

      if (status_code === 401) {
        localStorage.clear();
        router.push({ name: "login" });
      } else {
        console.error("There was an error!", error);
      }
    });
};
