<template>
<div class="boxCell">
  <img v-if="pkmnImg != ''" :src="pkmnImg" class="boxImage" />
</div>
</template>

<script>
import Sprites from '../sprites.js'
import Utilities from '../utilities.js'

export default {
  name: 'BoxCell',
  props: ['row'],
  components: {

  },
  data() {
    return {
        loaded: false
    }
  },
  computed: {
    isShiny() {
      const isShiny = this.row.get('isShiny')
      return (isShiny == '▣' || isShiny == '★')
    },
    pkmnName() {
      return Utilities.sanitizeNameHomeOnly(this.row?.get('name'))
    },
    pkmnImg() {
      if (this.pkmnName == null || this.pkmnName == '') {
        return ''
      }
      return Sprites.fetchHomeSprite(this.pkmnName, this.isShiny)
    }

  },
  methods: {

  } 
}
</script>