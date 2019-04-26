export default {
	path : '/home',
	component : ()=>import('@pages/home/index.vue'),
	children : [
		{
			alias : '',
			path : 'main',
			component : ()=>import('@components/home/home-main-content.vue')
		},
		{
			path : 'menu/:id/:name',
			component : ()=>import('@components/home/home-menu-content.vue'),
			props : true
		},
		{
			path : 'categorylist/:id/:name',
			components : {
				'default': ()=>import('@components/home/home-main-content'),
				'subpage' : ()=>import('@pages/home/category-list.vue')
			},
			props : {
				subpage : true
			}
		}
	]
}