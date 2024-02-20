<template>
  <div id="sheet-view" v-if="loaded" class="table-container" width="100%">
    <h2>Click anywhere in the Row for Full Details</h2>
    <table>
      <thead>
        <tr class="backgroundheader no-bottom-border">
          <th></th>
          <!-- Sprite IMG -->
          <th>Ball</th>
          <th>Name</th>
          <th></th>
          <!-- Shiny IMG -->
          <th>OT / TID</th>
          <th>Ability</th>
          <th>Trade History</th>
          <th>Disclosure</th>
        </tr>
        <tr class="backgroundheader shortrow">
          <th></th>
          <th colspan="2"></th>
          <th></th>
          <!-- Gigantamax IMG -->
          <th></th>
          <th class="verticaltop">Nature</th>
          <th class="subheader">exchange = r/pokemonexchange</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Row
          :key="row.rowNumber"
          v-for="row in rows"
          @view-info="this.routeToInfoView(row)"
          :sheet="this.spreadsheet"
          :row="row"
        />
      </tbody>
    </table>
  </div>
  <div v-else class="loadingDiv">
    <img class="loadingImg" :src="loadingImage">
  </div>
</template>

<script>
import { GoogleSpreadsheet } from 'google-spreadsheet'

import Row from '../components/Row.vue'

import Images from '../images.js'

export default {
  name: 'SheetView',
  props: ['config'],
  components: {
    Row
  },
  data() {
    return {
      loaded: false,
      sheetName: '',
      spreadsheet: null,
      rows: []
    }
  },
  created: async function () {
    await this.loadSheet()
    window.onhashchange = this.loadSheet
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.loaded = false
        this.rows = []
        this.loadSheet()
      }
    )
  },
  computed: {
    loadingImage() {
      return Images.loadingImg()
    }
  },
  methods: {
    loadSheet: async function () {
      this.sheetName = this.$route.params.sheetName.replaceAll('-', ' ')
      const doc = new GoogleSpreadsheet(import.meta.env.VITE_SHEETID, { apiKey: import.meta.env.VITE_APIKEY })

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle[this.sheetName]
      const rows = await sheet.getRows({
        offset: 3
      })
      this.spreadsheet = sheet
      this.rows = rows
      this.loaded = true
    },
    routeToInfoView: function (row) {
      this.$router.push({
        name: 'pokemon',
        params: {
          sheetName: this.$route.params.sheetName,
          rowNum: row.rowNumber
        }
      })
    }
  }
}
</script>
