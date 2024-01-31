import './assets/main.scss'
import './assets/large.scss'
import './assets/medium.scss'
import './assets/small-ls.scss'
import './assets/small.scss'
import './assets/boxes.scss'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'

// PrimeVue
import PrimeVue from "primevue/config";

// Vuetify
import vuetify from '@/plugins/vuetify'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(vuetify)

app.component("DynamicStyle", (_props, context) => {
    return h("style", {}, context.slots);
});

app.mount('#app-mount')
