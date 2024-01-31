<template>
  <div v-if="empty">
    <h1>No Boxes are loaded, please select a Box in Box View</h1>
  </div>
  <div id="detail-view" v-if="loaded">
    <div class="pokemonView" v-bind:style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <!-- Header Bar Info -->
      <div
        v-if="prevPkmnName != ''"
        class="prevContainer"
        @click="routeToInfoView(parseInt(this.index) - 1)"
      >
        <img :src="prevPkmnImg" />
      </div>
      <img class="ballContainer" :src="ballImg" />
      <div class="headNameContainer">
        <h1>{{ this.rawName }}</h1>
      </div>
      <div class="levelContainer">
        <h1>Lv. {{ this.row.get('level') }}</h1>
      </div>
      <img class="isGigContainer" v-if="isGigantamax" :src="gigantamaxImg" />
      <img class="isShinyContainer" v-if="isShiny" :src="shinyImg" />
      <div
        v-if="nextPkmnName != ''"
        class="nextContainer"
        @click="routeToInfoView(parseInt(this.index) + 1)"
      >
        <img :src="nextPkmnImg" />
      </div>
      <div class="eventContainer">
        <h3 class="eventData">
          Event (Bulbapedia Link): {{ this.row.get('event') + ' ' + this.trimmedName() }}
        </h3>
      </div>
      <!-- IV Info -->
      <div class="hpContainer">
        <h4>{{ this.row.get('hp') }}</h4>
      </div>
      <div class="sAContainer">
        <h4>{{ this.row.get('spa') }}</h4>
      </div>
      <div class="atContainer">
        <h4>{{ this.row.get('atk') }}</h4>
      </div>
      <div class="sDContainer">
        <h4>{{ this.row.get('spd') }}</h4>
      </div>
      <div class="deContainer">
        <h4>{{ this.row.get('def') }}</h4>
      </div>
      <div class="spContainer">
        <h4>{{ this.row.get('spe') }}</h4>
      </div>
      <!-- Pokemon Info and Moves -->
      <div class="dexContainer">
        <h2>{{ this.row.get('dex') }}</h2>
      </div>
      <div class="nameContainer">
        <h2>{{ this.trimmedName() }}</h2>
      </div>
      <div class="typeContainer">
        <div class="typeIterator" :key="type.slot" v-for="type in pokemonData?.types">
          <img class="typeImg" :src="fetchTypeImg(type.type.name)" />
        </div>
      </div>
      <div class="spriteContainer" v-if="spriteImg != ''">
        <div class="spriteImg" v-bind:style="{ backgroundImage: 'url(' + spriteImg + ')' }"></div>
      </div>
      <!-- OT and TID -->
      <div class="redditContainer">
        <p>{{ this.row.get('reddit') }}</p>
      </div>
      <div class="otContainer">
        <h2>{{ this.row.get('ot') }}</h2>
      </div>
      <div class="tidContainer">
        <h2>{{ this.row.get('id') }}</h2>
      </div>
      <!-- Nature and Ability -->
      <div class="natureContainer">
        <h3>{{ this.row.get('nature') }}</h3>
      </div>
      <div class="abilityContainer">
        <h3>{{ this.row.get('ability') }}</h3>
      </div>
      <!-- Detailed Information -->
      <div class="tradeContainer">
        <h3>Trade History:</h3>
        <h5>{{ this.row.get('tradeHistory') }}</h5>
      </div>
      <div class="notesContainer">
        <h3>Disclosure / Notes:</h3>
        <h5>{{ this.row.get('disclosure') }}</h5>
        <h3>Proof:</h3>
        <h5>{{ this.row.get('proof') }}</h5>
      </div>
      <div class="boxContainer">
        <h6>Box Location: {{ this.row.get('box') }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonDetail from '@/assets/images/PokemonHomeBlank.jpg'
import { useBoxStore } from '@/stores/box'

import Images from '../images.js'
import Sprites from '../sprites.js'
import Utilities from '../utilities.js'

import { Pokedex } from 'pokeapi-js-wrapper'
const P = new Pokedex()

const boxStore = useBoxStore()
const rows = boxStore.currentBox

export default {
  name: 'PokeBoxInfo',
  props: ['config'],
  data() {
    return {
      loaded: false,
      empty: false,
      pokemonData: null
    }
  },
  beforeMount() {
    window.addEventListener('keydown', this.handleKeydown, null)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  created: async function () {
    // Ensure that the Store has Box Information
    if (rows == null || rows.length == 0) {
      this.empty = true
      return
    }

    this.pokemonData = this.fetchPokeAPIInfo()
    this.loaded = true
    window.onhashchange = this.loadSheet
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        this.loaded = false
        this.pokemonData = null
        this.fetchPokeAPIInfo()
        this.loaded = true
      }
    )
  },
  computed: {
    backgroundImage() {
      return PokemonDetail
    },
    row() {
      return rows[parseInt(this.index)]
    },
    prevRow() {
      if (this.index > 0) {
        return rows[parseInt(this.index) - 1]
      }
      return null
    },
    nextRow() {
      if (this.index < rows.length - 1) {
        return rows[parseInt(this.index) + 1]
      }
      return null
    },
    rawName() {
      return this.row.get('name')
    },
    pkmnName() {
      return Utilities.sanitizeNameHomeOnly(this.rawName)
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
      return Sprites.fetchHomeSprite(this.pkmnName, this.isShiny)
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
      return this.rawName?.toLowerCase().includes('gigantamax')
    },
    gigantamaxImg() {
      return this.isGigantamax ? Images.gigantamaxImg() : ''
    },
    prevPkmnName() {
      return Utilities.sanitizeNameHomeOnly(this.rows[0].get('name'))
    },
    prevPkmnImg() {
      return Sprites.fetchHomeSprite(this.prevPkmnName)
    },
    nextPkmnName() {
      return Utilities.sanitizeNameHomeOnly(this.rows[2]?.get('name'))
    },
    nextPkmnImg() {
      return Sprites.fetchHomeSprite(this.nextPkmnName)
    },
    selfObtained() {
      return this.row.get('tradeHistory').startsWith('Self-obtained')
    }
  },
  methods: {
    routeToInfoView: function (rowNumber) {
      this.$router.push({
        name: 'pokemon',
        params: {
          sheetName: this.$route.params.sheetName,
          rowNum: rowNumber
        }
      })
    },
    fetchPokeAPIInfo: function () {
      P.getPokemonByName(parseInt(this.row.get('dex')))
        .then((response) => {
          return response
        })
        .then((data) => {
          this.pokemonData = data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchTypeImg: function (type) {
      return Images.typeImg(type)
    },
    trimmedName: function () {
      const apiName = this.pokemonData?.name
      if (apiName == null) {
        return this.rawName
      } else if (this.row.get('generation') == '9' && this.rawName.includes(' ')) {
        // These are the Paradox Mons
        return this.rawName
      } else if (!this.rawName.includes('-') && apiName.includes('-')) {
        // Base forms from sheet that have a default form name in API
        return this.rawName
      }
      const firstLetter = apiName.charAt(0)
      return firstLetter.toUpperCase() + apiName.slice(1)
    },
    handleKeydown: function (event) {
      switch (event.keyCode) {
        case 37:
          this.routeToInfoView(parseInt(this.rowNumber) - 1)
          break
        case 39:
          this.routeToInfoView(parseInt(this.rowNumber) + 1)
          break
      }
    }
  }
}
</script>
