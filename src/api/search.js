import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getHotKey() {
	
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
	uin: 0,
	notice: 0,
	platform: 'h5',
	needNewCode: 1,
	_:1526364022496
  })

  return jsonp(url, data, options)
}



export function search(query,page,zhida,perpage) {     //参数分别为检索的词，检索页，要不要歌手的数据,每次请求需要返回的数量
	
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
  	w:query,
  	p:page,
  	zhidaqu: 1,
  	catZhida:zhida ? 1 : 0,
  	t: 0,
	flag: 1,
	ie: 'utf-8',
	sem: 1,
	aggr: 0,
	perpage,
	n: perpage,
	remoteplace: 'txt.mqq.all',
	_: 1526366103622,
	uin: 0,
	platform: 'h5',
	needNewCode: 1,
	uid:0
	
  })

  return jsonp(url, data, options)
}
