//商品详情数据
export default {
	path: '/itemdetail/:id',
	components: {
		detail: () => import('@pages/common/goods-detail.vue'),
	},
	props: {
		detail: true
	},
	children: [
		{
			path: 'buy',
			component: () => import('@pages/common/buy')
		},
		{
			path : 'goodscount',
			components : {
				'goodscount' : () => import('@pages/common/goodscount')
			}
		}
	]
}
