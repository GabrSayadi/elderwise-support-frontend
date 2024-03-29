import { createApp } from 'vue';
import App from './App.vue';
import router from '../../router/prov-router';
import store from '../../store';
import '../../assets/css/global.styl';

const app = createApp(App);
app.use(router)
    .use(store).mount('#app');
