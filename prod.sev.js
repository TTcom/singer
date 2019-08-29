var express = require('express')
var config = require('./config/index')
var history = require('connect-history-api-fallback');
var app = express()
var apiRoutes = express.Router();
var axios = require('axios') 
app.use(history());
		  apiRoutes.get('/getDiscList',(req,res)=>{
		  	
		    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
		    axios.get(url, {
		      headers: {
			      referer: 'https://c.y.qq.com',
			      host: 'c.y.qq.com'
		      },
		      params: req.query  //这是请求的query 
		    }).then((response) => {
		    //response是api地址返回的，数据在data里。
		  
		      res.json(response.data)
		    }).catch((e) => {
		      console.log(e);
		    })
		  });
		  
		  apiRoutes.get('/getSongList',(req,res)=>{
		  
		    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
		    axios.get(url, {
		      headers: {
			      referer: 'https://y.qq.com/n/yqq/playsquare/1185889395.html',
			      host: 'c.y.qq.com'
		      },
		      params: req.query  //这是请求的query 
		    }).then((response) => {   
      var ret = response.data
      // 返回的是JSONP格式的话
      if (typeof ret === 'string') {
          var reg = /^\w+\(({.+})\)$/
          var matches = ret.match(reg)
          if (matches) {
              ret = JSON.parse(matches[1])
          }
      }  
             res.json(ret)
		   
		    }).catch((e) => {
		      console.log(e);
		    })
		  });
		  
		  apiRoutes.get('/lyric',(req,res)=>{
		  	
		    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
		    axios.get(url, {
		      headers: {
			      referer: 'https://c.y.qq.com',
			      host: 'c.y.qq.com'
		      },
		      params: req.query  //这是请求的query 
		    }).then((response) => {
		    var ret = response.data;
		    if(typeof ret === "string"){
		    	  var reg=/^\w+\(({[^()]+})\)$/
		    	  var matches = ret.match(reg)
		    	  if(matches){
		    	  	ret= JSON.parse(matches[1])
		    	  }
		    }
		      res.json(ret)
		    }).catch((e) => {
		      console.log(e);
		    })
		  });
		   app.use('/api', apiRoutes);
		   app.use(express.static('./dist'))
		  
		  var port = process.env.PORT || config.build.port
          module.exports = app.listen(port,function(err){
          	if(err){
          		console.log(err)
          	}
          	console.log('listen http://localhost' + port + '/n')
          })
