<template>
    <div id='discover' class="page">
		<header class="discover-header border-bottom">发现</header>
		<ul class="tab-list border-bottom">
			<li class="tab-item" v-for="(item,index) in tabData" :key="item.tabId"
			 @click="selectAction(index)">
				<span :class="{active:selectIndex==index}">{{item.tabName}}</span>
			</li>
		</ul>
		<scroller class="discover-content" ref="scroll">
			<div class="style" v-for="item in discoverdata" :key="item.picUrl">
				<style1 :style1="item" v-if="item.style == 1"></style1>
				<style2 :style2="item" v-if="item.style == 2"></style2>
				<style3 :style3="item" v-if="item.style == 3"></style3>
				<div v-if="item.style == 0" class="style0">
					<div class="title">
						{{item.title}}
					</div>
					<div class="img">
						<img :src="item.picUrl" alt="">
					</div>
					<div class="readcount">
						<van-icon name="eye-o"></van-icon><span>{{item.readCount}}人看过</span>
					</div>
				</div>
			</div>			
		</scroller>
    </div>
</template>
<script>
	import {mapState} from 'vuex'
	import style1 from '@components/discover/dc-content-style1'
	import style2 from '@components/discover/dc-content-style2'
	import style3 from '@components/discover/dc-content-style3'
	export default {
		data() {
			return {
				selectIndex : 0 
			}
		},
		components : {
			style1,
			style2,
			style3
		},
		created(){
			//请求tab列表数据
			this.$store.dispatch("discover/getTabsData");
			//请求推荐的数据
			this.$store.dispatch('discover/getDiscoverData')
		},
		computed: {
			...mapState({
				tabData : state=>state.discover.tabData,
				discoverdata : state=>state.discover.discoverdata
			})
		},
		methods: {
			selectAction(index) {
				if(this.selectIndex == index){
					return;
				}
				this.selectIndex = index;
				// console.log(this.tabData[index].tabId);
				let tabId = this.tabData[index].tabId;;
				
				if(tabId==7){
					//请求晒单数据
					//请求晒单banner数据	
					this.$store.dispatch('discover/getShaiDanBanner');
					
				}else{
					//请求列表内容数据
					this.$store.dispatch('discover/getDiscoverData',tabId)	
				}
			}
		},
		watch : {
			selectIndex(){
				this.$refs.scroll.scrollTo(0,0);
			}
		}
	};
</script>
<style lang="scss" scoped="scoped">
	.discover-header{
		width: 100%;
		height: 44px;
		left: 0;
		top: 0;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		line-height: 44px;
		color: #b4282d;
	}
	.tab-list{
		display: flex;
		position: absolute;
		height: 30px;
		width: 100%;
		top: 44px;
		left: 0;
		.tab-item{
			flex: 1;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: #333;
			border: 2px solid transparent;
			span{
				padding-bottom: 2px;
				&.active{
					color: #b4282d;
					border-bottom: 2px solid #b4282d;
				}
			}
		}
	}
	.discover-content{
		width: 100%;
		top: 74px;
		bottom: 0;
		position: absolute;
		overflow : hidden;
		.style{
			.style0{
				border-top: 10px solid lavender;
				padding: 18px 15px;
				.title{
					margin-top: 5px;
					font-size: 18px;
					line-height: 25px;
					color: #333;
					overflow: hidden;
				}
				.img{
					width: 100%;
					margin-top: 10px;
					img{
						width:100%;
						border-radius: 5px;
					}
				}
				.readcount{
					color: #999;
					margin-top: 10px;
					display: flex;
					font-size: 12px;
					span{
						line-height: 14px;
					}
					.van-icon{
						line-height: 14px;
						margin-right: 3px;
					}
				}
			}
		}
	}
</style>
