<template>
  <div class="articles">
    <h2>Articles</h2>
    <input
      class="search-bar"
      type="text"
      v-model="searchQuery"
      placeholder="Search articles..."
      @input="fetchArticlesByPath(path.value)"
    />
    <ul v-if="filteredArticles.length">
      <li>
        <div class="list-element-headers">
          <span
            ><strong>{{ "Title" }}</strong></span
          >
          <div class="actions">
            <strong>{{ "Actions" }}</strong>
          </div>
        </div>
      </li>
      <li v-for="article in filteredArticles" :key="article.id">
        <hr />
        <div class="list-element">
          <span @click="showSelectedArticle(article)">{{ article.title }}</span>
          <div class="actions">
            <button
              @click="publishArticle(article.id)"
              :style="{
                visibility: article.published_at ? 'hidden' : 'visible',
              }"
            >
              Publish
            </button>
            <button
              @click="editArticle(article.id)"
              :style="{
                visibility:
                  article.author_id == currentUserId ? 'visible' : 'hidden',
              }"
            >
              Edit
            </button>
            <button
              @click="deleteArticle(article.id)"
              :style="{
                visibility:
                  article.author_id == currentUserId ? 'visible' : 'hidden',
              }"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <span v-else>No Article Found!</span>
    <ArticleModal
      v-if="showArticle"
      @close="showArticle = false"
      :article="articleData"
      :show="showArticle"
    />
  </div>
</template>

<script setup>
import ArticleModal from "@/components/ArticleModal";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();
const path = computed(() => route.path);
const currentUserId = computed(() => store.getters.currentUserId);
const searchQuery = ref("");

const articles = computed(() => {
  if (path.value === "/my-articles") return store.getters.getUserArticles;
  else if (path.value === "/articles") return store.getters.getArticles;
  else return [];
});

const filteredArticles = computed(() => {
  return articles.value.filter(
    ({ title, body, author_name }) =>
      title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      body.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      author_name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const showArticle = ref(false);
const articleData = ref(null);

const showSelectedArticle = (article) => {
  articleData.value = article;
  showArticle.value = true;
};

const fetchArticlesByPath = (path) => {
  const query = searchQuery.value;
  if (path === "/my-articles") store.dispatch("fetchUserArticles", query);
  else if (path === "/articles") store.dispatch("fetchArticles", query);
};

const deleteArticle = async (id) => {
  await store.dispatch("deleteArticle", id);
  fetchArticlesByPath(path.value);
};

const publishArticle = async (id) => {
  await store.dispatch("publishArticle", id);
  fetchArticlesByPath(path.value);
};

const editArticle = (id) => {
  router.push({ name: "editArticle", params: { id } });
};

onMounted(() => {
  fetchArticlesByPath(path.value);
});

watch(path, (newPath) => {
  fetchArticlesByPath(newPath);
});
</script>

<style scoped lang="scss">
.articles {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: calc(100% - 20.19rem);
  min-height: -webkit-fill-available;
}

.search-bar {
  float: right;
  margin: 1rem 5rem 0;
  max-width: 30rem;
}

.list-element-headers {
  display: flex;
  justify-content: space-evenly;
  gap: 90%;
}

.list-element {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.list-element span {
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
}

ul {
  padding: 1rem 5rem;
}

li {
  list-style-type: none;
  margin-bottom: 10px;
}

li a {
  text-decoration: none;
  color: #333;
}

li a:hover {
  text-decoration: underline;
}

input[type="text"] {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}
</style>
