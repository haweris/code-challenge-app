import articleService from "@/services/articleService";

const state = {
  articles: [],
  userArticles: [],
};

const getters = {
  getArticles: (state) => state.articles,
  getUserArticles: (state) => state.userArticles,
};

const mutations = {
  setArticles: (state, articles) => (state.articles = articles),
  setUserArticles: (state, articles) => (state.userArticles = articles),
};

const actions = {
  async fetchArticles({ commit }, query = "") {
    try {
      const response = await articleService.getArticles(query);
      if (response) {
        const { data } = response;
        commit("setArticles", data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  async fetchUserArticles({ commit }, query = "") {
    try {
      const response = await articleService.getArticles(query, true);
      if (response) {
        const { data } = response;
        commit("setUserArticles", data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  async getArticle(_stateActions, id) {
    try {
      const response = await articleService.getArticle(id);
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  async createArticle(_stateActions, article) {
    try {
      const createdArticle = await articleService.createArticle(article);
      return createdArticle;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  async updateArticle(_stateActions, { id, article }) {
    try {
      const updatedArticle = await articleService.updateArticle(id, article);
      return updatedArticle;
    } catch (error) {
      console.error(`Error updating article with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteArticle(_stateActions, id) {
    try {
      await articleService.deleteArticle(id);
    } catch (error) {
      console.error(`Error deleting article with ID ${id}:`, error);
      throw error;
    }
  },

  async publishArticle(_stateActions, id) {
    try {
      const updatedArticle = await articleService.publishArticle(id);
      return updatedArticle;
    } catch (error) {
      console.error(`Error publishing article with ID ${id}:`, error);
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
