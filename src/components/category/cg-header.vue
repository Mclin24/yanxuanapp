<template>
    <header class="category-header border-bottom">
		<div class="search-bar">
			<van-icon name="search" />
			搜索商品, 共{{$store.state.home.total}}款好物
		</div>
    </header>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
	.category-header{
		width: 100%;
		height: 44px;
		position: absolute;
		top: 0;
		left: 0;
		padding: 10px 8px;
		box-sizing: border-box;
		display: flex;
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
	}
</style>
