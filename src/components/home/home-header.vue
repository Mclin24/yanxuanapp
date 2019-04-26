<template>
    <header class='home-header'>
		<div class="logo">
			<img src="../../asset/logo.png"/>
		</div>
		<div class="search-bar">
			<van-icon name="search" />
			搜索商品, 共{{$store.state.home.total}}款好物
		</div>
		<div class="login-btn">登录</div>
    </header>
</template>
<script>
	export default {
		created(){
			this.$store.dispatch('home/getTotal')
		}
	};
</script>
<style lang="scss" scoped>
	.home-header{
		width: 100%;
		height: 44px;
		position: absolute;
		top: 0;
		left: 0;
		padding:  10px 8px;
		box-sizing: border-box;
		display: flex;
		.logo{
			height: 100%;
			padding: 2px 0;
			box-sizing: border-box;
			img{
				height: 100%;
			}
		}
		.search-bar{
			background: #efefef;
			flex: 1;
			margin: 0 5px;
			border-radius: 4px;
			font-size: 12px;
			color: #999;
			text-align: center;
			line-height: 24px;
			.van-icon{
				font-size: 16px;
				transform: translateY(4px);
			}	
		}
		.login-btn{
			height: 18px;
			line-height: 18px;
			border-radius: 4px;
			margin-top: 2px;
			font-size: 12px;
			border: 1px solid #b4282d;
			color: #b4282d;
			padding: 0 5px;
		}
}
</style>
