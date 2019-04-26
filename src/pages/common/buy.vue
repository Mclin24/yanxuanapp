<template>
    <div class="page subpage" id="buy">
		立即购买
    </div>
</template>
<script>
	import center from '../../tools/center.js'
    export default {
		beforeRouteEnter(to,from,next){
			//组件内部守卫
			//判断用户是否登录了
			let userToken = localStorage.getItem('userToken');
			if (userToken) {
				next();
			}else{
				//去登录页面
				center.$emit('toggle-login',to.fullPath);
				//进不了立即购买页面
				next(false);
			}
		}
    }
</script>
<style>
</style>