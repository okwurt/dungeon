<template>

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
  computed() {

  },
  methods: {

  } 
}
</script>