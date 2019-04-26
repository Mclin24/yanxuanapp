<template>
    <nav class="tab-bar border-top">
		<template v-for="tabitem in tabsList">
			<router-link class='tab-item'
			 :key='tabitem.path' :to='tabitem.path'>
				<span class="icon"></span>
				<span class="text">{{tabitem.name}}</span>
			</router-link>
		</template>
	</nav>
</template>
<script>
    export default {
		data() {
			return {
				tabsList : [
					{ name : '首页', path : '/home'},
					{ name : '分类', path : '/category'},
					{ name : '识物', path : '/discover'},
					{ name : '购物车', path : '/cart'},
					{ name : '个人', path : '/mine'},
				]
			}
		},
    }
</script>
<style lang="scss" scoped>
	.tab-bar{
		background: #fff;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 49px;
		display: flex;
		.tab-item{
			flex: 1;
			padding-top: 4px;
			&.router-link-active .text{
				color: #E43929;
			}
			span{
				display: block;
				&.icon{
					background-image: url(/images/tabs.png);
					background-repeat: no-repeat;
					width: 26px;
					height: 26px;
					margin: 0 auto;
					background-size: 100%;
				}
				&.text{
					text-align: center;
					font-size: 12px;
					font-weight: bold;
					padding-top: 2px;
					color: #333;
				}
			}		
		}
	}
	.tab-item:nth-of-type(1){
		.icon{
			background-position: 0 -155.5px;
		}
	}
	.tab-item:nth-of-type(1).router-link-active{
		.icon{
			background-position: 0 -124px;
		}
	}
	.tab-item:nth-of-type(2){
		.icon{
			background-position: 0 -93.5px;
		}
	}
	.tab-item:nth-of-type(2).router-link-active{
		.icon{
			background-position: 0 -62.5px;
		}
	}
	.tab-item:nth-of-type(3){
		.icon{
			background-position: 0 -217.5px;
		}
	}
	.tab-item:nth-of-type(3).router-link-active{
		.icon{
			background-position: 0 -186.5px;
		}
	}
	.tab-item:nth-of-type(4){
		.icon{
			background-position: 0 -31.5px;
		}
	}
	.tab-item:nth-of-type(4).router-link-active{
		.icon{
			background-position: 0 -0.5px;
		}
	}
	.tab-item:nth-of-type(5){
		.icon{
			background-position: 0 -279px;
		}
	}
	.tab-item:nth-of-type(5).router-link-active{
		.icon{
			background-position: 0 -248.5px;
		}
	}
</style>