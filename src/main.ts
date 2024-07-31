import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/nunito/wght.css';
import './assets/styles/styles.scss';

const app = createApp(App)

app.use(router)

app.mount('#app')
