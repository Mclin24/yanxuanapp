<template>
	<div id='app'>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<router-view name="detail"></router-view>
		<navBar></navBar>
		<!-- 登录界面 -->
		<LoginPage v-if="showLogin" :successPath="loginSuccessPath"></LoginPage>
   </div>
</template>
<script>
	import LoginPage from '@pages/common/login'
	export default {
		components:{
			LoginPage
		},
		data() {
			return {
				showLogin: false,
				loginSuccessPath : ''
			}
		},
		created(){
			this.$center.$on('toggle-login',(path)=>{
				//关闭登录注册页面
				this.showLogin = !this.showLogin;
				this.loginSuccessPath = path;
			})
		}
	};
</script>
<style>
</style>
