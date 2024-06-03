import { request } from "@/services/apiService";

const login = ({ username, password }) => {
  return request("sign_in", "post", {
    user: {
      username,
      password,
    },
  });
};

const logout = () => {
  return request("sign_out", "delete");
};

export default {
  login,
  logout,
};
