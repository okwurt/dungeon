<template>
  <div id="home-view">
    <div class="homeDivs">
      <img :src="dengarImg"/>
    </div>
    <div class="homeDivs textDiv">
      <h1>{{ this.config.subtitle }}</h1>
      <h4>My Current Time: {{ this.time }}</h4>
      <br/>
      <div>
        <p>Home FC: {{ this.config.homeFC }}</p>
        <p>Switch FC: {{ this.config.switchFC }}</p>
      </div>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Generation</th>
            <th>Game</th>
            <th>IGN</th>
            <th>TID</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="key" v-for="(game,key) in this.config.games">
            <td>{{ game.gen }}</td>
            <td>{{ game.game }}</td>
            <td>{{ game.ign }}</td>
            <td>{{ game.tid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Dengar from '@/assets/images/dengar.jpg'

export default {
  name: 'HomeView',
  props: [
    'config'
  ],
  data() {
    return {
      interval: null,
      time: null
    }
  },
  computed: {
    dengarImg() {
      return Dengar
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000)
  }
}

</script>