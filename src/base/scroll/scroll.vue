<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default{
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{      //点击事件
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			pullup:{    //上拉刷新
				type:Boolean,
				default:false
			},
			beforeScroll:{    //滚动开始事件
				type:Boolean,
				default:false
			}
			
		},
		mounted(){
			setTimeout(()=>{
				this._initScroll();
			},20)
		},
		methods:{
			_initScroll(){      //初始化
				if (!this.$refs.wrapper){
					return
				}
				this.scroll=new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
				if(this.listenScroll){
					let me = this
					this.scroll.on('scroll',(pos)=>{  //监听当前实例上的自定义事件。如：scroll, scrollEnd, pullingUp, pullingDown等。
						me.$emit('scroll',pos)
					})
				}
				if(this.pullup){   //如果上拉刷新为true就派发事件scrollEnd
					this.scroll.on('scrollEnd',()=>{
						if(this.scroll.y <= (this.scroll.maxScrollY+50)){
							this.$emit('scrollToEnd')
						}
					})
				}
				if(this.beforeScroll){
					this.scroll.on('beforeScrollStart',()=>{   //当开始滑动时派发事件
						this.$emit('beforeScroll')
					})
				}
				
			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh();
				},20)
				
			}
		}
		
	}
	
</script>

<style>
</style>