<template>
    <div class='home-menu-wrap'>
		<ly-tab v-if="menuList.length>1"
			v-model="selectIndex"
			:items="menuList"
			:options="{activeColor: '#b4282d'}">
		</ly-tab>
		<div class="control">
			<span class="box"></span>
			<van-icon name='arrow-down' :class='{active:isShow}' @click='showAction'></van-icon>
		</div>
		<!-- 显示弹出层 -->
		<van-popup v-model="isShow"></van-popup>
		<!-- 弹出层内容 -->
		<div v-show="isShow" class="wrap border-top">
			<div class="title">全部频道</div>
			<ul class="menu-list">
				<li class="menu-item" v-for="(item,index) in menuList" :key='item.id'
				:class="{active:selectIndex==index}" @click="selectAction(index)">
					{{item.label}}
				</li>
			</ul>
		</div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import LyTab from 'ly-tab';
//弹出层
import { Popup } from 'vant';
export default {
	data() {
		return {
			isShow : false,
			selectIndex: 0,
		};
	},
	computed: {
		...mapState({
			menuList: state => state.home.menuList
		})
	},
	watch: {
		selectIndex(newValue) {
			if(newValue == 0){
				this.$router.push('/home/main');
			}else{
				let {id,label} = this.menuList[newValue];
				this.$router.push(`/home/menu/${id}/${label}`);
			}
		},
		menuList(){
			//监听选中的路径中的名字,解决刷新页面,小红条对不齐问题
			// console.log(this.$route.params.name);
			if(!this.$route.params.name){//如果是推荐就返回
				return;
			}
			let name = this.$route.params.name;
			this.selectIndex = this.menuList.findIndex(item=>{
				return item.label == name;
			})
		},
		'$route.path' : function(newValue){
			if(newValue == '/home' || newValue == '/home/main'){
				this.selectIndex = 0;
			}
		}
	},
	created() {
		//获取数据
		this.$store.dispatch('home/getMenuData');		
	},
	components: {
		LyTab: LyTab.LyTab,
		[Popup.name] : Popup
	},
	methods: {
		//控制遮罩层菜单栏的显示
		showAction() {
			this.isShow = !this.isShow;
		},
		selectAction(index){
			this.selectIndex = index;
			this.isShow = !this.isShow;
		}
	},
};
</script>
<style lang="scss" scoped>
	.home-menu-wrap {
		position: absolute;
		left: 0;
		top: 44px;
		width: 100%;
		height: 30px;
		li {
			float: left;
		}
		.control{
			position: absolute;
			height: 100%;
			top: 0;
			right: 0;
			width: 40px;
			background: #fff;
			.van-icon{
				width: 40px;
				line-height: 26px;
				text-align: center;
				color: #999;
				transition-duration: 200ms;
			}
			.van-icon.active{
				transform: rotate(180deg);
				z-index: 3001;
			}
			.box{
				width: 20px;
				position: absolute;
				height: 100%;
				left: -20px;
				top: 0;
				background: linear-gradient(to right,rgba(255,255,255,0.5) 0,rgba(255,255,255,1) 100%);
			}
		}
		.wrap{
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3000;
			background: #fff;
			.title{
				font-size: 12px;
				height: 26px;
				line-height: 26px;
				color: #333;
				padding-left: 19px;
				margin-bottom: 10px;
			}
			.menu-item{
				width: 25%;
				font-size: 12px;
				text-align: center;
				height: 26px;
				line-height: 26px;
				background: #FAFAFA;
				border: 1px solid #ccc;
				border-radius: 3px;
				margin-left: 20px;
				margin-bottom: 10px;
				&.active{
					color: #b4282d;
					border: 1px solid #b4282d;
				}
			}
		}
	}
</style>
<style>
.home-menu-wrap	.ly-tab-list{
		padding: 9px 60px 9px 10px;
	}
	.van-overlay{
		top: 44px;
	}
</style>
