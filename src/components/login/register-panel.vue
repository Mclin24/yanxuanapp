<template>
    <div class="page subpage" id="register">
		<div class="close" @click="backAction">
			<van-icon name="cross"></van-icon>
		</div>
		<img src="../../asset/yanxuan.png" alt="" class="logo">
		<div class="handle">
			<input type="text" placeholder="用户名" ref="user">
			<input type="password" placeholder="密码" ref="psw" />
			<input type="password" placeholder="确认密码" ref='repsw'>
			<div class="comfir" @click="handleRegAction">注册</div>
			<p class="reg-btn" @click="showLoginAction">
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
		methods: {
			...mapActions({
				registerAction : 'user/registerAction'
			}),
			backAction(){
				this.$center.$emit('toggle-login');
			},
			handleRegAction() {
				let user = this.$refs.user.value;
				let psw = this.$refs.psw.value;
				let repsw = this.$refs.repsw.value;
				if (user&&psw&&repsw) {
					if (psw === repsw) {
						this.registerAction({username:user,password:psw})
						.then((result)=>{
							if(result==0){
								Toast('注册成功');
								this.$emit('change');
							}
						})
					} else{
						Toast('两次密码不一致')
					}
				} else{
					Toast('输入不能为空')
				}
			},
			showLoginAction(){
				this.$emit('change')
			}
		},
    }
</script>
<style>
</style>