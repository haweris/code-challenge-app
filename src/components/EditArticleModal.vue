<template>
  <div class="modal">
    <h2>Edit Article</h2>
    <form @submit.prevent="updateArticle">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="article.title" />
      <br />
      <label for="author_name">Author:</label>
      <input type="text" id="author_name" v-model="article.author_name" />
      <br />
      <label for="body">Content:</label>
      <textarea id="body" v-model="article.body" />
      <br />
      <button type="submit">Update Article</button>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

function updateArticle() {
  emit("close");
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

label {
  display: block;
  margin-bottom: 10px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}
</style>
