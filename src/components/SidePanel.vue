<template>
  <div class="side-panel">
    <ul>
      <li><router-link to="/my-articles">My Articles</router-link></li>
      <hr />
      <li><router-link to="/articles">All Articles</router-link></li>
      <hr />
      <li><router-link to="/my-articles/new">Create Article</router-link></li>
    </ul>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.side-panel {
  min-width: 15rem;
  padding: 0 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  justify-self: flex-start;
}

.side-panel ul {
  list-style: none;
  padding: 0;
}

.side-panel li {
  margin-bottom: 5px;
}

.side-panel a {
  text-decoration: none;
  color: #333;
}

.side-panel a:hover {
  text-decoration: underline;
}
</style>
