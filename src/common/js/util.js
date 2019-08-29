
function getRandomInt(min,max){     //获取max和min之间的一个随机数
	
	return Math.floor(Math.random() * (max-min+1)+min)
}


export function shuffle(arr){     //数组随机排序
	let _arr = arr.slice()   //制造副本arr因多处要用到修改他避免产生副作用
	for(let i=0;i<_arr.length;i++){
		
		let j=getRandomInt(0,i);
		let t=_arr[i];
		_arr[i]=_arr[j];
		_arr[j]=t;
	}
	
	return _arr
}

export function debounce(func,delay){     //请求节流
   let timer
    return function(...args){    
  // ...args是func中的参数将参数转为数组 --->
  //从实际的意义上来看，就是将该返回的函数放入被调用的环境下来看此时的args就是wacth函数中的newQuery和oldQuery
       if(timer){
       	clearTimeout(timer)
       }
       timer = setTimeout(()=>{
//       	 func.apply(this,args)  
//this指向当前环境下的args，并将数据传递过去args数组自动拆分为多个参数
//可将apply改为call，apply是对数组的操作的，而call是对字符串操作的
        
           func.apply(this,args)
           
       },delay)
    }
	
}
