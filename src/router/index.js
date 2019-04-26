import Vue from 'vue'
import Router from 'vue-router'

import homeRouter from './homeRouter'
import cartRouter from './cartRouter.js'
import categoryRouter from './categoryRouter.js'
import discoverRouter from './discoverRouter.js'
import mineRouter from './mineRouter.js'
import goodsRouter from './goodsRouter.js'

Vue.use(Router)
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL, // 服务器端口
	routes: [
		homeRouter,
		cartRouter,
		categoryRouter,
		discoverRouter,
		mineRouter,
		goodsRouter,
		//重定向
		{
			path : '/',
			redirect : '/home'
		}
	]
})
