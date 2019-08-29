import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util' 
export const playlistMixin={
	
	computed:{
	  ...mapGetters([
	    'playlist'

	  ])
		
	},
	mouted(){
		this.handlePlaylist(this.playlist)
	},
	activated(){
		this.handlePlaylist(this.playlist)
	},
	watch:{
		playlist(newVal){
			this.handlePlaylist(newVal)
		}
	},
	methods:{
		handlePlaylist(){
			throw  new Error('component must implement handlePlaylist method')
		}
	}
	
}

export const playerMixin={
	
	computed:{
			    iconMode(){    //播放方式
			    	
			    	return this.mode === playMode.sequence? 'icon-sequence' : this.mode===playMode.loop ? 'icon-loop' : 'icon-random'
			    },
		  	   	...mapGetters([
		  	   		'sequenceList',
		  	   		'currentSong',
		  	   		'playlist',
		  	   		'mode',
		  	   		'favoriteList'
		  	   	])
		
	},
	methods:{
		       getFavoriteIcon(song){
		       	   if(this.isFavorite(song)){
		       	   	    return 'icon-favorite'
		       	   }else{
		       	   	    return 'icon-not-favorite'
		       	   }
		       },
		       toggleFavorite(song){
		       	   if(this.isFavorite(song)){
		       	   	    this.deleteFavoriteList(song)
		       	   }else{
		       	   	    this.saveFavoriteList(song)
		       	   }
		       	
		       },
		       isFavorite(song){
		       	   const index = this.favoriteList.findIndex(item=>{
		       	   	     return item.id === song.id
		       	   })
		       	    return index > -1
		       	   
		       },
			   changeMode(){  //改变播放方式
			   				   	
			 	  const mode=(this.mode+1) % 3
			 	  this.setPlayMode(mode)
			 	  let list=null
			 	  if(mode === playMode.random){
			 	  	  
			 	  	  list=shuffle(this.sequenceList)
			 	  	 
			 	  }else{
			 	  	  list=this.sequenceList

			 	  }
			 	      this.resetcurrentindex(list,this.currentSong.id) 
			 	      //bug修复改变歌曲index必须放到改变列表之前，然后再插入时就是当前播放的歌曲id并没有改变
			 	      this.setPlaylist(list);

			   },
			   resetcurrentindex(list,id){
			   	 let index=list.findIndex(item=>{    //返回当前播放歌曲的位置
			   	 	
			   	 	 return item.id === id;
			   	 })

			   	  this.setCurrentIndex(index);
			   },
			...mapMutations({
				setPlayingState:'SET_PLAING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_PLAY_MODE',
				setPlaylist:'SET_PLAYLIST'
			}),
			...mapActions([
				'saveFavoriteList',
				'deleteFavoriteList'
			])
			
		
	}
	
}

export const searchMixin = {
	data(){
	  return{
	  	query:""
	  }
	},
	computed:{
		   ...mapGetters([
		   	  'searchHistory'
		   ])
		
	},
	methods:{
			saveSearch(){   //存储搜索历史
			  this.saveSearchHistory(this.query)
			  
			},
			blurInput(){
			   	this.$refs.searchBox.blur()   //向子组件传递参数
			},
			onQueryChange(query){
				this.query=query
			},
			addQuery(query){
			 this.$refs.searchBox.setQuery(query)   //向子组件传递参数
			  
			},
			
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory'
			])
		
	}
	
}



