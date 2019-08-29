//获取歌词
import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid){
	const url = '/api/lyric'
	
	const data = Object.assign({}, commonParams,{
		songmid:mid,
		pcachetime: +new Date(),
		g_tk: 1928093487,
		hostUin: 0,
		platform: 'yqq',
		needNewCode: 0,
		format: 'json'
		
	})
	
	return axios.get(url,{
		params:data
	}).then(res=>{
		return Promise.resolve(res.data)     //Promise对象es6语法用于异步操作的后续处理
	})
	
}



