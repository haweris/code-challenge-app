import { request } from "@/services/apiService";

const fetchUserDetail = (userId) => {
  return request("users/" + userId + "/detail", "get");
};

export default {
  fetchUserDetail,
};
