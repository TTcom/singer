<template>
	<transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage" :rank="rank"></music-list>
	</transition>
	
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getMusicList} from 'api/rank'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	export default {
		computed:{
			title(){
			   return this.rankList.topTitle	
			},
			bgImage(){
				if(this.songs.length){
					 return this.songs[0].image
				}
			    return ''
			},				
		  ...mapGetters([
		  	'rankList'
		  ])
		
		},
		data(){
		  return{
		  	songs:[],
		  	rank:true
		  }
		},
		created(){
		   this._getRankList()	
		},
		methods:{
		   	_getRankList(){
				if(!this.rankList.id){
					this.$router.push('/rank')
					return
				}

		   	  	getMusicList(this.rankList.id).then(res=>{
		   	  		if(res.code === ERR_OK){
		   	  			this.songs=this._normalizeSongs(res.songlist)
		   	  			
		   	  		}
		   	  		
		   	  	})
		   	},
			_normalizeSongs(list){
			   let ret = [];
			   list.forEach(item=>{
			   	let {data} =item
			   	if(data.songid && data.albummid){
			   		ret.push(createSong(data))
			   	}
			   })
			   return ret
			},
		},
		components:{
			MusicList
		}
		
		
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s

  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
		
</style>