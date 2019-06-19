import Vue from 'vue'
import Vuex from 'vuex'

import User from './user'
import Products from './products'
import Cart from './cart'
import Collect from './collect'
import Home from './home'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Products,
    Cart,
    Collect,
    Home
  }
})
