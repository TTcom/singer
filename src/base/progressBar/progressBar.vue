<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" 
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { prefixStyle } from 'common/js/dom'
  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data(){
    	return{
    		progresswidth:0
    	}
    },
    watch:{
      percent(newVal) {
        if (newVal >= 0 && !this.touch.initiated) {
        	 
        	 if(this.$refs.progressBar.clientWidth>0){
        	 	  this.progresswidth=this.$refs.progressBar.clientWidth
        	 }
           const barWidth = this.progresswidth - progressBtnWidth
           const offsetWidth = newVal * barWidth
            this._offset(offsetWidth)
        }
      }
    },
    created() {
      this.touch = {}
//    let wwidth=this.$refs.progressBar.clientWidth;
//    console.log(wwidth);
    },
    methods: {
      // 进度条拖动效果
      progressTouchStart(e) {
        this.touch.initiated = true    //表示已经初始化了
        this.touch.startX = e.touches[0].pageX   //点击的位置
        // 当前移动的位置
        this.touch.left = this.$refs.progress.clientWidth    //进度条的宽度
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
        	return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX    //纵向偏移量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0, this.touch.left + deltaX))

        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        // 按钮偏移
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth

        this.$emit('percentChange', percent)   //子组件将事件派发出去给父组件
      },
      progressClick(e) {
      	//当我们点击 progressBtn 的时候 e.offsetX获取不对
        const rect = this.$refs.progressBar.getBoundingClientRect()  //getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
      //  this._offset(e.offsetX)
        this._triggerPercent()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>