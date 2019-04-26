import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import category from './modules/category'
import goods from './modules/goods'
import discover from './modules/discover'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		home,
		category,
		goods,
		discover,
		user,
		cart
	}
})
