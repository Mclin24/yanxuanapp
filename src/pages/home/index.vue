<template>
    <div>
		<div id='home' class="page">
			<home-header></home-header>
			<home-menu></home-menu>
			<keep-alive>
				<router-view class='home-content'></router-view>
			</keep-alive>
		</div>
		<transition enter-active-class="slideInRight" leave-active-class='slideOutRight'>
			<router-view name='subpage'></router-view>
		</transition>
	</div>
</template>
<script>
	import homeHeader from '@/components/home/home-header.vue'
	import homeMenu from '@/components/home/home-menu.vue'	
	export default {
		components:{
			homeHeader,
			homeMenu
		}
	};
</script>
<style lang="scss" scoped>
	.home-content{
		width: 100%;
		position: absolute;
		top: 74px;
		left: 0;
		bottom: 0;
		overflow: hidden;
	}
</style>
