import api from '@API'
import {fetchGet} from '@fetch'
const state = {
	goodsbanners : [],
	goodsinfo : {},
	goodsdetail : '',
	id : '',
	GoodsSkuList : []
}
const mutations = {
	setGoodsBanners(state,params){
		state.goodsbanners = params;
	},
	setGoodInfo(state,params){
		state.goodsinfo = params;
	},
	setGoodDetail(state,params){
		state.goodsdetail = params;
	},
	setId(state,params){
		state.id = params;
	},
	setGoodsSkuList(state,params){
		state.GoodsSkuList = params;
	}
}
const actions = {
	async getGoodsDetail({commit},id){
		let data = await fetchGet(api.ITEM_DETAIL_URL,{id});
		let bannerUrls = [
			data.primaryPicUrl,
			data.itemDetail.picUrl1,
			data.itemDetail.picUrl2,
			data.itemDetail.picUrl3,
			data.itemDetail.picUrl4,
		];
		bannerUrls = bannerUrls.filter(item=>item);
		commit('setGoodsBanners',bannerUrls);
		//商品的主要信息
		let info = {
			characteristicList : data.characteristicList,
			retailPrice: data.retailPrice,
            counterPrice: data.counterPrice,
            itemTagList: data.itemTagList.map(({name})=>({name})),
            name: data.name,
            simpleDesc: data.simpleDesc,
            commentCount: data.commentCount>999?'999+':data.commentCount
		}
		commit('setGoodInfo',info);
		// 详情
        commit('setGoodDetail', data.itemDetail.detailHtml);
	},
	removeGoodsData({commit}){
		commit('setGoodsBanners', []);
        commit('setGoodInfo', {});
        commit('setGoodDetail','');
	},
	async getGoodsSkuList({commit},id){
		let {skuList} = await fetchGet(api.ITEM_DETAIL_URL,{id});
		let newData = skuList.map(item=>{
			return {
				counterPrice : item.counterPrice,
				retailPrice : item.retailPrice,
				noSaleDesc : item.noSaleDesc,
				picUrl : item.itemSkuSpecValueList[0].skuSpecValue.picUrl,
				value : item.itemSkuSpecValueList[0].skuSpecValue.value,
				promotionDesc : item.promotionDesc
			}
		})
		commit('setGoodsSkuList',newData);
	}
}
export default {
	namespaced : true,
	state,
	mutations,
	actions
}