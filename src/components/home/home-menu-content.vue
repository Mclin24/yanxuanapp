<template>
	<scroller class='menu'>
		<div class="banner">
			<img :src="categoryBanner" alt="">
		</div>
		<div class="category-list" v-for="list in categoryList" :key='list.info.title'>
			<h3>{{list.info.title}}</h3>
			<h6>{{list.info.subTitle}}</h6>
			<item-list :itemList='list.items'></item-list>
		</div>
	</scroller>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		props:['id','name'],
		watch: {
			id : {
					//每一次id发生变化时重新请求数据
					handler(newValue){
						//触发请求数据
						newValue && this.$store.dispatch('home/getCategoryData',{id : newValue});
					},
					immediate : true
			}
		},
		computed: {
			...mapState({
				categoryBanner : state=>state.home.categoryBanner,
				categoryList : state=>state.home.categoryList
			})
		},
	};
</script>
<style lang="scss" scoped>
	.menu{
		.banner img{
			width: 100%
		}
		.category-list{
			border-top: 8px solid #fdfdfd;
			h3{
				text-align: center;
				color: #333;
				font-size: 16px;
				line-height: 28px;
			}
			h6{
				text-align: center;
				color: #999;
				font-size: 12px;
				padding-bottom: 8px
			}
		}
	}
</style>
