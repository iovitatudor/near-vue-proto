import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { initContract } from './near.js';

Vue.config.productionTip = false;

window.nearInitPromise = initContract().then(
    ({contract, currentUser, nearConfig, walletConnection}) => {
      new Vue({
        vuetify,
        render: h => h(App, {props:{ contract, currentUser, nearConfig, walletConnection}})
      }).$mount('#app')
    }
);