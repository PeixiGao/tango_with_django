
$(function () { 
//	document.oncontextmenu=new Function("event.returnValue=false;"); //屏蔽鼠标右键
//	document.onselectstart=new Function("event.returnValue=false;"); //禁止选择文字代码 
 

    //信息
    $(document).on('click', '#btn_news_id', function() {
        $(this).children().eq(0).html("<span class=\"glyphicon \" ><img src=\"../images/main/btn_news_p.png\" style=\"width: 33px;height: 33px;\"/></span>")
        $(this).children().eq(1).html("");
    });
    //打开账户信息
	$(document).on('click', '#theme-compileUser_id', function() {  
		var access_token="";
		if($.cookie("Ansjer") == "true"){
			access_token=$.cookie("access_token"); 
		}
 		var url=urlip+"account/showUserMore"; 
        $.ajax({
            url: url,
            type: "POST",
            dataType:"JSON", 
            data: {token:access_token}, 
            xhrFields: {
           		withCredentials: true
       		},  
            success: function (data)
            {  
                console.log("操作成功！"+JSON.stringify(data)); 

                var is_active; 
             	 if(JSON.stringify(data.result.datas[0].fields.is_active)=="true") { 
					   is_active= "是";
					} else {
					   is_active= "否";
					} 
				var user_isValid; 
             	if(JSON.stringify(data.result.datas[0].fields.user_isValid)=="true") { 
				   user_isValid= "是";
				} else {
				   user_isValid= "否";
				} 
				var language; 
             	if(data.result.datas[0].fields.language=="en") { 
				   language= "英文";
				} else if(data.result.datas[0].fields.language=="cn"){
				   language= "中文";
				} 
				var data_joined;
				var d = new Date(data.result.datas[0].fields.data_joined);
				data_joined=d.getFullYear() + '-' + Appendzero(d.getMonth() + 1) + '-' + Appendzero(d.getDate()) + ' ' + Appendzero(d.getHours()) + ':' + Appendzero(d.getMinutes()) + ':' + Appendzero(d.getSeconds());
				
				var last_login;
				var d = new Date(data.result.datas[0].fields.last_login);
				last_login=d.getFullYear() + '-' + Appendzero(d.getMonth() + 1) + '-' + Appendzero(d.getDate()) + ' ' + Appendzero(d.getHours()) + ':' + Appendzero(d.getMinutes()) + ':' + Appendzero(d.getSeconds());
//				console.log(data.result.datas[0].fields.username);
                $("#username_message").html(data.result.datas[0].fields.username);
                var NickName=data.result.datas[0].fields.NickName;
                if(NickName==""){
                	NickName="&nbsp;";
                }
                $("#head_portrait").attr("src",data.result.datas[0].fields.userIconUrl);//显示头像
                $("#NickName_message").html(NickName);
                $("#userEmail_message").html(data.result.datas[0].fields.userEmail);
                $("#data_joined_message").html(data_joined);
                $("#last_login_message").html(last_login);
                $("#is_active_message").html(is_active);
                $("#user_isValid_message").html(user_isValid); 
                $("#language_message").html(language); 
            },
            error:function (XMLHttpRequest) {
                console.log(""+error(XMLHttpRequest.status)+"");
                $("#error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
				                "\n" +
				                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
				                "\t\t&times;\n" +
				                "\t</a>\n" +
				                "\t<strong style='color:red;'>"+error(XMLHttpRequest.status)+"</strong> </div>");
				                setTimeout(function () {
							        $("#error").html("");
							    }, 5000);
            }
        });
		$('#user_message_id').fadeIn(100);
		$('#user_message').slideDown(200);
	});   
	  //打开账户信息
	$(document).on('click', '#theme-compilePwd_id', function() {  
		$('#user_pwdmessage_id').fadeIn(100);
		$('#user_pwdmessage').slideDown(200);
		
	}); 

	//显示修改的用户资料信息
	$(document).on('click', '#edit_user_message', function() { 
	    $('#head_portrait_text').show();//修改头像图片显示  
		$('#edit_NickName_message').show();
		$('#edit_userEmail_message').show();
		$('#edit_is_active_message').show();
		$('#edit_language_message').show();
		$('#edit_NickName_message').val($('#NickName_message').text());
		$('#edit_userEmail_message').val($('#userEmail_message').text()); 
		var is_active=$('#is_active_message').text();  
		options_true("#edit_is_active_message",is_active); 
		var language=$('#language_message').text();  
		options_true("#edit_language_message",language);
		$('#NickName_message').hide();
		$('#userEmail_message').hide(); 
		$('#is_active_message').hide(); 
		$('#language_message').hide();
		$('#save_user_message').show();
		$('#edit_user_message').hide();
	});
	//显示保存的用户资料信息
	$(document).on('click', '#save_user_message', function() {  
		console.log("开始请求");
		$('#userEmail_message').show(); 
		$('#NickName_message').show(); 
		$('#is_active_message').hide();   
		var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var em=document.getElementById("edit_userEmail_message").value; 
		if(filter.test(em)){
		    $('#head_portrait_text').hide();//修改头像图片隐藏
			$('#edit_NickName_message').hide();
			$('#edit_userEmail_message').hide();
			$('#edit_is_active_message').hide(); 
			$('#edit_language_message').hide();  
			$('#is_active_message').show();  
			$('#language_message').show();  
			$('#edit_user_message').show();  
			$('#save_user_message').hide();
		}else{
		    $(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
                "\n" +
                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
                "\t\t&times;\n" +
                "\t</a>\n" +
                "\t<strong style='color:red;'>邮箱输入不正确!</strong> </div>");
                setTimeout(function () {
			        $(".error").html("");
			    }, 5000);
		}
		var token="";
		 	if($.cookie("Ansjer") == "true"){ 
		 		token=$.cookie("access_token");
		 	} 
	        var edit_username=$('#username_message').text();//
	        var edit_nickname=$('input[name="edit_NickName_message"]').val().trim();// 
	       	var edit_email=$('input[name="edit_userEmail_message"]').val().trim();// 
	        var user_isValid=$('#user_isValid_message').text();//是否激活 
			var is_active=$('#edit_is_active_message').val(); 
			var language=$('#edit_language_message').val(); 
			if(is_active=="是"){
				is_active=true;
			}else if(is_active=="否"){
				is_active=false;
			}
			if(user_isValid=="是"){
				user_isValid=true;
			}else if(user_isValid=="否"){
				user_isValid=false;
			}
	        var content="{'userEmail':'"+edit_email+ 
	        "','username':'"+edit_username+  
	    	"','is_active':"+is_active+  
	    	",'language':'"+language+   
	    	"','NickName':'"+edit_nickname+ 
	    	"','user_isValid':"+user_isValid+  
	    	"}";
	    	content=content.replace(/'/g, '"');
	    	console.log("提交过去之前："+content); 
	    	var url=urlip+"account/perfectUserInfo";  
	    	var pic = $('#file_head_portrait')[0].files[0]; 
			console.log(pic);   
	    	var fd = new FormData();
	        fd.append('token', token);
	        fd.append('content', content);
	        if(pic==""){ 
	        	//创建新文件对象
				pic = new File([pic], new Date().getTime()+"_"+MathRand(4)+".jpg",{type:"image/jpeg/png"});//改名称
	         	fd.append('userIcon', "None");
	        }else{ 
	        	console.log($('#head_portrait').attr("src").indexOf("_")>-1); 
	        	if($('#head_portrait').attr("src").indexOf("_")>-1){
	        		console.log("已经是重新命名");   
	        	}else{
//	        		//创建新文件对象
					pic = new File([pic], new Date().getTime()+"_"+MathRand(4)+".jpg",{type:"image/jpeg/png"});//改名称
	        	}
	         	fd.append('userIcon', pic);
	        } 
	      
			$.ajax({
	            url: url,
	            type: "POST",
	            dataType:"JSON",
	            cache: false,
	            contentType: false,
	            processData: false,
	            xhrFields: {
			   		withCredentials: true
				},  
	            data: fd,
	            success: function (data)
	            {
				    console.log("请求成功！"+JSON.stringify(data));
	                if(data.error_code!=0){
                		$(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
		                "\n" +
		                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
		                "\t\t&times;\n" +
		                "\t</a>\n" +
		                "\t<strong style='color:red;'>"+Errormessage(data.reason)+"</strong> </div>");
		                setTimeout(function () {
					        $("#error").html("");
					    }, 5000);
	                }else{
	                	//改变修改后的值 显示出来
		                $('#NickName_message').text($('#edit_NickName_message').val());
						$('#userEmail_message').text($('#edit_userEmail_message').val());
						$('#is_active_message').text($("#edit_is_active_message").find("option:selected").text());
						$('#language_message').text($("#edit_language_message").find("option:selected").text());
	                }
	            },
	            error:function (XMLHttpRequest) {
	                console.log("访问网络失败！");
	                $(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
		                "\n" +
		                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
		                "\t\t&times;\n" +
		                "\t</a>\n" +
		                "\t<strong style='color:red;'>"+error(XMLHttpRequest.status)+"</strong> </div>");
		                setTimeout(function () {
					        $("#error").html("");
					    }, 5000);
//					console.log(url);  
	            } 
	        });  
			
	});
	
	$().ready(function() {
	    $("#user_pwd_form").validate({ 
	        rules: {
	            edit_userPwd: {
	                required: true 
	            },
	            edit_newUserPwd: {
	                required: true,
	                minlength: 6
	            },
	            edit_rnewUserPwd: {
	                equalTo: "#edit_newUserPwd"
	            }
	          },
	        messages: {
	            edit_userPwd: {
	                 required: "请输入旧密码"
	            },
	            edit_newUserPwd: {
	                required: "请输入新密码",
	                minlength: jQuery.format("密码不能小于{0}个字 符")
	            },
	            edit_rnewUserPwd: {
	                equalTo: "两次密码不一样"
	            } 
	        }
	    });
	    $.validator.setDefaults({
		   debug: true
		}) 
	 	// 确定修改
	$('#edit_pwd').click(function(){  
		if($("#user_pwd_form").valid()){ 
			var user_Name="";
			var token="";
		 	if($.cookie("Ansjer") == "true"){ 
		 		user_Name=$.cookie("username");
		 		token=$.cookie("access_token");
		 	}
		    var oldPwd=$('input[name="edit_userPwd"]').val();//密码
			var newPwd=$('input[name="edit_newUserPwd"]').val();//新密码 
			var url=urlip+"account/changePwd"; 
			$.ajax({
			    url: url,
			    type: "post",
			    dataType:"JSON",
			    xhrFields: {
			   		withCredentials: true
				},  
			    data: {  
			       username:user_Name, 
			       oldPwd:oldPwd,
			       newPwd:newPwd,
			       token:token
			    },
			    success: function (data)
			    {
			    	
//					console.log("请求成功！"+JSON.stringify(data));
			        if(data.error_code!=0){
			        	$(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
			            "\n" +
			            "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
			            "\t\t&times;\n" +
			            "\t</a>\n" +
			            "\t<strong style='color:red;'>"+Errormessage(data.reason)+"</strong> </div>");
			            setTimeout(function () {
					        $("#error").html(""); 
					    }, 5000); 
			        }else{ 
			        	window.location.href='../index.html';//重新登录页面
			        }
			    },
			    error:function (XMLHttpRequest) {
			        console.log("访问网络失败！");
			        $(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
		                "\n" +
		                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
		                "\t\t&times;\n" +
		                "\t</a>\n" +
		                "\t<strong style='color:red;'>"+error(XMLHttpRequest.status)+"</strong> </div>");
		                setTimeout(function () {
					        $("#error").html("");
					    }, 5000);
			    }
			});  
		}
			
	}); 
});
 
    //取消 
	$(document).on('click', '.closes', function() { 
		$('#user_message_id').fadeOut(100);
		$('#user_message').slideUp(200);
		$('#user_pwdmessage_id').fadeOut(100);
		$('#user_pwdmessage').slideUp(200);
	});
	 /** 
	 * 删除cookie 
	 * @param c_name 
	 */  
	function removeCookie(c_name) {    
	    setCookie(c_name, "", -1);    
	}      
	 // 退出
	 function logout(){   
	    	var access_token=$.cookie("access_token");
	    	console.log(access_token);
	        $.ajax({
	            url: urlip+"user/logout",
	            type: "get",
	            dataType: 'JSON',
	            data: {
		    		'token': access_token
		    	},
	            success: function (data) {
	                if(data.code==0){
			    		toastr["success"]("退出成功！");
			    		$.cookie("access_token", "", { expires: -1 , path: '/XuantiServer/static'});
			    		$.cookie("access_token", "", { expires: -1 , path: '/html'});
			    		$.cookie("access_token", "", { expires: -1 , path: '/static'});
			    		console.log($.cookie("access_token"));
			    		window.location.href="../index.html";
	                }else {
	                	console.log(data);
	                	toastr["error"](data.msg);
	                }
	            },
	            error: function (XMLHttpRequest) {
	                console.log(XMLHttpRequest.status);
	                toastr["error"]('服务器请求失败:'+XMLHttpRequest.status);
	            }
	        }); 
        }
	 
	 
	    $(document).on('click', '#btn_exit_id', function() {
	    	logout(); 
	    });
	 
	    $(document).on('click', '#btn_move_id', function() {
	    	requestFullScreen(document.documentElement);//全屏方法
	    });
	    
	    
	    
	});
	//全屏
	function requestFullScreen(element) {
	 	// 判断各种浏览器，找到正确的方法
	 	var requestMethod = element.requestFullScreen || //W3C
	 	element.webkitRequestFullScreen || //Chrome等
	 	element.mozRequestFullScreen || //FireFox
	 	element.msRequestFullScreen; //IE11
	 	if (requestMethod) {
	  		requestMethod.call(element);
	 	}
	 	else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
	 		var wscript = new ActiveXObject("WScript.Shell");
		  	if (wscript !== null) {
		   		wscript.SendKeys("{F11}");
		  	}
	 	}
	}
	//退出全屏
	function exitFull() {
		//判断各种浏览器，找到正确的方法
		var exitMethod = document.exitFullscreen || //W3C
		document.mozCancelFullScreen || //Chrome等
		document.webkitExitFullscreen || //FireFox
		document.webkitExitFullscreen; //IE11
		if (exitMethod) {
		  	exitMethod.call(document);
		}
		else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
	  		var wscript = new ActiveXObject("WScript.Shell");
		  	if (wscript !== null) {
		   		wscript.SendKeys("{F11}");
		  	}
	 	}
	}
	     //加载图片检查
        function checkImg(id){
			var img_id=document.getElementById(id).value; //根据id得到值
			var index= img_id.indexOf("."); //得到"."在第几位
			img_id=img_id.substring(index); //截断"."之前的，得到后缀
    		if(img_id!=".bmp" && img_id!=".png" && img_id!=".gif" && img_id!=".jpg" && img_id!=".jpeg"){  //根据后缀，判断是否符合图片格式 
	          	$(".error").html("<div class=\"alert alert-warning navbar-fixed-top \" style='text-align: center;color: blue;'>\n" +
		                "\n" +
		                "<a href=\"javascript:void(0)\" class=\"close\" data-dismiss=\"alert\">\n" +
		                "\t\t&times;\n" +
		                "\t</a>\n" +
		                "\t<strong style='color:red;'>不是指定图片格式,重新选择!</strong> </div>");
		                setTimeout(function () {
					        $(".error").html("");
					    }, 5000);
	         	document.getElementById(id).value="";  // 不符合，就清除，重新选择
	         	return false;
      		}else{
      			return true;
      		
      		}
    		
 		}
         //预览头像图片
	 function c(){
	 	var file =$('#file_head_portrait')[0].files[0]; 
	 	 
//      //创建新文件对象
//		var newfile = new File([file], new Date().getTime()+".jpg",{type:"image/jpeg"}); 
//		//以下为预览图片代码
//		var reader = new FileReader(); 
//		reader.onload = function (oFREvent) {
//		  	document.querySelector("#head_portrait").src = oFREvent.target.result;
//		  	
//		  	
//		};
//		reader.readAsDataURL(newfile);

        
         
	 	// 获取 window 的 URL 工具
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var imgURL = URL.createObjectURL(file);  
        if(checkImg("file_head_portrait")){
        	$("#head_portrait").attr("src",imgURL);//显示头像
        } 
	}