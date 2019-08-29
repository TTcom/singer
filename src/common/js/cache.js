import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 100

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

function insertArray(arr,val,compare,maxLen){
	const index = arr.findIndex(compare);  //查找是否含有该数据
	if(index === 0){   //如果有什么并且在第一条也不做
		return
	}
	if(index > 0){
		arr.splice(index,1)
	}
	arr.unshift(val)
	if(maxLen && arr.length > maxLen){
		arr.pop()
	}
	
}

function deleteFromArray(arr,compare){
	const index = arr.findIndex(compare);
	if(index > -1){
		arr.splice(index,1)
	}
}

export function saveSearch(query){   //存入
	let searches = storage.get(SEARCH_KEY,[])
	insertArray(searches,query,(item)=>{
		 return item === query
	},SEARCH_MAX_LENGTH)
	
	storage.set(SEARCH_KEY,searches) //存入
	
	return searches
	
	
}

export function loadSearch(){
	
	return storage.get(SEARCH_KEY,[])
}


export function deleteSearch(query){
	let searches = storage.get(SEARCH_KEY,[])
	
	deleteFromArray(searches,(item)=>{
		 return item === query
	});
	storage.set(SEARCH_KEY,searches) //存入
	
	return searches

}

export function clearSearch(){
	storage.remove(SEARCH_KEY)
	return []
}



export function savePlay(song){    //存入播放记录
	let songs = storage.get(PLAY_KEY,[])
	insertArray(songs,song,(item)=>{
		 return item.id === song.id
	},PLAY_MAX_LENGTH)
	
	storage.set(PLAY_KEY,songs) //存入
	
	return songs
}

export function loadPlay(){     //获取播放列表
	
	return storage.get(PLAY_KEY,[])
}

export function saveFavorite(song){    //存入收藏的歌曲
	let songs = storage.get(FAVORITE_KEY,[])
	insertArray(songs,song,(item)=>{
		 return item.id === song.id
	},FAVORITE_MAX_LENGTH)
	
	storage.set(FAVORITE_KEY,songs) //存入
	
	 return songs
}

export function deleteFavorite(song){     //删除收藏的歌曲
	let songs = storage.get(FAVORITE_KEY,[])
	
	deleteFromArray(songs,(item)=>{
		return item.id === song.id
	});
	storage.set(FAVORITE_KEY,songs) //存入
	
	return songs

}
export function loadFavorite(){     //获取收藏列表
	
	return storage.get(FAVORITE_KEY,[])
}

