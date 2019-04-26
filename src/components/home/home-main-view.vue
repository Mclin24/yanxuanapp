<template>
    <div class="main-view">
		<img :src="data.titlePicUrl" alt="">
		<div class="list-wrap" ref='wrap'>
			<ul ref='scroll'>
				<li class="list-item" v-for="item in data.itemList" :key="item.id" @click="goDetail(item)">
					<img :src="item.listPicUrl">
					<h3 class="title">{{item.name}}</h3>
					<p class="price">
						<span>¥{{item.retailPrice}}</span>
						<span v-if="item.retailPrice !== item.counterPrice">¥{{item.counterPrice}}</span>
					</p>
					<p class="tip" v-if="item.promTag">
						<span>{{item.promTag}}</span>
					</p>
				</li>
				<li class="show-more">
					<span>查看更多</span>
					<van-icon name='arrow'></van-icon>
				</li>
			</ul>
		</div>
    </div>
</template>
<script>
	import BScroll from 'better-scroll'
    export default {
		props : ['data'],
		mounted(){
			let width = 90*(this.data.itemList.length+1);
			this.$refs.scroll.style.width = `${width}px`;
			let scroll = new BScroll(this.$refs.wrap,{
				scroolY : false,
				scrollX :true,
				click : true,
				tap : true
			});
		},
		methods: {
			goDetail(item) {
				this.$router.push(`/itemdetail/${item.id}`);
			}
		},
    }
</script>
<style lang="scss" scoped>
	.main-view{
		border-bottom: 10px solid lavender;
		img{
			width: 100%;
			display: block;
			background-color: #f5f5f5;
		}
		.list-wrap{
			width: 100%;
			overflow: hidden;
			padding: 8px;
			box-sizing: border-box;
			ul{
				overflow: hidden;
				width: 1000px;
			}
			.list-item{
				width: 80px;
				float: left;
				padding: 0 5px;
				.title{
					font-size: 12px;
					color: #333;
					line-height: 24px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.price{
					line-height: 26px;
					overflow: hidden;
					span:nth-of-type(1){
						font-size: 12px;
						color: #b4282d;
						float: left;
					}
					span:nth-of-type(2){
						font-size: 12px;
						color: #b4282d;
						text-decoration: line-through;
						color: #999;
						padding-left: 4px;
						float: left;
					}
				}
				.tip{
					height: 21px;
					span{
						font-size: 12px;
						padding: 2px 4px;
						border: 1px solid #b4282d;
						color: #b4282d;
						border-radius: 4px;
					}
				}
			}
			.show-more{
				width: 80px;
				height: 80px;
				background: #f4f4f4;
				color: #666;
				font-size: 14px;
				float: left;
				line-height: 80px;
				text-align: center;
				margin: 0 5px;
			}
		}
		
	}
</style>