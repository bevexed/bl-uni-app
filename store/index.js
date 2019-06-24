import Vue from 'vue'
import Vuex from 'vuex'

import User from './user'
import Products from './products'
import Cart from './cart'
import Collect from './collect'
import Home from './home'
import Address from './address'
import Order from './order'
import Sale from './sale'
import Invoice from './invoice'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Products,
    Cart,
    Collect,
    Home,
    Address,
    Order,
    Sale,
    Invoice
  }
})
