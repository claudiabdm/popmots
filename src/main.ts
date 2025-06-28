import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/nunito/wght.css';
import './assets/styles/styles.scss';
import { createHead } from '@unhead/vue';
import { localDB } from './data/indexedbd.ts/indexeddb';

const app = createApp(App)
app.use(router)

const head = createHead()
app.use(head)

app.mount('#app')

localDB.init();