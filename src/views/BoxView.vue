<template>
  <div id="box-view" v-if="loaded">
    <div class="boxHeader">
      <Button :label="prevBoxName" outlined icon="pi pi-arrow-left" class="buttonLeft" @click="updateBox(prevBoxName)"/>
      <Dropdown v-model="currentBox" :options="boxNames" placeholder="Select a Box" />
      <Button :label="nextBoxName" outlined icon="pi pi-arrow-right" icon-pos="right" class="buttonRight" @click="updateBox(nextBoxName)"/>
    </div>
    <div class="pokemonBox no-outline">
      <BoxRow :rows="row1" />
      <BoxRow :rows="row2" />
      <BoxRow :rows="row3" />
      <BoxRow :rows="row4" />
      <BoxRow :rows="row5" />
    </div>
    <div hidden>{{ this.boxRows?.length }}</div>
  </div>
</template>

<script>
import BoxRow from '../components/BoxRow.vue'
import { useBoxStore } from '@/stores/box'

import { SheetNames } from '../config.js'

import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { GoogleSpreadsheet } from 'google-spreadsheet'

export default {
  name: 'BoxView',
  props: ['config'],
  components: {
    BoxRow,
    Button,
    Dropdown
  },
  beforeMount() {
    window.addEventListener('keydown', this.handleKeydown, null)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
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
    },
    rowsInBox() {
      return this.allRows.filter(function (el) {
        return el.get('box')?.split('.')[0] == this.currentBox
      }, this)
    },
    row1() {
      return this.rowsInBox
        .filter(function (el) {
          return el.get('box')?.split('.')[1] == 1
        })
        .sort(function (a, b) {
          if (a.get('box').split('.')[2] > b.get('box').split('.')[2]) {
            return 1
          } else if (b.get('box').split('.')[2] > a.get('box').split('.')[2]) {
            return -1
          }
          return 0
        })
    },
    row2() {
      return this.rowsInBox
        .filter(function (el) {
          return el.get('box')?.split('.')[1] == 2
        })
        .sort(function (a, b) {
          if (a.get('box').split('.')[2] > b.get('box').split('.')[2]) {
            return 1
          } else if (b.get('box').split('.')[2] > a.get('box').split('.')[2]) {
            return -1
          }
          return 0
        })
    },
    row3() {
      return this.rowsInBox
        .filter(function (el) {
          return el.get('box')?.split('.')[1] == 3
        })
        .sort(function (a, b) {
          if (a.get('box').split('.')[2] > b.get('box').split('.')[2]) {
            return 1
          } else if (b.get('box').split('.')[2] > a.get('box').split('.')[2]) {
            return -1
          }
          return 0
        })
    },
    row4() {
      return this.rowsInBox
        .filter(function (el) {
          return el.get('box')?.split('.')[1] == 4
        })
        .sort(function (a, b) {
          if (a.get('box').split('.')[2] > b.get('box').split('.')[2]) {
            return 1
          } else if (b.get('box').split('.')[2] > a.get('box').split('.')[2]) {
            return -1
          }
          return 0
        })
    },
    row5() {
      return this.rowsInBox
        .filter(function (el) {
          return el.get('box')?.split('.')[1] == 5
        })
        .sort(function (a, b) {
          if (a.get('box').split('.')[2] > b.get('box').split('.')[2]) {
            return 1
          } else if (b.get('box').split('.')[2] > a.get('box').split('.')[2]) {
            return -1
          }
          return 0
        })
    },
    boxRows() {
        if (this.row1 == null || this.row1 == []) {
            return []
        }
        const storedRows = this.row1.concat(this.row2).concat(this.row3).concat(this.row4).concat(this.row5)
        const box = useBoxStore()
        box.setCurrentBox(storedRows)
        return storedRows
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
      const boxNames = new Set()
      for (const row of this.allRows) {
        const boxValue = row.get('box')
        if (boxValue != null && boxValue != '') {
          boxNames.add(boxValue.split('.')[0])
        }
      }
      this.boxNames = Array.from(boxNames).sort(function (a, b) {
        if (a > b) {
          return a.substring(0, 3) === b.substring(0, 3) && a.length < b.length ? -1 : 1
        } else if (b > a) {
          return a.substring(0, 3) === b.substring(0, 3) && a.length > b.length ? 1 : -1
        }
        return 0
      })
    },
    updateBox: function(boxName) {
        this.currentBox = boxName
    },
    handleKeydown: function (event) {
      switch (event.keyCode) {
        case 37:
          if (this.prevBoxName != '') {
            this.updateBox(this.prevBoxName)
          }
          break
        case 39:
          if (this.nextBoxName != '') {
            this.updateBox(this.nextBoxName)
          }
          break
      }
    }
  }
}
</script>
