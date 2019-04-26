<template>
    <div class="dc-content-style1">
		<div class="name">
			<img :src="style1.avatar" alt="">
			<span>{{style1.nickname}}</span>
		</div>
		<div class="title">
			{{style1.title}}
		</div>
		<div class="img">
			<img :src="style1.picUrl" alt="">
		</div>
		<div class="readcount">
			<van-icon name="eye-o"></van-icon><span>{{style1.readCount}}人看过</span>
		</div>
    </div>
</template>
<script>
export default {
	props: ['style1']
};
</script>
<style lang="scss" scoped="scoped">
	.dc-content-style1{
		border-top: 10px solid lavender;
		padding: 18px 15px;
		.name{
			width: 100%;
			height: 28px;
			display: flex;
			img{			
				width: 27px;
				border-radius: 100%;
			}
			span{
				margin-left: 7px;
				color: #333;
				height: 27px;
				line-height: 27px;
			}
		}
		.title{
			margin-top: 5px;
			font-size: 18px;
			line-height: 25px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.img{
			img{
				width: 100%;
				border-radius: 5px;
				margin-top: 8px;
			}
		}
		.readcount{
			color: #999;
			margin-top: 5px;
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
