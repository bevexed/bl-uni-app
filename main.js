import Vue from 'vue'
import App from './App'

import vfinger from 'v-finger-mk42';
Vue.use(vfinger);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App,
});
app.$mount();
