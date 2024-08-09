import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/nunito/wght.css';
import './assets/styles/styles.scss';
import { createHead } from '@unhead/vue';
// import { DAY_IN_MILLISECONDS } from './data';

// @ts-ignore
// Date = class extends Date {
//     // @ts-ignore
//     constructor(options) {
//         if (options) {
//             super(options);
//         } else {
//             super(Date.now() + (0 * DAY_IN_MILLISECONDS));
//         }
//     }
// };

const app = createApp(App)
app.use(router)

const head = createHead()
app.use(head)

app.mount('#app')
