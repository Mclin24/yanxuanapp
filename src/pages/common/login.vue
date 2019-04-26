<template>
	<transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
		<div class="login-wrap page subpage">
			<transition enter-active-class="flipInY">
				<login-panel v-if="flag=='login'" @change="show('login')" :path="successPath"></login-panel>
				<register-panel v-if="flag=='register'" @change="show('register')"></register-panel>
			</transition>
		</div>
	</transition>
</template>
<script>
	import LoginPanel from '@components/login/login-panel.vue'
	import RegisterPanel from '@components/login/register-panel.vue'
    export default {
		props : ['successPath'],
		data() {
			return {
				flag: 'login'
			}
		},
		components : {
			'login-panel' : LoginPanel,
			'register-panel' : RegisterPanel
		},
		methods: {
			show(flag) {
				if(flag=='login'){
					this.flag = 'register'
				}else if(flag=='register'){
					this.flag = 'login'
				}
			}
		},
    }
</script>
<style lang="scss">
	.login-wrap{
		.flipInY, .flipOutY{
			animation-duration: 1s;
		}
		.close{
			position: absolute;
			top: 20px;
			right: 20px;
			.van-icon{
				font-size: 25px;
				padding: 8px;
				border-radius: 50%;
				color: #fff;
				background: rgba(0,0,0,0.3);
			}
		}
		.logo{
			display: block;
			width: 40%;
			margin: 35% auto;
		}
		.handle{
			position: absolute;
			width: 75%;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			input{
				display: block;
				border: none;
				border-radius: 0;
				outline: none;
				border: 1px solid #666;
				width: 100%;
				height: 30px;
				box-sizing: border-box;
				line-height: 30px;
				font-size: 14px;
				margin: 10px auto;
			}
			.comfir{
				width: 100%;
				height: 40px;
				background: #B4282D;
				color: #fff;
				text-align: center;
				line-height: 40px;
				font-size: 16px;
			}
			.reg-btn{
				padding: 15px 0;
				text-align: center;
				font-size: 14px;
				color: #333;
				.van-icon{
					top: 2px;
				}
			}
		}
		.info{
			width: 100%;
			position: absolute;
			text-align: center;
			left: 0;
			bottom: 50px;
			font-size: 12px;
			color: #999;
		}
	}
</style>