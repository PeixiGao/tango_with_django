 
// 字符验证
jQuery.validator.addMethod("stringCheck", function(value, element) {
return true;
return this.optional(element) || /^1[0-9]{10}$/.test(value) || /^([.a-zA-Z0-9]{1,20}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5})$/.test(value);

}, "只能包括手机号码和邮箱");
$().ready(function() {
    //判断cookie
    if ($.cookie("rmbUser") == "true") {
        $("#remember_password_img_id").attr('src','images/login/radio_s.png');
        $("#remember_password_input_id").val(1);
        $("#username_id").val($.cookie("username"));
        var password=$.cookie("password")
        $("#password_id").val(Base64.decode(password));
    }
    var myDate = new Date(); 
	var mytime=myDate.toLocaleString( );     //获取日期与时间
    console.log("bzp------------------------"+mytime);
    $("#login_form").validate({
        rules: {
             username: {
                required: true,
                stringCheck:true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
             username: {
                 required: "请输入用户名"
             },
            password: {
                required: "请输入密码",
                minlength: jQuery.format("密码不能小于{0}个字 符")
            },
        }
    });
});
$.validator.setDefaults({
    submitHandler: function() {   
        var username=$('#username_id').val();
        var userPwd=$('#password_id').val();  
         
    	var data={
            username:username,
            password:userPwd,
       	} 
//      data=JSON.stringify(data);
        $.ajax({
            url: urlip+"user/login",
            type: "post",
            dataType: "JSON",
            data: data,
            success: function (data) { 
            	console.log(this);
            	//判断是否登录是保存密码
            	var  remember_password_value=$("#remember_password_input_id").val(); 
		        if(remember_password_value==0){ 
		        }else{
		        	$.cookie("username", username, { expires: 7 });
		            $.cookie("password", Base64.encode(userPwd), { expires: 7 });
		        }   
                if(data.code==0){
	            	console.log(data);
//	            	toastr["success"]("登录成功！");
   					$.cookie("access_token", data.res.access_token, { expires: 1  , path: '/html'});
					$.cookie("refresh_token", data.res.refresh_token, { expires: 1  , path: '/html'});  
					$.cookie("permission", data.res.permission, { expires: 1  , path: '/html'});
					$.cookie("access_token", data.res.access_token, { expires: 1  , path: '/static'});
					$.cookie("refresh_token", data.res.refresh_token, { expires: 1  , path: '/static'});  
					$.cookie("permission", data.res.permission, { expires: 1  , path: '/static'});
					$.cookie("access_token", data.res.access_token, { expires: 1  , path: '/XuantiServer/static'});
					$.cookie("refresh_token", data.res.refresh_token, { expires: 1  , path: '/XuantiServer/static'});  
					$.cookie("permission", data.res.permission, { expires: 1  , path: '/XuantiServer/static'});
                	if (data.res.permission==100){
                		window.location.href="homePage.html?ver=2021.4.25";
                		// window.location.href="html/user_admin.html?ver=2021.4.25";
                	}else{
                		window.location.href="homePage.html?ver=2021.4.25";
                	}
                	
                }else {
                	console.log(data);
                	toastr["error"](data.msg);
                }
            },
            error: function (XMLHttpRequest) {
                console.log("ajax请求失败！");
                toastr["error"]('ajax请求失败');
            }
        }); 
    }
});

$(function() {
	
	//报错提示
    window.onerror = handleError
    function handleError(msg,url,l)
    {
        var txt="There was an error on this page.\n\n"
        txt+="Error: " + msg + "\n"
        txt+="URL: " + url + "\n"
        txt+="Line: " + l + "\n\n"
        txt+="Click OK to continue.\n\n"
        return true
    } //如果返回值为 false，则在控制台 (JavaScript console) 中显示错误消息。反之则不会
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
	
	
	
    //账号图片切换
    $("#username_id").focus(function(){
        $("#username_img_id").attr('src','images/login/icon_user_s.png');
        var username_value=$("#username_id").val();
        if(username_value.length!=0){
            $("#btn_clean_id").show();
        }
    })
    $("#username_id").blur(function(){
        $("#username_img_id").attr('src','images/login/icon_user_n.png');
        });
    //密码图片切换
    $("#password_id").blur(function(){
        $("#password_img_id").attr('src','images/login/icon_password_n.png');
    })
    $("#password_id").focus(function() {
        $("#password_img_id").attr('src','images/login/icon_password_s.png');
    });
    //记住密码
    $("#remember_password_id").click(function() {
         remember_password();
    });
     // 记住密码图标切换方法
    function remember_password() {
        var  remember_password_value=$("#remember_password_input_id").val();
        if(remember_password_value==0){
            $("#remember_password_img_id").attr('src','images/login/radio_s.png');
            $("#remember_password_input_id").val(1);
              var str_username=$('#username_id').val();
              var str_password=$('#password_id').val();
              $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
              $.cookie("username", str_username, { expires: 7 });
              $.cookie("password",  Base64.encode(str_password), { expires: 7 });
        }else {
            $("#remember_password_input_id").val(0);
            $("#remember_password_img_id").attr('src', 'images/login/radio_n.png');
            $.cookie("rmbUser", "false", { expire: -1 });
            $.cookie("username", "", { expires: -1 });
            $.cookie("password", "", { expires: -1 });
        }
    } 
    //登录用户删除的方法
    $("#username_id").keyup(function(){
        var username_value=$("#username_id").val();
        if(username_value.length==0){
            $("#btn_clean_id").hide();
        }else {
            $("#btn_clean_id").show();
        }
    });
    //删除输入框内容方法
    $("#btn_clean_id").click( function(){
          $("#username_id").val("");
          $(this).hide();
          $("#username_id").focus();
    });
});

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//						
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//          佛曰:  
//                  写字楼里写字间，写字间里程序员；  
//                  程序人员写程序，又拿程序换酒钱。  
//                  酒醒只在网上坐，酒醉还来网下眠；  
//                  酒醉酒醒日复日，网上网下年复年。  
//                  但愿老死电脑间，不愿鞠躬老板前；  
//                  奔驰宝马贵者趣，公交自行程序员。  
//                  别人笑我忒疯癫，我笑自己命太贱；  
//                  不见满街漂亮妹，哪个归得程序员？

/**
 * _ooOoo_
 * o8888888o
 * 88" . "88
 * (| -_- |)
 *  O\ = /O
 * ___/`---'\____
 * .   ' \\| |// `.
 * / \\||| : |||// \
 * / _||||| -:- |||||- \
 * | | \\\ - /// | |
 * | \_| ''\---/'' | |
 * \ .-\__ `-` ___/-. /
 * ___`. .' /--.--\ `. . __
 * ."" '< `.___\_<|>_/___.' >'"".
 * | | : `- \`.;`\ _ /`;.`/ - ` : | |
 * \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 * `=---='
 *          .............................................
 *           佛曰：bug泛滥，我已瘫痪！
 */