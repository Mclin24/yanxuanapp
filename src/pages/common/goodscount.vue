<template>
    <div class="page subpage" id="goodscount">
		<header class="sub-header">
			<van-icon name='arrow-left' @click='goBackAction'></van-icon>
			<h1 class='title'>选择商品规格和数量</h1>
		</header>
		<scroller class="goods-count-content">
			<div class="goodscountContent">
				<div class="info-con">
					<img :src="GoodsSkuList[selectedIndex].picUrl" alt="">
					<div class="msg">
						<span class="tag" v-if="GoodsSkuList[selectedIndex].promotionDesc">{{GoodsSkuList[selectedIndex].promotionDesc}}</span>
						<p class="price">
							<span>价格：</span>
							<span class="retailPrice">
								¥{{GoodsSkuList[selectedIndex].retailPrice}}
							</span>
							<span class="counterPrice" v-if="GoodsSkuList[selectedIndex].retailPrice != GoodsSkuList[selectedIndex].counterPrice">
								¥{{GoodsSkuList[selectedIndex].counterPrice}}
							</span>
						</p>
						<p class="choose" ref="choose">已选择: &nbsp;{{GoodsSkuList[selectedIndex].value}}</p>
						<p class="noSaleDesc" v-if="GoodsSkuList[selectedIndex].noSaleDesc">{{GoodsSkuList[selectedIndex].noSaleDesc}}</p>
					</div>
				</div>
				<div class="spec-con">
					<div class="color">
						<p>颜色</p>
						<div class="color-item">
							<span :class="{active : selectedIndex==index}"  v-for="(item,index) in GoodsSkuList" :key="index" @click="chooseAction(index)">
								{{item.value}}
							</span>
						</div>
					</div>
					<div class="count">
						<p>数量</p> 
						<van-stepper :max="99" v-model="value" @overlimit="ToastAction" @change="overMaxAction"/>
					</div>
				</div>
			</div>
		</scroller>
		<div class="tool-bar border-top">
			<div class="contact border-right">
				<span @click="goBackAction">返回</span>
			</div>
			<div class="buy" @click="buyAction">立即购买</div>
			<div class="add-cart" @click="addCartAction">加入购物车</div>
		</div>
    </div>
</template>
<script>
	import {mapState} from 'vuex'
	import { Stepper, Toast } from 'vant'
    export default {
		props:['id','func'],
		data() {
			return {
				selectedIndex: 0,
				value : 1
			}
		},
		components:{
			[Stepper.name] : Stepper
		},
		computed: {
			...mapState({
				GoodsSkuList : state=>state.goods.GoodsSkuList,
				goodsbanners : state=>state.goods.goodsbanners,
				goodsinfo : state=>state.goods.goodsinfo
			})
		},
		created() {
			this.$store.dispatch('goods/getGoodsSkuList',this.id);
		},
		methods: {
			buyAction() {
				//进入购买页面
				//判断用户是否登录
				//路由守卫
				this.$router.push('/itemdetail/'+this.id+'/buy');
			},
			addCartAction(){
				//将商品信息放在购物车上
				this.$store.commit('cart/addGoods', {
					id : this.id,
					name : this.goodsinfo.name,
					price : this.goodsinfo.retailPrice,
					mainPicUrl : this.goodsbanners[0],
					value : this.value
				})
				Toast('添加成功！')
			},
			goBackAction(){
				let text = this.$refs.choose.innerText;
				let val = text + '×' +  this.value
				this.func(val,this.value);
				this.$router.back();
			},
			chooseAction(index){
				this.selectedIndex = index;
			},
			ToastAction(){
				if(this.value == 1){
					Toast('本商品1件起售');
				}else if(this.value == 99){
					Toast('达到单次添加上限');
				}
			},
			overMaxAction(){
				if(this.value>99){	
					Toast('达到单次添加上限');
				}
			}
		},
		
    }
</script>
<style lang="scss" scoped="scoped"> 
	#goodscount{
		z-index: 5;
		.goods-count-content{
			width: 100%;
			position: absolute;
			top: 44px;
			left: 0;
			bottom: 45px;
			overflow: hidden;
		}
		.goodscountContent{
			padding: 0 15px;
			.info-con{
				display: flex;		
				margin-bottom: 15px;
				img{
					width: 90px;
					height: 90px;
					background: #f4f4f4;
					margin-right: 10px;
				}
				.msg{
					padding-top: 20px;
					.tag{
						border-radius: 4px;
						padding: 1px 4px;
						font-size: 12px;
						color: #fff;
						background: #f48f18;
					}
					.price{
						font-size: 14px;
						color: #b4282d;
						line-height: 28px;
						.counterPrice{
							text-decoration: line-through;
							color: #999;
							padding-left: 4px;
						}
					}
				}
				.choose{
					font-size: 15px;
					color: #333;
				}
				.noSaleDesc{
					font-size: 12px;
					line-height: 20px;
					color: #999;
				}
			}
			.spec-con{	
				.color{
					p{
						color: #333;
						line-height: 35px;
					}
					.color-item{
						span{
							font-size: 14px;
							padding: 12px;
							margin: 0 8px 8px 0;
							display: inline-block;
							border: 1px solid #999;
							border-radius: 5px;		
						}
						.active{
							border: 1px solid #b4282d;
						}
					}
				}
				.count{
					line-height: 35px;
					color: #333;
				}
			}
		}
		.tool-bar{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 45px;
			display: flex;
			div{
				line-height: 45px;
				text-align: center;
				font-size: 14px;
				background: #fff;
			}
			span{
				display: block;
				width: 80px;
			}
			.buy{
				flex: 1;
				color: #333;
			}
			.add-cart{
				flex: 1;
				background: #b4282d;
				border: 1px solid #b4282d;
				color: #fff;
			}
		}
		
		.sub-header{
			width: 100%;
			height: 44px;
			.title{
				width: 70%;
				height: 100%;
				color: #333;
				text-align: center;
				font-size: 16px;
				line-height: 44px;
				font-weight: bold;
				margin: 0 auto;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.van-icon{
				position: absolute;
				left: 0;
				top: 0;
				padding: 10px 15px;
				font-size: 24px;
				line-height: 24px;
			}
		}
	}	
</style>