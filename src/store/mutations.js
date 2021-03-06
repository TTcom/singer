import * as types from './mutation-types'

 const matutions={
	[types.SET_SINGER](state,singer) {    // 更改设置的状态参数 state当前状态树的state，后面 singer是传入的参数
		state.singer=singer
	},
	[types.SET_PLAING_STATE](state,flag) {
		state.playing=flag
	},
	[types.SET_FULL_SCREEN](state,flag) {
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list) {
		state.playlist=list
	},
	[types.SET_SEQUENCE_LIST](state,list) {
		state.sequenceList=list
	},
	[types.SET_PLAY_MODE](state,mode) {
		state.mode=mode
	},
	[types.SET_CURRENT_INDEX](state,index) {
		state.currentIndex=index
	},
	[types.SET_DISC](state,disc) {
		state.disc=disc
	},
	[types.SET_RANK_LIST](state,rankList) {
		state.rankList=rankList
	},
	[types.SET_SEARCH_HISTORY](state,history) {
		state.searchHistory=history
	},
	[types.SET_PLAY_HISTORY](state,history) {
		state.playHistory=history
	},
	[types.SET_FAVORITE_LIST](state,list) {
		state.favoriteList=list
	}
	
}
export default matutions