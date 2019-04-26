import api from '@API'
import {fetchGet} from '@fetch'
const state = {
	tabData : [],
	discoverdata : []
}
const mutations = {
	setTab(state,params){
		state.tabData = params;
	},
	setDiscoverData(state,params){
		state.discoverdata = params;
	}
}
const actions = {
	async getTabsData({commit}){
		let data = await fetchGet(api.TOPIC_FIND_TABS_URL);
		let newData = data.map(({tabId,tabName})=>({tabId,tabName}))
		commit('setTab',newData)
	},
	async getDiscoverData({commit},tabId){
		let data = await fetchGet(api.TOPIC_FIND_TAB_DATA_URL,{tabId});
		let newData = data.result.map(item=>{
			return {
				avatar : item.avatar,
				nickname : item.nickname,
				title : item.title,
				picUrl : item.picUrl,
				readCount : item.readCount,
				style : item.style,
				type : item.type,
				subTitle : item.subTitle,
				itemList : item.itemList
			}
		});
		commit('setDiscoverData',newData);
	},
	async getShaiDanBanner({commit}){
		//晒单数据
		let data = await fetchGet(api.TOPIC_FIND_SHOW_BANNER_URL);
		console.log(data);
	}
}
export default {
	namespaced : true,
	state,
	mutations,
	actions
}