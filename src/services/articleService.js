import { request } from "@/services/apiService";

const MAIN_PATH = "articles";

const getArticles = (query = "", ownArticles = false) => {
  let route = `${MAIN_PATH}?q=${query}`;
  if (ownArticles) {
    route += "&own=true";
  }
  return request(route);
};

const getArticle = (id) => {
  return request(`${MAIN_PATH}/${id}`);
};

const createArticle = (article) => {
  return request(MAIN_PATH, "post", {
    article,
  });
};

const updateArticle = (id, article) => {
  return request(`${MAIN_PATH}/${id}`, "put", {
    article,
  });
};

const deleteArticle = (id) => {
  return request(`${MAIN_PATH}/${id}`, "delete");
};

const publishArticle = (id) => {
  return request(`${MAIN_PATH}/${id}`, "patch", {
    article: { published_at: new Date() },
  });
};

export default {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
};
