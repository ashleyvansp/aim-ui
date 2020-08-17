import Vue from 'vue';
import AimUI from '../src/index';
import store from './store/store';
import '../src/scss/aim.scss';
import './assets/lato/latofonts.css';
import './assets/fontawesome-free-5.13.1-web/css/all.min.css';
import App from './App.vue';

Vue.use(AimUI);

window['vue'] = new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
