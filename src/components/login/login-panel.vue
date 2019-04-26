<template>
    <div class="page subpage" id="login">
		<div class="close" @click="backAction">
			<van-icon name="cross"></van-icon>
		</div>
		<img src="../../asset/yanxuan.png" alt="" class="logo">
		<div class="handle">
			<input type="text" placeholder="用户名" ref="user">
			<input type="password" placeholder="密码" ref="psw" />
			<div class="comfir" @click="handleLoginAction">登录</div>
			<p class="reg-btn" @click="showRegAction">
				<span>立即注册</span>
				<van-icon name="arrow"></van-icon>
			</p>
		</div>
		<p class="info">以严谨的态度，为中国的消费者甄选天下优品</p>
    </div>
	
</template>
<script>
	import {Toast} from 'vant'
	import {mapActions} from 'vuex'
    export default {
		props: ['path'],
		methods: {
			...mapActions({
				loginAction : 'user/loginAction'
			}),
			handleLoginAction() {
				//获得用户输入的内容
				let msg = {
					userName : this.$refs.user.value,
					passWord : this.$refs.psw.value
				}
				if (msg.userName&&msg.passWord) {
					console.log(msg);
					this.loginAction(msg).then(result=>{
						if (result==0) {
							//登录成功
							//显示之前没有进入的页面
							// console.log('显示对应没有进入的页面');
							this.$router.push(this.path);
							this.backAction();
						} else{
							//登录失败
						}
					})
				} else{
					Toast('输入不能为空！')
				}
				
			},
			backAction(){
				//通过触发根组件下的toggle-login事件，关闭登录注册页面
				this.$center.$emit('toggle-login');
			},
			showRegAction(){
				this.$emit('change');
			}
		},
    }
</script>
<style>
</style>