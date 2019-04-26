import api from '@API'
import {fetchGet} from '@fetch'
const state = {
	total : undefined,
	menuList : [],
	bannerList : [],
	policy : [],
	categoryBanner : '',
	categoryList : [],
	mainviewList : [],
	topcateList : [],
	ManufacturerList : [],
	CatehotsellData : [],
	popularLsit : [],
	newGoodsData : [],
	shoppingdata : []
}
const mutations = {
	setTotal(state,params){
		state.total = params;
	},
	setMenuList(state,params){
		state.menuList = params;
	},
	setBannerData(state,params){
		state.bannerList = params;
	},
	setPolicy(state,params){
		state.policy = params;
	},
	setCategoryList(state,params){
		state.categoryBanner = params.bannerUrl;
		state.categoryList = params.categoryList;
	},
	setMainViewData(state,params){
		state.mainviewList = params;
	},
	setTopCateData(state,params){
		state.topcateList = params;
	},
	setManufacturerData(state,params){
		state.ManufacturerList = params;
	},
	setCatehotsellData(state,params){
		state.CatehotsellData = params;
	},
	setPopularLsit(state,params){
		state.popularLsit = params;
	},
	setNewGoods(state,params){
		state.newGoodsData = params;
	},
	setShoppingdata(state,params){
		state.shoppingdata = params;
	}
}
const actions = {
	async getTotal({commit}){
		//请求商品的总数
		let {total} = await fetchGet(api.GOODS_TOTAL_URL);
		commit('setTotal',total)
	},
	async getMenuData({commit}){
		//请求首页菜单栏的数据
		let data = await fetchGet(api.CATE_LIST_URL);
		let newData = data.map(({id,name})=>({id,label : name}));
		//调用mutations的setMenuList方法进行赋值
		commit('setMenuList',[{id:-1,label:'推荐'}, ...newData]);
	},
	async getBannerData({commit}){
		//轮播图的数据
		let data = await fetchGet(api.HOME_BANNER_LIST_URL);
		let newData = data.map(({id,picUrl})=>({id,picUrl}));
		commit('setBannerData',newData)
	},
	async getPolicyData({commit}){
		//请求协议的数据
		let data = await fetchGet(api.POLICY_LIST_URL);
		let newData = data.map(({desc,icon})=>({desc,icon}));
		commit('setPolicy',newData);
	},
	async getCategoryData({commit},{id}){
		let data = await fetchGet(api.HOME_CATE_ITEM_LIST_URL,{id});
		let bannerUrl = data.currentCategory.bannerUrl;
		let categoryList = data.categoryItemList.map(({category,itemList})=>{
			let info = {
				title : category.name,
				subTitle : category.frontName
			};
			let items = itemList.map(item=>{
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
			return {
				info,
				items
			}
		})
		//提交数据
		commit('setCategoryList',{bannerUrl,categoryList});
	},
	async getTopCateData({commit}){
		//获取首页分类列表
		let data = await fetchGet(api.HOME_CATE_LIST_URL);
		let newData = data.kingKongList.map(item=>{
			return {
				picUrl : item.picUrl,
				text : item.text
			}
		});
		commit('setTopCateData',newData);
	},
	async getManufacturerData({commit}){
		//品牌制造商直供
		let data = await fetchGet(api.HOME_TAG_LIST_URL);
		let newData = data.map(item=>{
			return {
				floorPrice : item.floorPrice,
				id : item.id,
				name : item.name,
				picUrl : item.picUrl
			}
		});
		commit('setManufacturerData',newData);
	},
	async getCatehotsellData({commit}){
		//类目热销榜数据
		let data = await fetchGet(api.HOME_CATE_HOT_SELL_URL);
		let title = data.title;
		let categoryList = data.categoryList.map(item=>{
			return {
				categoryName : item.categoryName,
				picUrl : item.picUrl,
				targetUrl : item.targetUrl
			}
		})
		commit('setCatehotsellData',{
			title,
			categoryList
		})
	},
	async getPopularlist({commit}){
		//人气推荐
		let data = await fetchGet(api.HOME_POPULAR_LIST_URL);
		let newData = data.map(item=>{
			return {
				id : item.id,
				name : item.name,
				itemTagList : item.itemTagList,
				simpleDesc : item.simpleDesc,
				retailPrice : item.retailPrice,
				listPicUrl : item.listPicUrl
			}
		})
		commit('setPopularLsit',newData);
	},
	async getNewGoods({commit}){
		//新品首发
		let data = await fetchGet(api.HOME_NEW_ITEM_URL);
		let newData = data.map(item=>{
			return {
				listPicUrl : item.listPicUrl,
				name : item.name,
				id : item.id,
				promTag : item.promTag,
				retailPrice : item.retailPrice
			}
		})
		commit('setNewGoods',newData);
	},
	async getShoppingdata({commit}){
		//购物指南
		let data = await fetchGet(api.HOME_SHOPPING_GUIDE_URL);
		let newData = data.map(item=>{
			return {
				desc : item.styleItem.desc,
				picUrlList : item.styleItem.picUrlList,
				title : item.styleItem.title
			}
		})
		commit('setShoppingdata',newData);
	},
	async getMainViewData({commit}){
		//推荐页面的视图列表
		let data = await fetchGet(api.HOME_TOP_CATELIST_URL);
		let newData = data.map(item=>{
			// console.log(item);s
			let itemList = item.itemList.map(itemData=>{
				return {
					id : itemData.id,
					listPicUrl : itemData.listPicUrl,
					name : itemData.name,
					retailPrice : itemData.retailPrice,
					counterPrice : itemData.counterPrice,
					promTag : itemData.promTag
				}
			});
			return {
				titlePicUrl : item.titlePicUrl,
				itemList
			}
		})
		//提交数据
		commit('setMainViewData',newData);
	}
}

export default {
	namespaced : true,
	state,
	mutations,
	actions
}