<template>
  <scroll  class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest" :beforeScroll="beforeScroll" @beforeScroll="listScoll">
    <ul class="suggest-list">
      <li  class="suggest-item" v-for="item in result" @click="selectItem(item)">
 
     
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
	
	
</template>

<script>
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import NoResult from 'base/no-result/no-result'
	import Singer from 'common/js/singer'
	import {mapMutations,mapActions} from 'vuex'
	const TYPE_SINGER = 'singer'
	const perpage=20
	export default{
		props:{
			query:{
				type:String,
				default:''
			},
			showSinger:{
				type:Boolean,
				default:true
			}
		
		},
		data(){
		  return{
		  	page:1,
		  	result:[],
		  	pullup:true,
		  	hasMore:true,
		  	beforeScroll:true
		  }
		},
		methods:{
			refresh(){
			    this.$refs.suggest.refresh();
			},
			listScoll(){
			   this.$emit('listScroll')	
			},
			selectItem(item){
				if(item.type === TYPE_SINGER){
					const singer = new Singer({
						id:item.singermid,
						name:item.singername
					})
					this.$router.push({
						path:`/search/${singer.id}`
					})
					this.setSinger(singer)
				}else{
					this.insertSong(item)
				}
				 this.$emit('select')
			},
			searchMore(){   //搜索更多
				if(!this.hasMore){
					return
				}
				this.page++
				search(this.query,this.page,this.showSinger,perpage).then(res=>{
					if(res.code === ERR_OK){
						this.result =this.result.concat(this._genResult(res.data)) 
						this._checkMore(res.data)
					}
				})
				
			},
			getDisplayName(item){    
			    if(item.type === TYPE_SINGER){
			    	  return item.singername
			    }else{
			    	  return `${item.name}-${item.singer}`
			    }
			},
			getIconCls(item){
			   if(item.type === TYPE_SINGER){
			   	   return 'icon-mine'
			   }else{
			   	 return 'icon-music'
			   }
			
			},
			search(){
				this.page = 1
				this.hasMore=true
				this.$refs.suggest.scrollTo(0,0)
				search(this.query,this.page,this.showSinger,perpage).then(res=>{
					if(res.code === ERR_OK){
						this.result = this._genResult(res.data)
						this._checkMore(res.data)
					}
				})
			},
			_checkMore(data){    //检测是都已经加载所有数据
			   const song=data.song
			   if(!song.list.length || (song.curnum+song.curpage * perpage) >= song.totalnum){  //当返回的list为空或者大于总数时
			   	   this.hasMore=false
			   }
			},
			_genResult(data){
				let ret = []
				if(data.zhida && data.zhida.singerid){  //判断是否含有歌手信息
					 ret.push({...data.zhida,...{type:TYPE_SINGER}})
					 //扩展运算符将data中的zhida数据展开插入到ret中，并插入键为type值为TYPE_SINGER数据
				}
				if(data.song){
					ret=ret.concat(this._normalLizeSongs(data.song.list))
				}
				return ret
			},
			_normalLizeSongs(list){
				let ret = []
				list.forEach(musicData=>{
					if(musicData.songid && musicData.albumid){
						ret.push(createSong(musicData))
					}
				})
				return ret
			},
			...mapMutations({
				setSinger:'SET_SINGER'
				
			}),
			...mapActions([
				'insertSong'
			])
			
		},
		watch:{
			query(){
				 this.result =[];
				 this.hasMore=true
				 this.search()
			}
		},
		components:{
			Scroll,
			Loading,
			NoResult
		}
	}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>