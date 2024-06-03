<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ articleData.title }}</h2>
        <button class="close-button" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <p>{{ articleData.body }}</p>
        <p><strong>Author</strong> {{ articleData.author_name }}</p>
        <p>
          <strong>Published at</strong> {{ articleData.published_at || "N/A" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, computed } from "vue";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const { article, show } = toRefs(props);

const articleData = computed(() => article.value);
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin: 5rem 10%;
  max-height: 45rem;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.modal-body {
  text-align: center;
  overflow-y: scroll;
  max-height: 40rem;
  margin-bottom: 15rem;
}
</style>
