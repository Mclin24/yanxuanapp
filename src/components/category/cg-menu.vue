<template>
    <scroller class='cg-menu' ref="scroll">
		<img class="banner" :src="catemenudata.bannerUrl" alt="">
		<div class="content" v-for="item in catemenudata.categoryGroupList" :key="item.id">
			<h3 v-if="item.name" class="content-title border-bottom">{{item.name}}</h3>
			<ul class="content-list">
				<li class="content-item" v-for="list in item.categoryList" :key="list.id"
					@click="goCategoryGoods(list)">
					<img :src="list.bannerUrl" alt="">
					<p>{{list.name}}</p>
				</li>
			</ul>
		</div>
	</scroller>
</template>
<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		created(){
			this.$store.dispatch('category/getCateMenuData');
		},
		computed: {
			...mapState({
				catemenudata : state=>state.category.catemenudata
			}),
			...mapGetters({
				selectMenuId : "category/selectMenuId"
			})
		},
		watch: {
			selectMenuId(newValue) {
				//监听到id的变化，请求数据
				this.$store.dispatch('category/getCateMenuData',this.selectMenuId);
				this.$refs.scroll.scrollTo(0,0);
			}
		},
		methods: {
			goCategoryGoods(list) {
				// console.log(list);
				this.$router.push(`/category/group/${list.id}`);
			}
		},
	};
</script>
<style lang="scss" scoped="scoped">
	.cg-menu{
		padding: 10px;
		box-sizing: border-box;
		img{
			width: 100%;
		}
		.content{
			.content-title{
				font-size: 14px;
				font-weight: bold;
				padding: 8px;
			}
			.content-list{
				overflow: hidden;
				padding: 10px 0;
				.content-item{
					width: 33.33%;
					float: left;
					img{
						width: 90%;
						margin: 0 auto;
						display: block;
					}
					p{
						padding:  0 5px;
						text-align: center;
						font-size: 12px;
						color: #333;
						line-height: 16px;
						height: 32px;
						overflow: hidden;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
					}
				}
			}
		}
	}
</style>
