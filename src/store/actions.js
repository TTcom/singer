import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from 'common/js/cache'

function findIndex(list,song){    //查找列表中是否有该歌曲
	return list.findIndex((item)=>{
		return item.id === song.id
		
	})
}
export const selectPlay=function({commit,state},{list,index}){     //修改播放列表
	
	commit(types.SET_SEQUENCE_LIST,list)
	if(state.mode  === playMode.random){
		let randomlist = shuffle(list)
		commit(types.SET_PLAYLIST,randomlist)
		index=findIndex(randomlist,list[index])
	}else{
		commit(types.SET_PLAYLIST,list)
	}
	
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAING_STATE,true)
}

export const randomPlay = function({commit},{list}){
	
	commit(types.SET_PLAY_MODE,playMode.random)
//	commit(types.SET_PLAYLIST,list)
	commit(types.SET_SEQUENCE_LIST,list)
	let randomlist = shuffle(list)
	commit(types.SET_PLAYLIST,randomlist)
	commit(types.SET_CURRENT_INDEX,0)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAING_STATE,true)
	
}


export const insertSong = function ({commit,state},song){
	let playlist = state.playlist.slice()    //.slice()创建副本
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	//记录下当前歌曲
	let currentSong = playlist[currentIndex]
	//查找当前列表中是否有待插入的歌曲并返回其索引
	let fpIndex = findIndex(playlist,song)
	//因为是插入歌曲所以索引加1
	 currentIndex++
	//插入这首歌到当前索引位置
	playlist.splice(currentIndex,0,song)  //删除并插入song
	//如果已经包含了这首歌就在当前列表中删除
	if(fpIndex > -1){    
		// 如果当前插入的序号大于列表中的序号
       if(currentIndex > fpIndex){
       	   playlist.splice(fpIndex,1)
       	   currentIndex--
       }else{
       	  playlist.splice(fpIndex + 1,1)
       }
	}
	
	let currentSIndex =findIndex(sequenceList,currentSong) + 1   // 插入的位置
	
	let fsIndex = findIndex(sequenceList,song)
	
	sequenceList.splice(currentSIndex,0,song)
	if(fsIndex > -1){
		 if(currentSIndex > fsIndex){
		 	   sequenceList.splice(fsIndex,1)
		 }else{
		 	 sequenceList.splice(fsIndex+1,1)
		 }
	}
	commit(types.SET_PLAYLIST,playlist)
	commit(types.SET_SEQUENCE_LIST,sequenceList)
	commit(types.SET_CURRENT_INDEX,currentIndex)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAING_STATE,true)	
}


export const saveSearchHistory = function ({commit},query){   //存储搜索历史
	
	commit(types.SET_SEARCH_HISTORY,saveSearch(query))	 //存入数组history
	
}

export const deleteSearchHistory = function ({commit},query){   //删除搜索历史

   commit(types.SET_SEARCH_HISTORY,deleteSearch(query))	 //删除

}

export const clearSearchHistory = function({commit}){
	commit(types.SET_SEARCH_HISTORY,clearSearch())	 //清空
}

export const deleteSong = function ({commit,state},song){
	let playlist = state.playlist.slice()    //.slice()创建副本
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist,song);
    playlist.splice(pIndex,1)
	let sIndex = findIndex(sequenceList,song);
	sequenceList.splice(sIndex,1)
	if(currentIndex > pIndex || currentIndex === playlist.length){
		currentIndex--
	}
	
	commit(types.SET_PLAYLIST,playlist)
	commit(types.SET_SEQUENCE_LIST,sequenceList)
	commit(types.SET_CURRENT_INDEX,currentIndex)
	
	const playingState = playlist.length > 0 ? true : false
	

		commit(types.SET_PLAING_STATE,playingState)	

}

export const deleteSongList = function ({commit}){
	commit(types.SET_PLAYLIST,[])
	commit(types.SET_SEQUENCE_LIST,[])
	commit(types.SET_CURRENT_INDEX,-1)
	commit(types.SET_PLAING_STATE,false)	
}

export const savePlayHistory =function({commit},song){
	
	commit(types.SET_PLAY_HISTORY,savePlay(song))	 //存入数组history
}

export const saveFavoriteList = function({commit},song){
	  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}
export const deleteFavoriteList = function({commit},song){
	  commit(types.SET_FAVORITE_LIST,deleteFavorite(song)) 
}

