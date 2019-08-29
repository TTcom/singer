<template>
  <div class="slider" ref="slider" :val="cname">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    props: {
      loop: {    //是否循环自动轮播
        type: Boolean,
        default: true
      },
      autoPlay: {   //是否自动开始播放
        type: Boolean,
        default: true
      },
      interval: {    //轮播时间间隔
        type: Number,
        default: 4000
      },
      cname:{
      	type:String,
      	default:""
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        aba:0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {    //监听视图窗口大小发生改变时
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isresize) {     //初始化宽度
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isresize) {     //如果循环播放的话需要增加两倍的宽度
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {     //项目初始化

        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,     //横向滚动
          scrollY: false,
          momentum: false,    //惯性
          snap: true,          //该属性是给 slider 组件使用的，普通的列表滚动不需要配置
          snapLoop: this.loop,  // 是否可以无缝循环轮播
          snapThreshold: 0.3,   //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          snapSpeed: 400    //轮播图切换的动画时间
        })

        this.slider.on('scrollEnd', () => {  //每次切换到下一张触发的事件
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        this.aba=pageIndex;
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed() {
    
         clearTimeout(this.timer)
    },
    activated(){  //进入时触发deactivated
    	setTimeout(() => {
    	if (this.autoPlay) {
               this._play();

    	  }
    	 }, 20)
    },
    deactivated(){   //退出时触发deactivated
    	clearTimeout(this.timer)
    }
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>