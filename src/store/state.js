import {playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
const state={
	singer:{},       //歌手信息
	playing:false,     //播放状态
	fullScreen:false,   //是否全屏
	playlist:[],            //播放列表
	sequenceList:[],        //播放顺序列表
	mode:playMode.sequence,     //播放方式
	currentIndex:-1,         //当前播放的索引
	disc:{},                  //歌单对象
	rankList:{},           //排行榜列表对象
	searchHistory:loadSearch(),   //搜索历史从本地存储获取数据列表
	playHistory:loadPlay(),    //最近播放列表
    favoriteList:loadFavorite()          //收藏的歌曲
}

export default state
