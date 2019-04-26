import api from '@API'
import {fetchPost} from '@fetch'

const state = {
  username: '',
  headerImg: ''
}
const mutations = {
	setUserMsg(state,params){
		state.username = params.username;
		state.headerImg = params.headerImg;
	}
}
const actions = {
	async loginAction({commit},params){
		let data = await fetchPost(api.LOGIN_URL,params);
		console.log(data);
		//保存用户的登录状态
		localStorage.setItem('userToken',data.token);
		//将用户数据保存在全局的仓库中
		commit('setUserMsg',data);
		return 0;
	},
	async registerAction({commit},params){
		let data = await fetchPost(api.REGIESTER_URL,params);
		return 0;
	}
}
export default {
	namespaced : true,
	state,
	mutations,
	actions
}