<template>
	<scroller class='cg-menu-list border-right'>
		<nav class="category-menu">
			<ul>
				<li class="category-item" v-for="(item,index) in catemenuList" 
				:key="item.id" :class="{active : index===selectIndex}" @click="selectAction(index)">
					<span>{{item.name}}</span>
				</li>
			</ul>
		</nav>
	</scroller>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		created(){
			this.$store.dispatch('category/getCateMenuListData');
		},
		computed: {
			...mapState({
				catemenuList : state=>state.category.catemenuList,
				selectIndex : state=>state.category.selectMenuIndex
			})
		},
		methods: {
			selectAction(index) {
				//点击列表，触发切换id事件，传递该id值
				this.$store.commit('category/setMenuIndex',index);
			}
		},
	};
</script>
<style lang="scss" scoped="scoped">
	.category-item{
		padding: 10px 0;
		span{
			font-size: 12px;
			color: #333;
			text-align: center;
			line-height: 20px;
			display: block;
			border-left: 2px solid #fff;
		}
		&.active span{
			border-left: 2px solid #ab2b2b;
			color: #ab2b2b;
		}
	}
	
</style>
