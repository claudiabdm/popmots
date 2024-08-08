import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource-variable/nunito/wght.css';
import './assets/styles/styles.scss';
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

app.mount('#app')
