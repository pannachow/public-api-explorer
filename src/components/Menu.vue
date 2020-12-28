<template>
  <div class="Menu">
    <nav
      class="navbar is-fixed-top is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Categories
          </a>

          <a class="navbar-item">
            Random
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: "Menu"
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  font-size: 22px;
}
/* .navbar-item img {
  max-height: 10rem;
} */
</style>
