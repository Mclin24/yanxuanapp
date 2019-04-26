<template>
    <header class="sub-header">
    	<van-icon name='wap-home' @click='goBackAction'></van-icon>
    	<h1 class='title'>{{title}}</h1>
    </header>
</template>
<script>
    export default {
		name : 'app-header',
		props :	{
			title : String
		},
		methods: {
			goBackAction() {
				this.$router.back();
			}
		}
    }
</script>
<style lang="scss" scoped="scoped">
	.sub-header{
		width: 100%;
		height: 44px;
		.title{
			width: 70%;
			height: 100%;
			color: #333;
			text-align: center;
			font-size: 16px;
			line-height: 44px;
			font-weight: bold;
			margin: 0 auto;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.van-icon{
			position: absolute;
			left: 0;
			top: 0;
			padding: 10px 15px;
			font-size: 24px;
			line-height: 24px;
		}
	}
</style>