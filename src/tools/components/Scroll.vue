<template>
    <div class="scroll-wrap" ref='wrap'>
		<div class="scroller">
			<slot></slot>
		</div>
    </div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		name : 'scroller',
		mounted(){
			//组件的dom结构挂载完成
			//创建滚动视图
			let scroll = new BScroll(this.$refs.wrap,{
				click : true,
				tap : true
			});
			this.scroll = scroll;
			scroll.on('beforeScrollStart',()=>{
				scroll.refresh();
			})
			
		},
		methods: {
			scrollTo(y,duration) {
			 this.scroll &&	this.scroll.scrollTo(0,y,duration);
			}
		},
	};
</script>
<style>
	
</style>
