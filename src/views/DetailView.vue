<template>
  <div v-if="empty">
    <h1>No Boxes are loaded, please select a Box in Box View</h1>
  </div>
  <div id="detail-view" v-if="loaded"></div>
</template>

<script>
/**
 * Nothing currently routes to this View
 */
export default {
  name: 'DetailView',
  props: ['config'],
  data() {
    return {
      loaded: false,
      error: false,
      isSheet: false,
      sheetName: '',
      rowNumber: 0,
      boxName: '',
      boxIndex: 0
    }
  },
  beforeMount() {
    window.addEventListener('keydown', this.handleKeydown, null)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  created: async function () {
    this.loadParams()

    this.loaded = true

    window.onhashchange = this.loadParams
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        this.loadParams()

        this.loaded = true
      }
    )
  },
  computed: {},
  methods: {
    /**
     * This will load the route params into their associated vars in the View
     * Makes them easier to reference for other functions.
     */
    loadParams: function () {
      // Expect type to be either Sheet or Box
      if (this.$route.params.type == 'sheet') {
        this.isSheet = true
      } else if (this.$route.params.type == 'box') {
        this.isSheet = false
      } else {
        this.error = true
        return
      }

      // Name and Index should be either the SheetName/RowNumber or BoxName/BoxIndex
      if (isSheet) {
        this.sheetName = this.$route.params.name
        this.rowNumber = this.$route.params.index
      } else {
        this.boxName = this.$route.params.name
        this.boxIndex = this.$route.params.index
      }
    }
  }
}
</script>
