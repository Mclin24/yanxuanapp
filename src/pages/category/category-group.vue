<template>
    <div id="group" class="page">
		<app-header :title="name"></app-header>
		<ly-tab
			v-model="selectIndex"
			:items="menu"
			:options="{activeColor: '#b4282d'}">
		</ly-tab>
		<scroller class="group-content" ref="scroll">
			<item-list :itemList="groupdata"></item-list>
		</scroller>
    </div>
</template>
<script>
	import LyTab from 'ly-tab';
	import {mapGetters,mapState} from 'vuex'
    export default {
		props : ['id'],
		components : {
			LyTab: LyTab.LyTab,
		},
		data() {
			return {
				selectIndex: 0,
			}
		},
		computed: {
			...mapGetters({
				name : 'category/selectMenuTitle',
				menuId : 'category/selectMenuId'
			}),
			...mapState({
				catemenudata : state=>state.category.catemenudata,
				groupdata : state=>state.category.groupData
			}),
			menu(){
				let {categoryGroupList} = this.catemenudata;
				if(!categoryGroupList){
					return []
				}
				let newData = [];
				categoryGroupList.forEach(({categoryList})=>{
					let arr = categoryList.map(({name,id})=>({label : name,id}));
					newData = [...newData, ...arr]
				})
				return newData;
			}
		},
		created(){
			//请求数据
			this.$store.dispatch('category/getCateGroupItems',{
				categoryId : this.menuId,
				subCategoryId : this.id
			});
			//计算哪一个tabs选中
			let index = this.menu.findIndex(({id})=>{
				return id == this.id;
			})
			this.selectIndex = index;
		},
		watch: {
			selectIndex(newValue) {
				let newId = this.menu[newValue].id;
				//重新请求数据
				this.$store.dispatch('category/getCateGroupItems',{
					categoryId : this.menuId,
					subCategoryId : newId
				});
				//视图滚动到最顶部
				this.$refs.scroll.scrollTo(0,0);
			}
		},
	}
</script>
<style lang="scss" scoped="scoped">
	.group-content{
		top: 70px;
		left: 0;
		bottom: 0;
		position: absolute;
		overflow: hidden;
		width: 100%;
	}
</style>
<style>
	#group .ly-tab-list{
		padding: 7px 10px 7px 10px;
	}
</style>