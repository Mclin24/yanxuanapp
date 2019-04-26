<template>
    <div class="dc-content-style2">
		<div class="info">
			<div class="name">
				<img :src="style2.avatar" alt="">
				<span>{{style2.nickname}}</span>
			</div>
			<div class="title">
				{{style2.title}}
			</div>
			<div class="desc">
				{{style2.subTitle}}
			</div>
			<div class="readcount">
				<van-icon name="eye-o"></van-icon><span>{{style2.readCount}}人看过</span>
			</div>
		</div>
		<div class="img">
			<img :src="style2.picUrl" alt="">
		</div>
    </div>
</template>
<script>
export default {
	props: ['style2']
};
</script>
<style lang="scss" scoped="scoped"> 
	.dc-content-style2{
		border-top: 10px solid lavender;
		padding: 18px 15px;
		display: flex;
		.info{
			width: 65%;
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
			.desc{
				font-size: 14px;
				line-height: 18px;
				margin-top: 5px;
				color: #999;
			}
			.readcount{
				color: #999;
				margin-top: 15px;
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
		.img{
			img{
				border-radius: 5px;
				width: 136px;
				height: 136px;
			}
		}
	}
	
</style>
