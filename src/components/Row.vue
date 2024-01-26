<template>
  <tr class="normalrow no-bottom-border" @click="$emit('viewInfo')">
    <td rowspan="2" class="verticalcenter" width="150">
      <img
        v-if="spriteImg != ''"
        :src="spriteImg"
        height="100%"
        style="visibility: hidden"
        onload="this.style.visibility = 'visible'"
      />
    </td>
    <td class="verticalbottom">
      <img v-bind:src="ballImg" height="50" width="50" />
    </td>
    <td class="verticalbottom">{{ row.get('event') }}</td>
    <td class="verticalbottom" width="60">
      <img v-if="isShiny" v-bind:src="shinyImg" height="40" width="40" />
    </td>
    <td class="verticalcenter">
      {{ row.get('ot') }} <br />
      {{ row.get('id') }}
    </td>
    <td class="verticalcenter">{{ row.get('ability') }}</td>
    <td rowspan="2" class="verticalcenter">{{ row.get('tradeHistory') }}</td>
    <td rowspan="2" class="verticalcenter">{{ row.get('disclosure') }}</td>
  </tr>
  <tr class="normalrow no-bottom-border" @click="$emit('viewInfo')">
    <!-- Column 1 is Sprite IMG with Span 2 -->
    <td class="subrow verticalcenter">{{ this.ballName }}</td>
    <td class="verticaltop">{{ row.get('name') }}</td>
    <td class="verticaltop" width="60">
      <img v-if="isGigantamax" v-bind:src="gigantamaxImg" height="40" width="40" />
    </td>
    <td class="verticalcenter">
      Level <br />
      {{ row.get('level') }}
    </td>
    <td class="verticalcenter">{{ row.get('nature') }}</td>
    <!-- Last Two Columns have Span 2 -->
  </tr>
</template>

<script>
import Images from '../images.js'
import Sprites from '../sprites.js'
import Utilities from '../utilities.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Row',
  props: ['sheet', 'row'],
  emits: ['viewInfo'],
  computed: {
    pkmnName() {
      return Utilities.sanitizeName(this.row.get('name'))
    },
    shinyImg() {
      const isShiny = this.row.get('isShiny')
      if (isShiny == '▣') {
        return Images.squareShinyImg()
      } else if (isShiny == '★') {
        return Images.starShinyImg()
      }
      return ''
    },
    isShiny() {
      return this.shinyImg != ''
    },
    spriteImg() {
      return Sprites.fetchSprite(this.pkmnName, this.isShiny, this.row.get('generation'))
    },
    ballName() {
      const ball = this.row.get('ball')
      if (this.pkmnName === 'manaphy' && (ball == null || ball == '')) {
        return 'Egg'
      }
      return ball
    },
    ballImg() {
      return Sprites.fetchBallIMG(this.ballName, this.pkmnName)
    },
    isGigantamax() {
      return this.row.get('name').toLowerCase().includes('gigantamax')
    },
    gigantamaxImg() {
      return this.isGigantamax ? Images.gigantamaxImg() : ''
    }
  }
}
</script>
