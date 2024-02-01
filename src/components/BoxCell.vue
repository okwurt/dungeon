<template>
<div class="boxCell">
  <span v-if="eventTitle != ''" class="boxText">{{ this.eventTitle }} <br/> {{ this.otTitle }} <br/> {{ this.tidTitle }}</span>
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
    },
    eventTitle() {
      if (this.row == null) {
        return ''
      }
      return this.row.get('event') + ' ' + this.row.get('name')
    },
    otTitle() {
      if (this.row == null) {
        return ''
      }
      return 'OT:  ' + this.row.get('ot')
    },
    tidTitle() {
      if (this.row == null) {
        return ''
      }
      return 'TID: ' + this.row.get('id')
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
    }
  } 
}
</script>