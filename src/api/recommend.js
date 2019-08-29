import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  //返回的是一个Promise
  return jsonp(url, data, options)
}

export function getDiscList() {
const url = '/api/getDiscList'

const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    g_tk: 1928093487,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
})

return axios.get(url, {
    params: data
}).then((res) => {
    return Promise.resolve(res.data) //Promise 的主要作用就是用于封装异步操作，以便根据异步操作是否成功来进行后续的操作。后续操作是通过 then() 和 catch() 来申明的  
})

}

export function getSongList(disstid) {
const url = '/api/getSongList'

const data = Object.assign({}, commonParams, {
    disstid,
    g_tk: 1928093487,
	notice: 0,
	format: 'jsonp',
	jsonpCallback: 'playlistinfoCallback',
	type: 1,
	json: 1,
	utf8: 1,
	onlysong: 0,
	platform: 'yqq',
	hostUin: 0,
	needNewCode: 0
})
	return axios.get(url, {
	    params: data
	}).then((res) => {
	    return Promise.resolve(res.data) //Promise 的主要作用就是用于封装异步操作，以便根据异步操作是否成功来进行后续的操作。后续操作是通过 then() 和 catch() 来申明的  
	})
}