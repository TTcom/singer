import Vue from 'vue'
import Router from 'vue-router'
//import Recommend from 'components/recommend/recommend'
//import Rank from 'components/rank/rank'
//import Singer from 'components/singer/singer'
//import Search from 'components/search/search'
//import SingerDetail from 'components/singer-detail/singer-detail'
//import Disc from 'components/disc/disc'
//import RankList from 'components/rank-list/rank-list'
//import UserCenter from 'components/user-center/user-center'

Vue.use(Router)
// vue路由懒加载解决首页不用一次加载过多资源造成用时过长的问题
const Recommend = (resolve)=>{
	import('components/recommend/recommend').then((module)=>{
		resolve(module)
	})
}
const Singer = (resolve)=>{
	import('components/singer/singer').then((module)=>{
		resolve(module)
	})
}
const Rank = (resolve)=>{
	import('components/rank/rank').then((module)=>{
		resolve(module)
	})
}
const Search = (resolve)=>{
	import('components/search/search').then((module)=>{
		resolve(module)
	})
}
const SingerDetail = (resolve)=>{
	import('components/singer-detail/singer-detail').then((module)=>{
		resolve(module)
	})
}
const Disc = (resolve)=>{
	import('components/disc/disc').then((module)=>{
		resolve(module)
	})
}
const RankList = (resolve)=>{
	import('components/rank-list/rank-list').then((module)=>{
		resolve(module)
	})
}
const UserCenter = (resolve)=>{
	import('components/user-center/user-center').then((module)=>{
		resolve(module)
	})
}


export default new Router({
mode: 'history',	
routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
        {
        	  path: ":id",
        	  component: Disc
        }
      ]
      
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
        	  path: ":id",
        	  component: RankList
        }
      ] 
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
        	  path: ":id",
        	  component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children:[
        {
        	  path: ":id",
        	  component: SingerDetail
        }
      ]
      
    },
    {
      path: '/user',
      component: UserCenter  	 
    }
    
]
})
