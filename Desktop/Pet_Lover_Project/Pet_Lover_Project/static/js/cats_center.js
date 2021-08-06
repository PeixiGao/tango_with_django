$(function () {
    console.log("student/html/student_center.js")
	$('.import-btn').change(function () {
          access_token=$.cookie("access_token");
          var formData = new FormData(),
          file = $(this).val()
          formData.append('file', $(this)[0].files[0])
          // 此处可传入多个参数
          formData.append('file', file)
          formData.append('token', access_token)
          formData.append('operation_type', 'teacher')
          $.ajax({
              url: "http://127.0.0.1:800/video/upload",
              type: 'post',
              async: false,
              data: formData,
              // 告诉jQuery不要去处理发送的数据
              processData: false,
              // 告诉jQuery不要去设置Content-Type请求头
              contentType: false,
              beforeSend: function () {
                  console.log('正在进行，请稍候')
              },
              success: function (data) {
                  if (data.message != null) {
                    $.messager.alert("提示",data.message);
                  }
                  if (data.infos != null){
                    location.href = "${ctx }/bom/messageExport.do";
                  }
               }
          })
     })
   //头文件
    $.ajax({
    async:false,
    url : "header.html",
    success : function(result){
         $(".navbar").html(result);
        }
    });
    // 菜单
    $.ajax({
    async:false,
    url : "menu.html?ver=2021.4.25",
    success : function(result){
        $(".menu_collapse").html(result);
             //$('.style_color') 这样就获取了所有的a标签，然后循环获取
            $('.style_color').each(function(){
                var href = $(this).attr('href');
                var test = window.location.href;
                if(test.indexOf(href) > 0 ) {
                    $(this).css("color","blue");
                    $(this).parent().parent().parent().addClass("in"); 
                    $(this).parent().parent().parent().parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_versions_s.png\" style=\" margin-left: 10px; \">");
                    $(this).parent().parent().parent().parent().children().eq(0).css("background-color", "#0a56c5").css("color", "white");
                    $(this).parent().parent().parent().parent().children().eq(0).children().eq(1).css({"color": "white"});
                    $(this).parent().parent().parent().parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_shrink.png\" class=\"collapse_hao\">");
                    $(this).html("<img src=\"../images/main/icon_triangle_s.png\" />"+$(this).text());
                }
            });
            }
       }); 
       
     permission=$.cookie("permission");
    if (permission!=100){
    	$(".spAdmin").hide()
    }
