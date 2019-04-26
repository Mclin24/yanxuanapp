<template>
    <div id='cart' class="page">
		<header class="cart-header border-bottom">购物车</header>
		<scroller class="cart-content">
			<van-swipe-cell :right-width="65" v-for="item in cartList" :key="item.id">
				<van-cell-group  class="cart-item">
					<img :src="item.mainPicUrl">
					<div class="item-content">
						<h3>{{item.name}}</h3>
						<p>¥{{item.price}}</p>
					</div>
					<div class="item-handler">
						<van-stepper disable-input :value="item.count" @input="handleInput($event, item)"/>
					</div>
				</van-cell-group>
				<span slot="right" @click="handleRemove(item)">删除</span>
			</van-swipe-cell>
		</scroller>
		<van-submit-bar
			:price="count"
			button-text="提交订单"
			@submit="onSubmit"
		/>
    </div>
</template>
<script>
	import {mapState} from 'vuex'
	import { SwipeCell,CellGroup,Cell,Stepper,SubmitBar,Toast} from 'vant';
	export default {
		computed: {
			...mapState({
				cartList : state=>state.cart.cartList
			}),
			count(){
				let tmp = 0;
				this.cartList.forEach(item=>{
					tmp += item.price * item.count;
				})
				return tmp*100;
			}
		},
		components : {
			[SwipeCell.name] : SwipeCell,
			[CellGroup.name] : CellGroup,
			[Cell.name] : Cell,
			[Stepper.name] : Stepper,
			[SubmitBar.name] : SubmitBar
		},
		methods: {
			handleInput(count,item) {
				if(count == 0){
					return;
				}
				// console.log(item,count);
				this.$store.commit('cart/setCount',{
					item,
					count
				})
			},
			handleRemove(item){
				this.$store.commit('cart/removeItem',item.id)
			},
			onSubmit(){
				if(this.count != 0){
					Toast('下单成功！');
				}
			}
		},
	};
</script>
<style lang="scss">
	#cart .cart-header{
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
	#cart .cart-content{
		position: absolute;
		width: 100%;
		overflow: hidden;
		top: 44px;
		left: 0;
		bottom: 49px;
		.cart-item{
			display: flex;
			padding: 10px;
			img{
				width: 80px;
				height: 80px;
				background: #f4f4f4;
			}
			.item-content{
				width: 200px;
				padding-left: 10px;
				h3{
					font-size: 14px;
					line-height: 25px;
					color: #333;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				p{
					line-height: 30px;
					font-size: 14px;
					color: #b4282d;
				}
			}
			.item-handler{
				flex: 1;
			}
		}
	}
	#cart .van-stepper{
		display: flex;
		position: absolute;
		top: 50px;
		right: 30px;
	}
	#cart .van-swipe-cell__right{
		text-align: center;
		line-height: 100px;
		span{
			font-size: 14px;
			color: #fff;
			background: #b4282d;
			padding: 4px;
			border: 1px solid #b4282d;
		}
	}
	#cart .van-submit-bar{
    position: absolute;
	}
	#cart .van-submit-bar .van-button {
		background: #b4282d;
	}
	.van-button--danger{
		border: none;
	}
	#cart .van-submit-bar__price{
		color: #b4282d;
	}
</style>
