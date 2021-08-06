//  访问的地址 
var urlip="http://192.168.1.11:800/";   // 我的本地
//获取请求源
	var origin = window.location.origin;
	console.log(origin);
		if(origin.indexOf("192.168.1.12") != -1){  //包含该ip
			urlip="http://192.168.1.12:800/";   // 我的本地
//			urlip="http://192.168.1.7:800/";   // 本地服务器
			urlip="http://106.52.192.253:800/";
		}else{
			urlip="http://106.55.26.42:80/";
			urlip="http://106.52.192.253:800/";
		}
		
		
	urlip="http://127.0.0.1:800/";
	console.log(urlip);
	
	
//	一页显示的条数
	line=5
	
	
	//浏览器权限
	function myBrowser(){
	    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
//	    	console.log(userAgent);
	    var isOpera = userAgent.indexOf("Opera") > -1;
	     //判断是否IE浏览器
	    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
	        return "IE";
	    };
	    if (isOpera) {
	        return "Opera"
	    }; //判断是否Opera浏览器
	    if (userAgent.indexOf("Firefox") > -1) {
	        return "FF";
	    }; //判断是否Firefox浏览器
	    if (userAgent.indexOf("Chrome") > -1){
		  return "Chrome";
		 };
	    if (userAgent.indexOf("Safari") > -1) {
	        return "Safari";
	    }; //判断是否Safari浏览器 
	    if (userAgent.indexOf("Mozilla") > -1) {
	        return "Mozilla";
	    }; 
	}
	//以下是调用上面的函数
	var mb = myBrowser();
	if ("IE" == mb) { 
	}
	else if ("FF" == mb) { 
		$("head").html("")
	}
	else if ("Chrome" == mb) {  
	}
	else if ("Opera" == mb) { 
	    $("head").html("")
	}else if ("Mozilla" == mb) {
 	}else if ("Safari" == mb) {//手机端的浏览器   
   	    $("head").html("");//把head样式去掉  
	}else{ 
 		$("head").html("");
	}    
	
	
// 检验 undefined 和 null
 function isEmpty(obj) { 
	if(!obj && obj !== 0 && obj !== '') { 　　　　　　　　　
	  	return true;
	}
	if(Array.prototype.isPrototypeOf(obj) && obj.length === 0) { 
	　	return true;
	}
	if(Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {  
	　	return true; 　
	} 　
		return false;  
}
  

//jQuery的isEmptyObject()方法。判断是否是对象
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}  
 //毫秒转时分秒
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}
//时间戳变成时间
//function timestampToTime(timestamp) {
//      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//      Y = date.getFullYear() + '-';
//      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//      D = date.getDate() + ' ';
//      h = date.getHours() + ':';
//      m = date.getMinutes() + ':';
//      s = date.getSeconds();
//      return Y+M+D+h+m+s;
//  }

function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
        D = date.getDate() + '';
        h = date.getHours() + '';
        m = date.getMinutes() + '';
        s = date.getSeconds();
        return Y +'年'+M+'月'+D+'日'
    }

//不足两位的补上0
function Appendzero(obj)  
    {  
        if(obj<10) return "0" +""+ obj;  
        else return obj;  
    }  
function timestampToTime1(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
        D = date.getDate() + '';
        h = date.getHours() + '';
        m = date.getMinutes() + '';
        s = date.getSeconds();
        return Appendzero(h)+':'+Appendzero(m)
    }

function timestampToTime2(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '';
        D = date.getDate() + '';
        h = date.getHours() + '';
        m = date.getMinutes() + '';
        s = date.getSeconds();
        return Y +'-'+M+'-'+D+' '+Appendzero(h)+':'+Appendzero(m)+':'+Appendzero(s)
    }

//  timestampToTime(1403058804);
//  console.log(timestampToTime(1403058804));//2014-06-18 10:33:24
//给url添加时间戳
function convertURL(url){
  var timstamp = (new date).valueOf();
  if (url.indexOf("?")>=0){
     url = url + "&t=" + timstamp; 
  }else {
     url = url + "?t=" + timstamp;
  };
  return url;
};

// 数字转换
function numberFormat(value) {
	
		if (value>0){
			var param = {};
            var k = 10000,
                sizes = ['', '万', '亿', '万亿'],
                i;
                if(value < k){
                    param.value =value
                    param.unit=''
                }else{
                    i = Math.floor(Math.log(value) / Math.log(k)); 
              
                    param.value = ((value / Math.pow(k, i))).toFixed(2);
                    param.unit = sizes[i];
                }
        	return param;
		}else{
			value = Math.abs(value)
			var param = {};
            var k = 10000,
                sizes = ['', '万', '亿', '万亿'],
                i;
               
                i = Math.floor(Math.log(value) / Math.log(k)); 
          
                param.value = -((value / Math.pow(k, i))).toFixed(2);
                param.unit = sizes[i];
                 
        	return param;
		}
           
    }
    