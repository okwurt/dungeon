<template>
  <div id="app" v-if="config">
    <Theme :themes="config.colors" />
    <div id="customheader">
      <section class="first-line">
        <div>
          <h1 class="custom-title">{{ config.title }}</h1>
          <h2 class="custom-subtitle">{{ config.subtitle }}</h2>
        </div>
      </section>
      <Navbar :sheets="this.sheets"/>
    </div>

    <section id="main-section" class="section">
      <RouterView :config="this.config"></RouterView>
    </section>
  </div>
</template>

<script>
import { parse } from 'yaml'
import merge from 'lodash.merge'

import Navbar from './components/Navbar.vue'
import Theme from './components/Theme.vue'

import {SheetNames} from './config.js'

import defaultConfig from './assets/defaults.yml?raw'
import customConfig from './assets/config.yml?raw'

export default {
  name: 'App',
  components: {
    Navbar,
    Theme
  },
  data() {
    return {
      config: null,
      loaded: false
    }
  },
  created: async function () {
    this.buildPage()
    window.onhashchange = this.buildPage
    this.loaded = true
  },
  computed: {
    sheets() {
      return SheetNames
    }
  },
  methods: {
    buildPage: async function () {
      const defaults = parse(defaultConfig)
      let config
      try {
        config = parse(customConfig)
      } catch (error) {
        console.log(error)
      }
      this.config = merge(defaults, config)

      document.title = this.config.title || `${this.config.title} | ${this.config.subtitle}`
    }
  }
}
</script>
