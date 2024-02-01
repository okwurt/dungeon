<template>
  <div v-cloak v-if="sheets" class="container-fluid">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-start">
          <RouterLink class="navbar-item" to="/">Home</RouterLink>
          <RouterLink
            class="navbar-item"
            v-for="(sheet, key) in sheets"
            v-bind:key="key"
            :to="`/sheet/${sheet}`"
            >{{ sheet }}
          </RouterLink>
        </div>
        <div class="navbar-end">
          <RouterLink class="navbar-item" to="/boxes">Boxes</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  props: {
    sheets: Array
  },
  components: { RouterLink }
}
</script>
