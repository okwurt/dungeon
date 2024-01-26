<template>
  <div id="detail-view" v-if="loaded">
    <div class="pokemonView" v-bind:style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <!-- Header Bar Info -->
      <div
        v-if="prevPkmnName != ''"
        class="prevContainer"
        @click="routeToInfoView(parseInt(this.rowNumber) - 1)"
      >
        <img :src="prevPkmnImg" />
      </div>
      <img class="ballContainer" :src="ballImg" />
      <div class="headNameContainer">
        <h1>{{ this.row.get('name') }}</h1>
      </div>
      <div class="levelContainer">
        <h1>Lv. {{ this.row.get('level') }}</h1>
      </div>
      <img class="isGigContainer" v-if="isGigantamax" :src="gigantamaxImg" />
      <img class="isShinyContainer" v-if="isShiny" :src="shinyImg" />
      <div
        v-if="nextPkmnName != ''"
        class="nextContainer"
        @click="routeToInfoView(parseInt(this.rowNumber) + 1)"
      >
        <img :src="nextPkmnImg" />
      </div>
      <div class="eventContainer">
        <h3 class="eventData">Event (Bulbapedia Link): &nbsp;</h3>
        <a class="eventData" :href="eventCell.hyperlink">{{ this.row.get('event') + ' ' + this.trimmedName() }}</a>
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
          <div class="typeIterator" :key="type.slot" v-for="type in pokemonData?.types" >
            <img class="typeImg" :src="fetchTypeImg(type.type.name)"/>
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
        <h5 v-if="selfObtained">{{ this.row.get('tradeOrigin') }}</h5>
        <a
          v-else-if="tradeOrigCell.hyperlink != null"
          class="tradeHistoryData"
          :href="tradeOrigCell.hyperlink"
          >{{ this.row.get('tradeOrigin') }}</a
        >
        <h5 v-else>{{ this.row.get('tradeOrigin') }}</h5>
        <a
          v-if="tradeHop1Cell.hyperlink != null"
          class="tradeHistoryData"
          :href="tradeHop1Cell.hyperlink"
          >{{ this.row.get('tradeHop1') }}</a
        >
        <h5 v-else>{{ this.row.get('tradeHop1') }}</h5>
        <a
          v-if="tradeHop2Cell.hyperlink != null"
          class="tradeHistoryData"
          :href="tradeHop1Cell.hyperlink"
          >{{ this.row.get('tradeHop2') }}</a
        >
        <h5 v-else>{{ this.row.get('tradeHop2') }}</h5>
        <a
          v-if="tradeHop3Cell.hyperlink != null"
          class="tradeHistoryData"
          :href="tradeHop1Cell.hyperlink"
          >{{ this.row.get('tradeHop3') }}</a
        >
        <h5 v-else>{{ this.row.get('tradeHop3') }}</h5>
      </div>
      <div class="notesContainer">
        <h3>Disclosure / Notes:</h3>
        <h5>{{ this.row.get('disclosure') }}</h5>        
      </div>
      <div class="boxContainer">
        <h6>Box Location: {{ this.row.get('box') }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonDetail from '@/assets/images/PokemonHomeBlank.jpg'

import Images from '../images.js'
import Sprites from '../sprites.js'
import Utilities from '../utilities.js'

import { GoogleSpreadsheet } from 'google-spreadsheet'

import { Pokedex } from 'pokeapi-js-wrapper'
const P = new Pokedex()

export default {
  name: 'PokemonInfo',
  props: ['config'],
  data() {
    return {
      loaded: false,
      pokeLoaded : false,
      spreadsheet: null,
      rows: [],
      rowNumber: 0,
      eventCell: null,
      tradeOrigCell: null,
      tradeHop1Cell: null,
      tradeHop2Cell: null,
      tradeHop3Cell: null,
      pokemonData: null
    }
  },
  created: async function () {
    await this.loadSheet()
    this.setCells()
    this.fetchPokeAPIInfo()
    this.loaded = true
    window.onhashchange = this.loadSheet
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        this.loaded = false
        this.pokeLoaded = false
        this.rows = null
        this.pokemonData = null
        await this.loadSheet()
        this.setCells()
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
      return this.rows[1]
    },
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
    loadSheet: async function () {
      this.rowNumber = this.$route.params.rowNum

      const sheetName = this.$route.params.sheetName.replaceAll('-', ' ')
      const sheetID = import.meta.env.VITE_SHEETID
      const doc = new GoogleSpreadsheet(sheetID, { apiKey: import.meta.env.VITE_APIKEY })

      // Load Sheets from Google
      await doc.loadInfo()
      const sheet = doc.sheetsByTitle[sheetName]

      // Load just this Row
      const rows = await sheet.getRows({
        offset: this.rowNumber - 3,
        limit: 3
      })

      // Load this Row's cells into the Sheet's Cache - this has more detailed data than the Row itself
      await sheet.loadCells([
        this.config.eventURLColumn + this.rowNumber,
        this.config.tradeURLColumn1 +
          this.rowNumber +
          ':' +
          this.config.tradeURLColumn4 +
          this.rowNumber
      ])

      // Store the Sheet and Rows
      this.spreadsheet = sheet
      this.rows = rows
    },
    setCells: function () {
      this.eventCell = this.spreadsheet.getCellByA1(this.config.eventURLColumn + this.rowNumber)
      this.tradeOrigCell = this.spreadsheet.getCellByA1(
        this.config.tradeURLColumn1 + this.rowNumber
      )
      this.tradeHop1Cell = this.spreadsheet.getCellByA1(
        this.config.tradeURLColumn2 + this.rowNumber
      )
      this.tradeHop2Cell = this.spreadsheet.getCellByA1(
        this.config.tradeURLColumn3 + this.rowNumber
      )
      this.tradeHop3Cell = this.spreadsheet.getCellByA1(
        this.config.tradeURLColumn4 + this.rowNumber
      )
    },
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
      this.pokeLoaded = true
    },
    fetchTypeImg: function(type) {
      return Images.typeImg(type)
    },
    trimmedName: function() {
      const apiName = this.pokemonData?.name
      if (apiName == null) {
        return apiName
      }
      const firstLetter = apiName.charAt(0)
      return firstLetter.toUpperCase() + apiName.slice(1)
    }
  }
}
</script>
