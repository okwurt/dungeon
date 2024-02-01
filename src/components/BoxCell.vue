<template>
<div class="boxCell">
  <img v-if="pkmnImg != ''" :src="pkmnImg" class="boxImage" @click="routeToInfoView()" />
</div>
</template>

<script>
import { useBoxStore } from '@/stores/box'

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
    routeToInfoView: function () {
      const boxStore = useBoxStore()
      const rows = boxStore.currentBox
      this.$router.push({
        name: 'boxPokemon',
        params: {
          index: rows.indexOf(this.row)
        }
      })
    },
    printElem: function() {
      const boxStore = useBoxStore()
      const rows = boxStore.currentBox
      //console.log(rows[0].get('name'))

      // Find the Current Array elem

      const index = rows.indexOf(this.row)
      const storedRow = rows[index]
      console.log('Index: '+index + ' - ' + storedRow.get('name'))

    }
  } 
}
</script>