# just formusics

> A Vue.js project

关于package.json中的dependencies生产工具说明

lyric-parser //歌词处理工具类

js-base64   //歌词base64位解析

create-keyframe-animation  //创建动画工具类

vue-lazyload  //图片懒加载工具

axios   //服务器数据请求工具类


vuex  //理解为项目多处需要共用数据的工具类

vue-router  //vue路由跳转工具

better-scroll  //轮播图以及页面滑动工具

jsonp   //跨域请求工具

good-storage  //本地存储localStorage工具

fastclick   //处理移动端click事件300毫秒延迟

babel-runtime   //处理代码编译后体积变大的问题

关于devDependencies开发环境需要用到的工具说明
这里我的webpack是全局安装的所以版本默认就是3.6.0
这里主要说明一下就是css工具stylus和vue的一些loader和babel都是要用到的
其他的不在多说明可自行查看

关于build文件的说明这里只说明修改过的地方
1、webpack.base.conf.js下module.exports下resolve中的alias中主要是用来对组件中的一些import地址引入做的优化，更方便的对js和组件的引入
2、webpack.dev.conf.js下在devServer下的before(apiRoutes)中写入了三个服务器请求，主要是用来做代理服务器对数据进行获取，这里需要用到node.js的express框架
3、webpack.prod.conf.js下webpackConfig下output下增加publicPath:"./",注意这条语句是在项目测试后没有问题的情况下，进行打包的时候需要添加进去的

关于base文件下的13个基础组件的说明
confirm  确定取消弹出框组件
listview  歌手列表组件组件
loading   数据加载动画组件
no-result      提示没有任何数据组件 
progressBar    进度条组件
progressCircle   圆形进度条组件
scroll           滑动组件
search-box       搜索框组件
search-list      搜索历史列表
slider    轮播图组件
song-list  歌曲列表组件
swiches    按钮切换组件
top-tip    添加歌曲成功提示


关于components下15个业务组件说明
add-song   添加歌曲列表
disc       热门歌单列表详情页
m-header   头部业务组件
music-list   歌曲列表业务组件
player     音乐播放器组件
playlist   音乐列表组件
rank       热门歌曲分类排行
rank-list   热门歌曲分类排行列表
recommend   歌曲推荐页组件
search      搜索页面
singer      歌手页面
singer-detail      歌手详情页
suggest        搜索结果列表
tab          头部选项卡
user-center   用户中心

关于store文件说明
该文件下为vuex配置文件创建完成后需在main.js中引入store
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态
简单说就是用来管理所有组件共用的状态模式也就是参数或者方法
从下往上说
1、state.js 状态树，用来创建参数状态
2、mutation-types.js 状态类型，创建定义参数的状态类型
3、mutations.js    通过创建的状态类型可对状态进行改变  组件中的引入方式在方法下写入...mapMutations({自定义状态类型名称:创建的状态类型}）
4、index.js    创建vuex实例引入actions、getters、state、mutations
5、getters.js     创建定义参数名获取状态树下状态的内容    组件中的引入方式在方法下写入...mapGetters([({定义的参数名称}）
6、actions.js     当需要同时对多个状态做改变时使用通过定义函数名称传入commit，state对状态进行改变   组件中的引入方式在方法下写入...mapActions([({定义的函数名称}）


以上为方便查看阅读对该项目做的一些说明












