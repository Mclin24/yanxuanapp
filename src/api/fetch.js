import axios from 'axios'
import {Toast} from 'vant'
export function fetchGet(url,params = {}){
	return new Promise((resolve,reject)=>{
		axios.get(url,{
			params : params,
			headers : {
				
			},
			baseURL : 'http://localhost:8080'
			// baseURL : "http://39.108.9.155"
		})
		.then(res=>{
			if (res.status == 200 && res.data.status == 0) {
				resolve(res.data.data)
			} else{
				Toast({
					message : '请求错误',
					duration : 800
				})
			}
		})
		.catch(error=>{
			Toast({
				message : '请求失败',
				duration : 800
			})
		})
	})
}

export function fetchPost(url,params = {}){
	return new Promise((resolve,reject)=>{
		axios.post(url,params)
		.then(res=>{
			if (res.status == 200 && res.data.status == 0) {
				resolve(res.data.data)
			} else{
				Toast({
					message : res.data.message,
					duration : 800
				})
			}
		})
		.catch(error=>{
			Toast({
				message : '请求失败',
				duration : 800
			})
		})
	})
}