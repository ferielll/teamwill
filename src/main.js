/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from './router/index'
import 'vuetify/dist/vuetify.css'



// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from '@/store/store';


const app = createApp(App)

registerPlugins(app)
app.use(router);
app.use(store);
app.mount('#app')

