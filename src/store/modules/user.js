import authService from "@/services/authService";
import userService from "@/services/userService";

const state = {
  currentUserId: null,
  user: {},
};

const getters = {
  getUser: (state) => state.user,
  currentUserId: (state) => state.currentUserId,
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setCurrentUserId: (state, user) => (state.currentUserId = user.id),
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const user = await authService.login(credentials);
      commit("setUser", user);
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  async logout({ commit }) {
    await authService.logout();
    localStorage.clear();
    commit("setUser", {});
  },

  async fetchUserDetail({ commit }, userId) {
    try {
      const { data } = await userService.fetchUserDetail(userId);

      const articles = data.articles;
      delete data.articles;

      commit("setUserArticles", articles);
      commit("setUser", data);
      commit("setCurrentUserId", data.id);

      return data;
    } catch (error) {
      console.error("Error fetching user", error);
      throw error;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
