<template>
  <div id="sheet-view" v-if="loaded" class="table-container" width="100%">
    <div class="filter-container">
      <h2>Click anywhere in the Row for Full Details</h2>
      <h2>Click buttons to right to filter Generation</h2>
      <span class="p-buttonset">
        <Button label="ALL" class="buttonFilter" :class="{ activeButton: 'ALL' == activeFilter }" outlined icon="pi pi-filter" @click="updateFilter('ALL')"></Button>
        <Button
          :label="filter"
          class="buttonFilter"
          :class="{ activeButton: filter == activeFilter }"
          outlined
          v-for="filter in filterNames"
          @click="updateFilter(filter)"
        ></Button>
      </span>
    </div>
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
          v-for="row in filteredRows"
          @view-info="this.routeToInfoView(row)"
          :sheet="this.spreadsheet"
          :row="row"
        />
      </tbody>
    </table>
  </div>
  <div v-else class="loadingDiv">
    <img class="loadingImg" :src="loadingImage" />
  </div>
</template>

<script>
import { GoogleSpreadsheet } from 'google-spreadsheet'

import Button from 'primevue/button'
import Row from '../components/Row.vue'

import Images from '../images.js'

export default {
  name: 'SheetView',
  props: ['config'],
  components: {
    Row,
    Button
  },
  data() {
    return {
      loaded: false,
      sheetName: '',
      spreadsheet: null,
      rows: [],
      filterNames: [],
      activeFilter: 'ALL'
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
    },
    filteredRows() {
      const filter = this.activeFilter
      return filter == 'ALL' ? this.rows : this.rows.filter(function (el) {
        return el.get('category') == filter
      })
    }
  },
  methods: {
    loadSheet: async function () {
      this.activeFilter = 'ALL'
      this.sheetName = this.$route.params.sheetName.replaceAll('-', ' ')
      const doc = new GoogleSpreadsheet(import.meta.env.VITE_SHEETID, {
        apiKey: import.meta.env.VITE_APIKEY
      })

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle[this.sheetName]
      const rows = await sheet.getRows({
        offset: 3
      })
      this.spreadsheet = sheet
      this.rows = rows

      const filterNames = new Set()
      for (const row of this.rows) {
        const category = row.get('category')
        if (category != null && category != '') {
          filterNames.add(category)
        }
      }
      this.filterNames = Array.from(filterNames).sort(function (a, b) {
        if (a > b) {
          return 1
        } else if (b > a) {
          return -1
        }
        return 0
      })

      this.loaded = true
    },
    updateFilter: function (generation) {
      this.activeFilter = generation
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
