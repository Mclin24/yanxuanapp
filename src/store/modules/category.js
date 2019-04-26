import api from '@API'
import {fetchGet} from '@fetch'
const state = {
	catemenuList : [],
	selectMenuIndex : 0,
	catemenudata : {},
	groupData : []
}
const getters = {
	selectMenuId(state,getters){
		if(state.catemenuList.length<=0){
			return null;
		}
		let index = state.selectMenuIndex;
		let id = state.catemenuList[index].id;
		return id;
	},
	selectMenuTitle(state){
		if(state.catemenuList.length<=0){
			return null;
		}
		let index = state.selectMenuIndex;
		let name = state.catemenuList[index].name;
		return name;
	}
	
}
const mutations = {
	setCateMenuListData(state,params){
		state.catemenuList = params;
	},
	//处理侧边栏点击切换id
	setMenuIndex(state,params){
		state.selectMenuIndex = params;
	},
	setCateMenuData(state,params){
		state.catemenudata = params;
	},
	setGroupItemsData(state,params){
		state.groupData = params;
	}
}
const actions = {
	async getCateMenuListData({commit}){
		//请求侧边栏数据
		let data = await fetchGet(api.CATEGOEY_LIST_URL);
		let newData = data.map(({id,name})=>({id,name}));
		commit("setCateMenuListData",newData)
	},
	async getCateMenuData({commit},id){
		let data = await fetchGet(api.CATEGOEY_LIST_GROUP_URL,{
			categoryId : id
		});
		let bannerUrl = data.currentCategory.wapBannerUrl;
		let categoryGroupList = data.categoryGroupList.map(group=>{
			return {
				id : group.id,
				name : group.name,
				categoryList : group.categoryList.map(({id,name,wapBannerUrl})=>({id,name,bannerUrl:wapBannerUrl}))
			}
		})
		//提交数据
		commit("setCateMenuData",{
			bannerUrl,
			categoryGroupList
		})
	},
	async getCateGroupItems({commit},params){
		let data = await fetchGet(api.CATEGOEY_LIST_GROUP_ITEM_URL,params);
		let newData = data.itemList.map(item=>{
			return {
				primaryPicUrl : item.primaryPicUrl,
				retailPrice : item.retailPrice,
				counterPrice : item.counterPrice,
				name : item.name,
				itemTagList : item.itemTagList.map(({name})=>name),
				simpleDesc : item.simpleDesc,
				id : item.id
			}
		});
		commit('setGroupItemsData',newData);
	}
}

export default {
	namespaced : true,
	state,
	getters,
	mutations,
	actions
}