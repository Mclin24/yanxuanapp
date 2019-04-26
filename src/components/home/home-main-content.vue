<template>
	<scroller class='main'>
		<!-- 轮播图 -->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in bannerList" :key='item.id'>
				<img :src="item.picUrl">
			</van-swipe-item>
		</van-swipe>
		<!-- 协议内容 -->
		<div>
			<ul class="policy-list">
				<li v-for="item in policy" :key='item.desc' class="policy-item">
					<img :src="item.icon" alt="">
					<span>{{item.desc}}</span>
				</li>
			</ul>
		</div>
		<!-- 分类栏 -->
		<ul class="cate-list">
			<li class="cate-item" v-for="item in topcateList" :key="item.picUrl" @click="goCatePages(item.text)">
				<img :src="item.picUrl">
				<p>{{item.text}}</p>
			</li>
		</ul> 
		<!-- 制造商直供 -->
		<div class="manufatuer">
			<div class="title">
				<div class="left">
					<span>品牌制造商直供</span>
				</div>
				<div class="right">
					<span>更多</span><van-icon name="arrow"></van-icon>
				</div>
			</div>
			<div class="manufatuerList" v-for="item in ManufacturerList" :key="item.id">
				<h3>{{item.name}}</h3>
				<div class="floorPrice"><span>{{item.floorPrice}}元起&nbsp;</span><i>上新</i></div>
				<img :src="item.picUrl" alt="">
			</div>
		</div>
		<!-- 类目热销榜 -->
		<div class="catehotsell">
			<div class="title">
				类目热销榜
			</div>
			<div class="hotsell-content">
				<div class="line1" v-for="(item,index) in CatehotsellData.categoryList" :key="item.categoryName" v-if="index==0||index==1">
					<span>{{item.categoryName}}</span>
					<img :src="item.picUrl" alt="">
				</div>
				<div class="line2" v-for="(item,index) in CatehotsellData.categoryList" :key="item.categoryName" v-if="index!=0&&index!=1">
					<span>{{item.categoryName}}</span>
					<img :src="item.picUrl" alt="">
				</div>
			</div>
		</div>
		<!-- 人气推荐 -->
		<div class="popularlist">
			<div class="title">
				<div class="left">
					<span>人气推荐</span>
				</div>
				<div class="right">
					<span>更多</span><van-icon name="arrow"></van-icon>
				</div>
			</div>
			<div class="popular-content">
				<div class="line1"  v-for="(item,index) in popularLsit" :key="item.listPicUrl" v-if="index==0" @click="goDetail(item)">
					<div class="img">
						<img :src="item.listPicUrl" alt="">
					</div>
					<div class="msg">
						<p class="tip">
								<span v-for="(tip,index) in item.itemTagList" :key="index" v-if="index==0">
									{{tip.name}}
								</span>
						</p>
						<p class="name linetop">{{item.name}}</p>
						<p class="desc">{{item.simpleDesc}}</p>
						<p class="price"><span>¥{{item.retailPrice}}</span></p>
					</div>
				</div>
				<div class="line2">
					<ul class="msg-content">
						<li class="msg-item" v-for="(item,index) in popularLsit" :key="item.listPicUrl" v-if="index!=0" @click="goDetail(item)">
							<img :src="item.listPicUrl" alt="">
							<p class="name">{{item.name}}&nbsp;<span>¥{{item.retailPrice}}</span></p>
							<p class="tip">
								<span v-for="(tip,index) in item.itemTagList" :key="index" v-if="index==0">
									{{tip.name}}
								</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 新品首发 -->
		<div class="newgoods">
			<div class="title">
				<div class="left">
					<span>新品首发</span>
				</div>
				<div class="right">
					<span>更多</span><van-icon name="arrow"></van-icon>
				</div>
			</div>
			<div class="item" v-for="(item,index) in newGoodsData" :key="item.id" v-if="index<6" @click="goDetail(item)">
				<img :src="item.listPicUrl" alt="">
				<p class="name">{{item.name}}<span>&nbsp;¥{{item.retailPrice}}</span></p>
				<p class="tip" v-if="item.promTag">
					<span>
						{{item.promTag}}
					</span>
				</p>
			</div>
		</div>
		<!-- 购物指南 -->
		<div class="shoppingguide">
			<div class="shopping-item" v-for="item in shoppingdata" :key="item.title">
				<p class="shopping-title">{{item.title}}</p>
				<p class="shopping-desc">{{item.desc}}</p>
				<img v-for="(pic,index) in item.picUrlList" :src="pic" alt="" :key="index">
			</div>
		</div>
		<!-- 视图列表 -->
		<template>
			<home-main-view v-for="item in mainviewList" :key='item.titlePicUrl' :data="item">
			</home-main-view>
		</template>
	</scroller>
