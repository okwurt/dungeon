<template>
  <div class="boxRow" v-if="rows != null">
    <BoxCell :row="col1" />
    <BoxCell :row="col2" />
    <BoxCell :row="col3" />
    <BoxCell :row="col4" />
    <BoxCell :row="col5" />
    <BoxCell :row="col6" />
  </div>
</template>

<script>
import BoxCell from './BoxCell.vue'

export default {
  name: 'BoxRow',
  props: ['rows'],
  components: {
    BoxCell
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    col1() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 1
      })
    },
    col2() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 2
      })
    },
    col3() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 3
      })
    },
    col4() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 4
      })
    },
    col5() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 5
      })
    },
    col6() {
      return this.rows.find(function (el) {
        return el.get('box').split('.')[2] == 6
      })
    }
  },
  methods: {}
}
</script>
