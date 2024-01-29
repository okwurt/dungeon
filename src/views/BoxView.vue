<template>
    <div id="box-view">
        <div class="sheetSelector">

        </div>
        <div class="boxHeader">
            <button class="boxNav">
                Prev Box
            </button>
            <div class="boxName">
                Box Name
            </div>
            <button class="boxNav">
                Next Box
            </button>
        </div>
        <div class="box">

        </div>
    </div>
</template>

<script>
import BoxRow from '../components/BoxRow.vue'

import {SheetNames} from './config.js'

import { GoogleSpreadsheet } from 'google-spreadsheet'

export default {
  name: 'BoxView',
  props: ['config'],
  components: {
    BoxRow
  },
  data() {
    return {
        loaded: false,
        sheetName: ''
    }
  },
  computed() {
    sheets() {
      return SheetNames;
    }
  },
  methods: {

  } 
}
</script>