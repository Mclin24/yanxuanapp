<template>
    <div class="dc-content-style3">
		<div class="title">
			{{style3.title}}
		</div>
		<div class="subtitle">
			{{style3.subTitle}}
		</div>
		<div class="img">
			<img v-for="item in style3.itemList" :src="item.itemUrl" :key="item.itemUrl"alt="">
		</div>
		<div class="readcount">
			<van-icon name="eye-o"></van-icon><span>{{style3.readCount}}人看过</span>
		</div>
    </div>
</template>
<script>
export default {
	props: ['style3']
};
</script>
<style lang="scss" scoped="scoped">
	.dc-content-style3{
		border-top: 10px solid lavender;
		padding: 18px 15px;
		overflow: hidden;
		.title{
			margin-top: 5px;
			font-size: 18px;
			line-height: 22px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.subtitle{
			margin-top: 5px;
			font-size: 14px;
			color: #999;
			line-height: 20px;
		}
		.img{
			justify-content: space-between;
			margin-top: 10px;
			img{
				width: 83px;
				height: 83px;
				background: #f4f4f4;
				margin: 1px;
				border-radius: 5px;
			}
		}
		.readcount{
			overflow: hidden;
			color: #999;
			margin-top: 10px;
			display: flex;
			font-size: 12px;
			span{
				line-height: 14px;
			}
			.van-icon{
				line-height: 14px;
				margin-right: 3px;
			}
		}
	}
	
</style>
