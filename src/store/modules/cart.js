import api from '@API'
import {
	fetchGet
} from '@fetch'

const state = {
	cartList : []
}
const mutations = {
	//添加商品到购物车
	addGoods(state,params){
		let index = state.cartList.findIndex(item=>{
			return item.id == params.id
		})
		if (index>=0) {
			//添加同一件商品数量加一
			state.cartList[index].count += params.value ? params.value : 1;
		}else{
			params.count = params.value ? params.value : 1;
			state.cartList.push(params);
		}
	},
	//减少商品数量
	reduceGoods(state,params){
		
	},
	setCount(state,params){
		let index = state.cartList.findIndex(item=>{
			return item.id == params.item.id
		})
		if (index>=0) {
			state.cartList[index].count = params.count;
		}
	},
	//移除商品
	removeItem(state,params){
		state.cartList = state.cartList.filter(item=>{
			return item.id != params;
		})
	}
}
const actions = {

}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
