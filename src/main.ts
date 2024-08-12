import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/nunito/wght.css';
import './assets/styles/styles.scss';
import { createHead } from '@unhead/vue';

// @ts-ignore
// Date = class extends Date {
//     // @ts-ignore
//     constructor(options) {
//         if (options) {
//             super(options);
//         } else {
//             super(Date.now() + (0.9 * 60 * 60 * 1000 * 24));
//         }
//     }
// };

const app = createApp(App)
app.use(router)

const head = createHead()
app.use(head)

app.mount('#app')
