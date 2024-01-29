<template>
  <div id="box-view" v-if="loaded">
    <div class="boxHeader">
      <v-btn> {{ this.prevBoxName }} </v-btn>
      <Dropdown v-model="currentBox" :options="boxNames" placeholder="Select a Box" />
      <v-btn> {{ this.nextBoxName }} </v-btn>
    </div>
    <Box />
  </div>
</template>

<script>
import Box from '../components/Box.vue'

import { SheetNames } from '../config.js'

import Dropdown from 'primevue/dropdown'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export default {
  name: 'BoxView',
  props: ['config'],
  components: {
    Box,
    Dropdown
  },
  created: async function () {
    await this.loadSheet()
    this.determineBoxNames()
    window.onhashchange = this.loadSheet
  },
  data() {
    return {
      loaded: false,
      allRows: [],
      boxNames: [],
      currentBox: '',
      sheetName: ''
    }
  },
  computed: {
    sheets() {
      return SheetNames
    },
    boxIndex() {
      return this.boxNames?.indexOf(this.currentBox)
    },
    prevBoxName() {
      if (this.boxNames.length == 0 || this.boxIndex == 0) {
        return ''
      }
      return this.boxNames[this.boxIndex - 1]
    },
    nextBoxName() {
      if (this.boxNames.length == 0 || this.boxIndex == this.boxNames.length - 1) {
        return ''
      }
      return this.boxNames[this.boxIndex + 1]
    }
  },
  methods: {
    loadSheet: async function () {
      const doc = new GoogleSpreadsheet(import.meta.env.VITE_SHEETID, {
        apiKey: import.meta.env.VITE_APIKEY
      })
      await doc.loadInfo()

      for (const sheetName of this.sheets) {
        const sheet = doc.sheetsByTitle[sheetName.replaceAll('-', ' ')]
        const rows = await sheet.getRows({
          offset: 3
        })
        if (this.allRows.length === 0) {
          this.allRows = rows
        } else {
          this.allRows = this.allRows.concat(rows)
        }
      }

      this.loaded = true
    },
    determineBoxNames: function () {
      // Grab rows with Box populated
      /*const boxedRows = allRows.filter(function (el) {
        return el.get('box') != null && el.get('box') != ''
      })*/
      const boxNames = new Set()
      for (const row of this.allRows) {
        const boxValue = row.get('box')
        if (boxValue != null && boxValue != '') {
          boxNames.add(boxValue.split('.')[0])
        }
      }
      console.log(boxNames)
      this.boxNames = Array.from(boxNames).sort(function (a, b) {
        if (a > b) {
          return a.substring(0, 3) === b.substring(0, 3) && a.length < b.length ? -1 : 1
        } else if (b > a) {
          return a.substring(0, 3) === b.substring(0, 3) && a.length > b.length ? 1 : -1
        }
        return 0
      })
    }
  }
}
</script>
