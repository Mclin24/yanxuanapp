export default {
	path : '/category',
	component : ()=>import('@pages/category/index.vue'),
	children : [
		{
			path : 'group/:id',
			component : ()=>import('@pages/category/category-group.vue'),
			props : true
		}
	]
}