<template>
    <div id='mine' class="page">
		<h1>个人</h1>
    </div>
</template>
<script>
	import center from '../../tools/center.js'
	export default {
		beforeRouteEnter(to,from,next){
			let userToken = localStorage.getItem('userToken')
			if(userToken){
				next();
			}else{
				// 去登录页面
				center.$emit('toggle-login',to.fullPath);
				//进不了个人页面
				next(false);
			}
		}
	};
</script>
<style>
</style>
