<template>
    <div>
		<div class="page subpage" id="detail">
			<app-header :title="goodsinfo.name"></app-header>
			<scroller class="goods-content" v-cloak>
				<div v-if="goodsbanners.length>0" class="banner">
					<!-- 商品轮播图 -->
					<van-swipe :autoplay="3000" :show-indicators="false"
                    @change="pageChange">
						<van-swipe-item v-for="(img,index) in goodsbanners" :key="index">
							<img :src="img" alt=""> 
						</van-swipe-item>
					</van-swipe>
					<!-- 轮播图页码 -->
					<span class="indicator">{{swipeIndex}}/{{goodsbanners.length}}</span>
				</div>
				<ul class="characteristic">
					<li class="characteristic-item" v-for="(item, i) in goodsinfo.characteristicList"
					:key="i">
						<img src="item.picUrl" alt="">
						<p>
							<span v-for="(value,j) in item.simpleDescList" :key="j">
								{{value}}
							</span>
						</p>
					</li>
				</ul>
				<!-- 商品基础信息 -->
				<p class="price">
					<span>¥{{goodsinfo.retailPrice}}</span>
					<span>¥{{goodsinfo.counterPrice}}.00</span>
				</p>
				<div class="tip">
					<span v-for="(item, index) in goodsinfo.itemTagList" :key="index">
						{{item.name}}<van-icon name="arrow"></van-icon>
						
					</span>
				</div>
				<div class="main">
					<div class="title">
						<h3>{{goodsinfo.name}}</h3>
						<h6>{{goodsinfo.simpleDesc}}</h6>
					</div>
					<div class="comment-icon">
						<p>{{goodsinfo.commentCount}}</p>
						<p>用户评价</p>
						<van-icon name="arrow"/>
					</div>
				</div>
				<!-- 用户操作列表 -->
				<div class="handle">
					<van-cell ref="goodscount" :title="goodscount" is-link  @click="goGoodsCountAction"/>
					<van-cell title="限制：特价商品不可与优惠券叠加使用" />
					<van-cell title="配送：请选择配送地址" is-link @click="chooseAdressAction"/>
					<van-cell :title="'积分：购买最高得'+Math.floor(goodsinfo.retailPrice/10)+'积分'" is-link />
				</div>
				<!-- 商品详情 -->
				<div class="detail" v-if="goodsdetail" v-html="goodsdetail"></div>
			</scroller>
			<div class="tool-bar border-top">
				<div class="contact border-right">
					<van-icon name='service'></van-icon>
				</div>
				<div class="buy" @click="buyAction">立即购买</div>
				<div class="add-cart" @click="addCartAction">加入购物车</div>
			</div>
		</div>
		<router-view></router-view>
		<router-view name="goodscount" :id="id" :func="setGoodsCountAction"></router-view>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	import { Swipe, SwipeItem, Toast, Cell} from 'vant';
	export default {
		props:['id'],
		data() {
			return {
				swipeIndex: 1,
				goodscount : '请选择规格数量',
				value : 1
			}
		},
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Cell.name] : Cell
		},
		computed: {
			...mapState({
				goodsbanners : state=>state.goods.goodsbanners,
				goodsinfo : state=>state.goods.goodsinfo,
				goodsdetail : state=>state.goods.goodsdetail
			})
		},
		created(){
			//请求商品详情数据
			this.$store.dispatch('goods/getGoodsDetail',this.id);
			this.$store.commit('goods/setId',this.id);
		},
		beforeDestroy(){
			//清除数据，解决商品详情缓存问题
			this.$store.dispatch('goods/removeGoodsData')
		},
		methods: {
			pageChange(index){
				//显示页码
				this.swipeIndex = index+1;
			},
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
			goGoodsCountAction(){
				//商品规格
				this.$router.push('/itemdetail/'+this.id+'/goodscount');
			},
			setGoodsCountAction(val,value){
				this.goodscount = val;
				this.value = value;
			},
			chooseAdressAction(){
				
			}
		},
	};
</script>
<style lang="scss" scoped="scoped">
	.goods-content{
		width: 100%;
		position: absolute;
		top: 44px;
		left: 0;
		bottom: 45px;
		overflow: hidden;
		.van-swipe img{
			width: 100%;
		}
		.banner{
        position: relative;
        .indicator{
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 4px;
            background: #fff;
            border-radius: 3px;
            color: #333;
            transform: scale(0.6);
        }
    }
    .characteristic{
        background: #F9F9F9;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        .characteristic-item{
            flex: 1;
            img{
                height: 30px;
                float: left;
                border-radius: 50%;
            }
            p{
                padding-left: 35px;
                font-size: 12px;
                span{
                    display: block;
                    color: #333;
                    line-height: 15px;
                }
            }

        }
    }
    .price{
        padding: 10px;
        :nth-of-type(1){
            font-size: 20px;
            font-weight: bold;
            color: #b4282d;
        }
        :nth-of-type(2){
            padding-left: 5px;
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
        }
    }
    .tip {
        overflow: hidden;
        padding: 0 10px;
        span{
            float: left;
            font-size: 12px;
            padding: 2px 4px;
            border: 1px solid #b4282d;
            color: #b4282d;
            border-radius: 4px;
        }
    }
    .main{
        padding: 15px 10px;
        display: flex;
        border-bottom: 8px solid #efefef;
        .title{
            flex: 1;
            h3{
                font-size: 14px;
                font-weight: bold;
                color: #333;
            }
            h6{
                padding-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
        .comment-icon{
            border-left: 1px dashed #999;
            width: 80px;
            position: relative;
            p{
                text-align: center;
            }
            p:nth-of-type(1){
                font-size: 14px;
                font-weight: bold;
                color: #b4282d;
            }
            p:nth-of-type(2){
                padding-top: 5px;
                font-size: 12px;
                color: #999;
            }
            .van-icon{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #666;
            }
        }
    }
    .handle{
        border-bottom: 8px solid #efefef;
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
		.van-icon{
			line-height: 45px;
			text-align: center;
			font-size: 30px;
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
</style>
<style>
	#detail .goods-content .detail img{
		display: block;
		width: 100%;
	}
</style>