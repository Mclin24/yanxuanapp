<template>
    <ul class="item-list">
		<li class="item" v-for="item in itemList" :key='item.id' @click="goDetail(item)">
			<img v-lazy="item.primaryPicUrl">
			<p class="desc">{{item.simpleDesc}}</p>
			<p class="title">{{item.name}}</p>
			<p class="price">
				<span>¥{{item.retailPrice}}</span>
				<span v-if="item.retailPrice !== item.counterPrice">¥{{item.counterPrice}}</span>
			</p>
			<p class="tip">
				<span v-for="tip in item.itemTagList" :key="tip">
					{{tip}}
				</span>
			</p>
		</li>
	</ul>
</template>
<script>
    export default {
		name : 'item-list',
		props : {
			itemList : Array
		},
		methods: {
			goDetail(item) {
				this.$router.push(`/itemdetail/${item.id}`);
			}
		},
    }
</script>
<style lang="scss" scoped>
	.item-list{
		overflow: hidden;
		.item{
			width: 46.5%;
			margin-left: 8px;
			float: left;
			padding-bottom: 10px;
			img{
				width: 100%;
				display: block;
				background-color: #f4f4f4;
			}
		}
		.desc{
			color: #9F8A60;
                background: #F1ECE2;
                font-size: 12px;
                line-height: 16px;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis; 
                padding: 0 4px;
		}
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
				font-size: 14px;
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
</style>