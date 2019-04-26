<template>
	<div>
		 <div id='category' class="page">
			 <!-- 头部 -->
			<cg-header></cg-header>
			<div class="category-content">
				<!-- 侧边栏 -->
				<cg-menu-list></cg-menu-list>
				<!-- 菜单 -->
				<cg-menu></cg-menu>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import cgHeader from '@components/category/cg-header.vue';
	import cgMenu from '@components/category/cg-menu.vue';
	import cgMenuList from '@components/category/cg-menu-list.vue';
	export default {
		components : {
			cgHeader,
			cgMenu,
			cgMenuList
		}
	};
</script>
<style lang="scss" scoped>
	.category-content{
		width: 100%;
		position: absolute;
		top: 44px;
		left: 0;
		bottom: 0;
		display: flex;
		.cg-menu-list{
			width: 80px;
			overflow: hidden;
			height: 100%;
		}
		.cg-menu{
			flex: 1;
			height: 100%;
			overflow: hidden;
		}
	}
</style>
