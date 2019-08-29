
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song{
	constructor({id,mid,singer,name,album,duration,image,url}){
      
       this.id=id
       this.mid=mid
       this.singer =singer
       this.name =name
       this.album =album
       this.duration=duration
       this.image=image
       this.url=url

	}
	
	getLyric(){
		
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getLyric(this.mid).then(res=>{
				if(res.retcode === ERR_OK){
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric )
				}else{
					reject('no lyric')
				}
				
			})
			
		})
		
		
	}
}


export function createSong(musicData){

     return new Song({
     	id:musicData.songid,
     	mid:musicData.songmid,
     	singer:filterSinger(musicData.singer),
     	name:musicData.songname,
     	album:musicData.albumname,
     	duration:musicData.interval,
     	image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
     	//url:`http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0`
     	url:`http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?vkey=E934268A6473D2E934CB24DC151478C5074D381B45D51C2953BF6026FBA92BE970328958856CD7232AEAD7DC374E0672F6682AB4DAE5DFA0&guid=2955807887&uin=1902305073&fromtag=66`
     })
  
}


 function filterSinger(singer){
	let ret = []
	if(!singer){
		return ''
	}
	
	singer.forEach(s=>{
		ret.push(s.name)
	})
	return ret.join('/')
	
}