</template>

<script>
	import {mapState} from 'vuex'
	//轮播图插件
	import { Swipe, SwipeItem } from 'vant';
	//引入推荐页面的视图列表
	import homeMainView from '@/components/home/home-main-view.vue'
	export default {
		created(){
			//请求推荐页面的数据
			//轮播图
			this.$store.dispatch('home/getBannerData');
			//请求协议数据
			this.$store.dispatch('home/getPolicyData');
			//请求视图列表数据
			this.$store.dispatch('home/getMainViewData');
			//请求推荐页面分类列表
			this.$store.dispatch('home/getTopCateData');
			//请求品牌制造商直供数据
			this.$store.dispatch('home/getManufacturerData');
			//类目热销榜
			this.$store.dispatch('home/getCatehotsellData');
			//人气推荐
			this.$store.dispatch('home/getPopularlist');
			//新品首发
			this.$store.dispatch('home/getNewGoods')
			//购物只能
			this.$store.dispatch('home/getShoppingdata')
		},
		computed: {
			...mapState({
				bannerList : state=>state.home.bannerList,
				policy : state=>state.home.policy,
				menuList : state=>state.home.menuList,
				mainviewList : state=>state.home.mainviewList,
				topcateList : state=>state.home.topcateList,
				ManufacturerList : state=>state.home.ManufacturerList,
				CatehotsellData : state=>state.home.CatehotsellData,
				popularLsit : state=>state.home.popularLsit,
				newGoodsData : state=>state.home.newGoodsData,
				shoppingdata : state=>state.home.shoppingdata
			})
		},
		components : {
			[Swipe.name] : Swipe,
			[SwipeItem.name] : SwipeItem,
			homeMainView
		},
		methods: {
			goCatePages(text) {
				let {id,label} = this.menuList.find(item=>{
					return item.label === text;
				});
				this.$router.push(`/home/categorylist/${id}/${label}`);
			},
			goDetail(item){
				this.$router.push(`/itemdetail/${item.id}`);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.main{
		.title{
			width: 100%;
			height: 40px;
			position: relative;
			color: #333;
			line-height: 40px;
			.left{
				position: absolute;
				left: 0;
			}
			.right{
				position: absolute;
				right: 0;
				.van-icon{
					height: 100%;
					font-size: 15px;
					top: 3px;
					line-height: 40px;
				}
			}
		}
		.policy-list{
			padding: 5px 2px;
			display: flex;
			background: #fff;
			.policy-item{
				flex: 1;
				overflow: hidden;
				img{
					width: 14px;
					height: 14px;
					float: left;
				}
				span{
					font-size: 12px;
					color: #b4282d;
					line-height: 12px;
					float: left;
				}
			}
		}
		.manufatuer{
			padding: 13px;
			font-size: 14px;
			overflow: hidden;
			border-bottom: 10px solid lavender;		
			.manufatuerList{
				float: left;
				width: 49%;
				height: 120px;
				margin: 1px;
				text-align: center;
				font-size: 12px;
				position: relative;
				h3{
					width: 100%;
					position: absolute;
					top: 8px;
				}
				.floorPrice{
					width: 100%;
					position: absolute;
					top: 25px;
					span{
						color: #7F7F7F;
					}
					i{
						background: #CBB693;
						color: #fff;
						border-radius: 2px;
					}
				}
				img{
					width: 100%;
					height: 120px;
					top: 0;
				}
			}
		}
		.catehotsell{
			padding: 13px;
			overflow: hidden;
			font-size: 12px;
			color: #333;
			border-bottom: 10px solid lavender;
			.title{
				height: 40px;
				line-height: 40px;
				font-size: 16px;
			}
			.hotsell-content{
				.line1{
					width: 48.5%;
					height: 100px;
					float: left;
					background: #EBEFF6;
					margin: 2px;
					position: relative;
					span{
						display: block;
						line-height: 100px;
						font-size: 14px;
						padding-left: 2px;
						&:before{
							content: '';
							position: absolute;
							left: 0;
							bottom:30px;
							width: 20px;
							height: 1px;;
							left: 2px;
							background: #333;
						}
					}
					img{
						position: absolute;
						width: 64%;
						height: 100%;
						right: 0;
						display: block;
						bottom: 1px;
					}
				}
				.line2{
					width: 23.6%;
					float: 	left;
					background: #EBEFF6;
					margin: 2px;
					text-align: center;
					span{
						margin: 4px 0;
						display: block;
					}
					img{
						width: 85%;
					}
				}
			}
		}
		.popularlist{
			padding: 13px;
			overflow: hidden;
			border-bottom: 10px solid lavender;
			.popular-content{						
				.tip{
				    height: 21px;
					margin-top: 8px;
				    span{
				        font-size: 12px;      
				        border: 1px solid #b4282d;
				        color: #b4282d;
						
				    }
				}
				.name{
					font-size: 12px;
					color: #333;
					line-height: 18px;
					overflow: hidden;
					span{
						color: #b4282d;
					}
				}
				.line1{
					margin-bottom: 8px;
					background: #FEF0DF;
					overflow: hidden;
					.img{
						width: 38%;
						padding: 6px;
						float: left;
						img{
							width: 100%;
						}
					}
					.msg{
						width: 50%;
						float: right;
						padding: 20px 10px;
						.desc{
							font-size: 12px;
							color: #7F7F7F;
							padding: 5px 0 ;
						}
						.linetop{
							font-size: 14px;
							line-height: 16px;
							text-overflow: ellipsis;
							white-space: nowrap;
							
						}
					}
					.price{
						padding-top: 5px;
						font-size: 14px;
						color: #b4282d;
					}
				}
				.line2{
					.msg-content{
						overflow: hidden;
						display: flex;
						justify-content: space-between;
						.msg-item{
							width: 31%;
							img{
								width: 100%;
								background: #f4f4f4;
							}
						}
					}
				}
			}
		}
		.newgoods{
			padding: 13px;
			overflow: hidden;
			border-bottom: 10px solid lavender;
			.item{
				width: 31.25%;
				height: 180px;
				float: left;
				color: #333;
				margin: 3px;
				img{
					width: 100%;
					background: #f4f4f4;
				}
				.name{
					font-size: 12px;
					text-align: left;
					font-family: PingFangSC-Regular;
					white-space: normal;
					line-height: 18px;
					span{
						font-size: 14px;
						color: #b4282d;
					}
				}
				.tip{
				    height: 21px;
					margin-top: 8px;
				    span{
				        font-size: 12px;      
				        border: 1px solid #b4282d;
				        color: #b4282d;
						
				    }
				}
			}
		}
		.shoppingguide{
			padding: 13px;
			overflow: hidden;
			border-bottom: 10px solid lavender;		
			.shopping-item{
				float: left;
				width: 46.5%;
				background: #f4f4f4;
				margin: 1px;
				padding: 10px 0 0 8px;
				img{
					width: 48%;
				}
				.shopping-title{
					font-size: 16px;
					color: #333;
					line-height: 20px;
				}
				.shopping-desc{
					color: #7f7f7f;
					font-size: 12px;
					margin-top: 6px;
				}
			}
		}
		
		.cate-list{
			overflow: hidden;
			padding: 5px;
			background: #fff;
			border-bottom: 10px solid lavender;
			.cate-item{
				width: 20%;
				padding: 5px;
				box-sizing: border-box;
				float: left;
				img{
					width: 100%;
				}
				p{
					font-size: 12px;
					text-align: center;
					counter-reset: #333;
					line-height: 24px;
				}
			}
			
		}
	}
</style>
<style>
	.van-swipe-item img{
		width: 100%;
		display: block;
	}
	.van-swipe__indicator {
		width: 14px;
		height: 3px;
	}
</style>