//  $(".style_st").hide()
    // 保存发送邮箱
    $(document).on('click', '#email_add', function() {
		var dogstype = $('input[name="dogstype"]').val();
		var dogsname = $('input[name="dogsname"]').val();
		var dogsdesc = $('input[name="dogsdesc"]').val();
		var dogsimg = $('#import_dog_img').val();
		console.log("111111111111")
		console.log(dogsimg)
    	var formData = {
    		'dogstype':dogstype,
    		'dogsimg':dogsimg,
    		'dogsname':dogsname,
    		'dogsdesc':dogsdesc,
            'type':'cat'
    	}
        $.ajax({
            url: urlip+"student/register",
            type: "get",
            dataType: "JSON",
            data: formData,
            success: function (data) {
                if(data.code==0){
                	console.log(data)
//		    		toastr["success"]("提交成功！");
		    		email()
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
    });
	   
	   
	//重置
    $('#email_reset').click(function(){
        document.getElementById("edition_add_form").reset();
    });
    
    if (urlip.indexOf('106.52.192.253') != -1){
    	$('#xianshang').show()
    }else{
    	$('#bendi').show()
    }
    
    
    
    
    email();//查询信息 
    //首次访问 
    function email(){ 
        var url=urlip+"student/query"; 
	 	access_token=$.cookie("access_token");
	 	console.log(access_token); 
        $.ajax({
        url: url,
        type: 'POST',
        xhrFields: {
		   		withCredentials: true
			},   
        data: {
            'type':'cat',
        	page:1,
        	line:line
        },
        dataType: 'JSON',
        success: function (data) { 
         	console.log(data); 
         	var counts='';
         	if(data.code==0){
         		for (var i = 0; i < data.res.data.length; i++) {  
         			
//       			if (data.res.data[i].permission!=100){
         				counts = counts +   " <tr>\n" + 
				                	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +
								    "                                <td >"+data.res.data[i].dogsname+"</td>\n" +
								    "                                <td >"+data.res.data[i].dogsdesc+"</td>\n" +
								    "                                <td >"+timestampToTime2(data.res.data[i].login_time)+"</td>\n" +
                                    "                                <td>\n" + "<a href=\"javascript:void(0)\" style=\"color:green;\" class=\"btn btn-info btn-lg email_edit\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-edit \"></span> Edit\n" +
                                    "                                    </a>\n"
                                                                                            +
                                    "                                    <a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg email_delect\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-trash \"></span> Delete\n" +
                                    "                                    </a>\n" +
                                    "                                </td>\n" +
                                    "                            </tr>";
//       			}
                
                                    
            }
     		$('tbody').html("");
			$('tbody').append(counts);  
        	$('#total_num').html(data.res.count);
         	toastr["success"]("success！");
     		if (data.res.count%line==0){
     			totalPages = data.res.count/line;
     		}else{
     			totalPages = data.res.count/line+1
     		} 
            $('#pageLimit').bootstrapPaginator({
                 currentPage: 1,//当前的请求页面。
                 totalPages: totalPages,//一共多少页。
                 size: "normal",//应该是页眉的大小。
                 bootstrapMajorVersion: 3,//bootstrap的版本要求。
                 alignment: "right",
                 numberOfPages: 7,//一页列出多少数据。
                 itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
                     switch (type) {
                         case "first":
                             return "首页";
                         case "prev":
                             return "上一页";
                         case "next":
                             return "下一页";
                         case "last":
                             return "末页";
                         case "page":
                             return page;
                     }
                 },
                 onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                    $.ajax({
                        url: url,
                        type: 'POST', 
                        data: {
				        	token:access_token,
				        	page:page,
				        	line:line
				        },
                         dataType: 'JSON',
                         success: function (data) {
                         	console.log(data); 
                         	var counts='';
                         	if(data.code==0){
				         		for (var i = 0; i < data.res.data.length; i++) {  
                			counts = counts + " <tr>\n" + 
				                	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +  
								    "                                <td >"+data.res.data[i].username+"</td>\n" +
								    "                                <td >"+data.res.data[i].name+"</td>\n" +
								    "                                <td >"+timestampToTime2(data.res.data[i].login_time)+"</td>\n" +
                                    "                                <td>\n" +
                                    "                                    <a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg email_delect\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-trash \"></span> 删除\n" +
                                    "                                    </a>\n" +
                                    "                                </td>\n" +
                                    "                            </tr>";
            }
				            $('tbody').html("");
				            $('tbody').append(counts);  
				            }else{
				            	console.log(JSON.stringify(data));  
				            }
                        },
                        error: function (XMLHttpRequest) { 
 							console.log("访问失败！");
                			console.log(XMLHttpRequest);
         					toastr["error"]("访问失败,请联系开发人员!");
                        }
                     })
                 }
             }); 
         }else{
         	console.log(JSON.stringify(data));
         }
         },
         error: function (XMLHttpRequest) {
         	console.log("访问失败！");
         	console.log(XMLHttpRequest);
         	toastr["error"]("访问失败,请联系开发人员!");
         }
     });
    }   
    
    
    //取消
	$('.closes').click(function(){
		//取消编辑
		$('#edit_id').fadeOut(100);
		$('#edit').slideUp(200);
		//权限删除
		$('#delect_id').fadeOut(100);
		$('#delect').slideUp(200);
	});
    
     //打开删除
    $(document).on('click','.email_delect', function() {
        // 唯一的ID
        var tr0=$(this).parent().parent().children().eq(0).text();
        $("#delete_id").val(tr0);
		$('#delect_id').fadeIn(100);
		$('#delect').slideDown(200);
	});
     $(document).on('click','.email_edit', function() {
        // 唯一的ID
        var tr0=$(this).parent().parent().children().eq(0).text();
        $("#delete_id").val(tr0);
		$('#delect_id').fadeIn(100);
		$('#edit').slideDown(200);
	});
	
	
	
	// 确定删除
    $('#delect_value').click(function(){ 
        //通过用户唯一的ID删除
        var delete_id=$("#delete_id").val();
 		var kid="#"+delete_id; 
        var url=urlip+"student/delete"; 
        $.ajax({
            url: url,
            type: "post",
            dataType:"JSON",
            data: {
                'id':delete_id,  
                'token':access_token
            },
            xhrFields: {
		   		withCredentials: true
			},  
            success: function (data)
            { //删除成功了就隐藏该条数据 
                
                if(data.code==0){
                	console.log(kid)
                	$(kid).parent().hide();//隐藏该条数据  
                	toastr["success"]("delete success");
                }else{
                	toastr["error"](data.msg);
                	console.log(JSON.stringify(data));  
                }
            },
            error:function (XMLHttpRequest) {
                console.log("删除失败！");
                toastr["error"](XMLHttpRequest);
            }
        });
        $('#delect_id').fadeOut(100);
		$('#delect').slideUp(200);
	});

    // 确定修改信息
    $('#edit_value').click(function(){
        var delete_id=$("#delete_id").val();
        var dogsname =$("#dogsname").val();
        var dogsdesc =$("#dogs_desc").val();
        // var dogsdesc=$('input[name="dogsdesc"]').val();
        var dogsimg=$('input[name="dogsimg"]').val();
        console.log("sssssss")
        console.log(dogsname)
        console.log(dogsdesc)
        console.log(dogsimg)
        $.ajax({
            url: urlip+"student/update",
            type: "post",
            dataType:"JSON",
            xhrFields: {
                withCredentials: true
            },
            data: {
               token:access_token,
                type:'cat',
               id:delete_id,
               dogsname:dogsname,
               dogsdesc:dogsdesc,
               dogsimg:dogsimg,
            },
            success: function (data)
            {
                window.location.reload();
                console.log("请求成功！"+JSON.stringify(data));
                // if(data.result_code!=0){
                //     toastr["error"](Errormessage(data.reason));
                // }else{
                //     toastr["success"]("编辑成功");
                //
                // }
                        //取消编辑
                $('#edit_id').fadeOut(100);
                $('#edit').slideUp(200);
                //权限删除
                $('#delect_id').fadeOut(100);
                $('#delect').slideUp(200);
            },
            error:function (XMLHttpRequest) {
                console.log("修改失败！");
                toastr["error"]('修改失败');
            }
        });
    });
});