<template>
  <div class="create-article">
    <h2>{{ isEditing ? "Edit Article" : "Create New Article" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="author_name">Author</label>
        <input type="text" id="author_name" v-model="author_name" required />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="content" rows="7" required></textarea>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();

const title = ref("");
const author_name = ref("");
const content = ref("");
const path = computed(() => route.path);
const articleId = ref(null);

const isEditing = computed(() => path.value.endsWith("/edit"));

const loadArticleData = async (id) => {
  const article = await store.dispatch("getArticle", id);
  if (article) {
    title.value = article.title;
    author_name.value = article.author_name;
    content.value = article.body;
  } else {
    router.back();
  }
};

const handleSubmit = async () => {
  try {
    const article = {
      title: title.value,
      body: content.value,
      author_name: author_name.value,
    };
    if (isEditing.value) {
      await store.dispatch("updateArticle", { id: articleId.value, article });
    } else {
      await store.dispatch("createArticle", article);
    }
    router.push({ name: "myArticles" });
  } catch (error) {
    console.error("Error saving article:", error);
  }
};

onMounted(() => {
  const { id } = route.params;
  if (id) {
    articleId.value = id;
    loadArticleData(id);
  }
});

watch(isEditing, (newValue) => {
  if (newValue) {
    const { id } = route.params;
    if (id) {
      articleId.value = id;
      loadArticleData(id);
    }
  } else {
    title.value = "";
    author_name.value = "";
    content.value = "";
  }
});
</script>

<style scoped>
.create-article {
  min-width: calc(100% - 20.19rem);
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  min-width: 45rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  display: block;
  width: fit-content;
  margin: auto;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #555;
}
</style>
