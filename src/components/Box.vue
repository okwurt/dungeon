<template>
  <div class="box">
    <BoxRow :rows="rows" />
  </div>
</template>

<script>
import BoxRow from './BoxRow.vue'

export default {
  name: 'Box',
  props: ['rows'],
  components: {
    BoxRow
  },
  data() {
    return {
      loaded: false
    }
  },
  computed() {},
  methods: {}
}
</script>
