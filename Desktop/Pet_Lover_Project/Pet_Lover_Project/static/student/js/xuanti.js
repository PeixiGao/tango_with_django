$(function () {  
	
	 
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
                console.log(href)
                console.log(test)
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
	 $(".style_color1").hide()  
	//重置
    $('#email_reset').click(function(){
        document.getElementById("edition_add_form").reset();
    });
    
    $('input:radio[name="ph"]').change(function () {
        
        dormitory_search($(this).val(),"0",'0');
    }) 
    
    	//选包
    $("#file_upload").bind("change",function(){
    	$("#file2").val(document.getElementById("file_upload").files[0].name); 
    }); 
    $('#add').click(function(){
    	access_token=$.cookie("access_token");
    	var id=$("#uid").val();
	 	console.log('tj');
	 	var file2 = $("#file2").val()
        if(file2==''){
            toastr['error']("文件夹不为空！");
            return;
        }
        var form_data = new FormData();
            var file_info =$( '#file_upload')[0].files[0];
            form_data.append('file',file_info);
            form_data.append('token',access_token);
            form_data.append('id',id);
            //if(file_info==undefined)暂且不许要判断是否有附件
                //alert('你没有选择任何文件');
                //return false
            $.ajax({
                url: urlip +"video/add",
                type:'POST',
                data: form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false, // tell jquery not to set contentType
                success: function(callback) {
					toastr["success"]("上传成功！");
					dormitory_search("0","0");//查询信息 
                }
            });
    }); 
    
    
    
    dormitory_search("0","0");//查询信息 
    //首次访问 
    function dormitory_search(name,id){ 
        var url=urlip+"video/select"; 
	 	access_token=$.cookie("access_token");
	 	console.log(access_token); 
        $.ajax({ 
        url: url,
        type: 'POST', 
        xhrFields: {
		   		withCredentials: true
			},   
        data: {
        	token:access_token,
        	page:1,
        	line:line,
        	name:name,
        	id:id
        },
        dataType: 'JSON',
        success: function (data) { 
         	console.log(data);
         	var counts='';
         	console.log(numberFormat(-3426234626));
         	if(data.code==0){
         		for (var i = 0; i < data.res.data.length; i++) {  
         				counts = counts +   " <tr>\n" + 
				                	"                                <td hidden id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +  
								    "                                <td >"+data.res.data[i].student_uid__nickname+"</td>\n" +
								    "								 <td >"+data.res.data[i].student_uid__username+"</td>\n" + 
								    "                                <td >"+data.res.data[i].production_name+"</td>\n" + 
								    "                                <td >"+data.res.data[i].production_url+"</td>\n" + 
								    "                                <td >"+data.res.data[i].mark+"</td>\n" + 
								    "                                <td >"+timestampToTime2(data.res.data[i].add_time)+"</td>\n" +
								    "                                <td >"+timestampToTime2(data.res.data[i].update_time)+"</td>\n" +
                                    "                                <td>\n" +
                                    "                                    <a href=\"http://127.0.0.1:800/video/download?id="+data.res.data[i].production_url+"&name="+data.res.data[i].production_name+" style=\"color:green;\" class=\"btn btn-info btn-lg bofangbtn\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-play-circle \"></span> 下载\n" +
                                    "                                    </a>"+
                                     "                                    <a href=\"javascript:void(0)\" style=\"color:blue;\" class=\"btn btn-info  btn-lg disabled_admin theme-compile\" >\n" +
                                     "                                        <span class=\"glyphicon glyphicon-edit\"></span> 编辑\n" +
                                     "                                    </a>\n" +
                                    "<a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg email_delect\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-trash \"></span> 删除\n" +
                                    "                                    </a>\n" +
                                    "                                </td>\n" +
                                    "                            </tr>";
         			}
                
     		$('tbody').html("");
			$('tbody').append(counts);  
        	$('#total_num').html(data.res.count); 
        	console.log(data.res.count%line); 
        	toastr["success"]("查询成功！");
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
				        	line:line,
				        	name:name,
        					id:id,
				        },
                         dataType: 'JSON',
                         success: function (data) {
                         	console.log(data); 
                         	var counts='';
				         	if(data.code==0){
				         		for (var i = 0; i < data.res.data.length; i++) {  
         						counts = counts +   " <tr>\n" + 
				                	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +  
								    "                                <td >"+data.res.data[i].video_url+"</td>\n" +
								    "								 <td >"+data.res.data[i].video_name+"</td>\n" +
								    "                                <td >"+timestampToTime2(data.res.data[i].video_data)+"</td>\n" +
                                    "                                <td>\n" +
                                    "                                    <a href=\"javascript:void(0)\" style=\"color:green;\" class=\"btn btn-info btn-lg bofangbtn\" >\n" +
                                    "                                        <span class=\"glyphicon glyphicon-play-circle \"></span> 播放\n" +
                                    "                                    </a><a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg email_delect\" >\n" +
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
	$(' .closes').click(function(){ 
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
        var tr1=$(this).parent().parent().children().eq(1).text();

        $("#delete_id").val(tr0);
        $("#video_id").val(tr1);

		$('#delect_id').fadeIn(100);
		$('#delect').slideDown(200);
	}); 
	
	
	
	// 确定删除
    $('#delect_value').click(function(){ 
        //通过用户唯一的ID删除
        var delete_id=$("#delete_id").val();
 		var kid="#"+delete_id; 
        $.ajax({
            url: urlip+"video/delete",
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
                	toastr["success"]("删除成功");
            		console.log("删除成功！"+JSON.stringify(data));  
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

    //播放

	  $(document).on('click', '.bofangbtn', function(){

         var tr1=$(this).parent().parent().children().eq(1).text();
         var video =tr1
        $.ajax({
            url: urlip+"video/play",
            type: "post",
            dataType:"JSON",
            data: {
                'token':access_token,
                'video':video
            },
            xhrFields: {
		   		withCredentials: true
			},
            success: function (data)
            { //删除成功了就隐藏该条数据

                if(data.code==10){

                	toastr["success"](data.msg);
                	console.log(JSON.stringify(data));
                }
            },
            error:function (XMLHttpRequest) {
                console.log("播放失败！");
                toastr["error"](XMLHttpRequest);
            }
        });
        $('#delect_id').fadeOut(100);
		$('#delect').slideUp(200);
	});

	// 打开编辑用户信息
	    $(document).on('click', '.theme-compile', function() { 
			var tr0=$(this).parent().parent().children().eq(0).text();//id
			var tr1=$(this).parent().parent().children().eq(1).text(); 
			var tr2=$(this).parent().parent().children().eq(2).text();  
			var tr3=$(this).parent().parent().children().eq(3).text(); 
			 
			$("#edit_pkid").val(tr0);
			$("#edit_building_number").val(tr1);
	        $("#edit_dormitory_number").val(tr2); 
	        $("#tr_status").val(tr3);
	        
	        $('#edit_id').fadeIn(100);
			$('#edit').slideDown(200);
		});  
		 
		 
		// 确定修改用户信息
	    $('#edit_value').click(function(){
	        var edit_pkid=$("#edit_pkid").val();  
	        var edit_building_number=$('input[name="edit_building_number"]').val();
	        var edit_dormitory_number=$('input[name="edit_dormitory_number"]').val();
	       	var tr_status=$("#tr_status").val();
	        $.ajax({
	            url: urlip+"dormitory/modify",
	            type: "post",
	            dataType:"JSON",
	            xhrFields: {
			   		withCredentials: true
				},  
	            data: {    
	               token:access_token,
	               id:edit_pkid,
	               building_number:edit_building_number,
	               dormitory_number:edit_dormitory_number,
	               level:tr_status,
	            }, 
	            success: function (data)
	            {
				    console.log("请求成功！"+JSON.stringify(data)); 
	                if(data.result_code!=0){
                		toastr["error"](Errormessage(data.reason)); 
	                }else{
	                	toastr["success"]("编辑成功");
	                }
	            },
	            error:function (XMLHttpRequest) {
	                console.log("修改失败！");
	              	toastr["error"]('修改失败'); 
	            }
	        }); 
	        edit_pkid="#"+edit_pkid;
	        $(edit_pkid).parent().children().eq(1).html(edit_building_number); 
        	$(edit_pkid).parent().children().eq(2).html(edit_dormitory_number); 
        	$(edit_pkid).parent().children().eq(3).html(tr_status); 
	       
	       	$('#edit_id').fadeOut(100);
			$('#edit').slideUp(200);
		}); 
	
	// 保存发送邮箱
    $(document).on('click', '#_add', function() {
		var building_number = $('input[name="building_number"]').val();
		var dormitory_number = $('input[name="dormitory_number"]').val();
		var level = $('#level').val();
		 
    	var access_token=$.cookie("access_token");
    	
        $.ajax({
            url: urlip+"dormitory/add",
            type: "get",
            dataType: "JSON",
            data: {
            	'token':access_token,
            	'building_number':building_number,
	    		'dormitory_number':dormitory_number,
	    		'level':level,
            },
            success: function (data) {
                if(data.code==0){
                	console.log(data)
		    		toastr["success"]("成功！");
		    		dormitory_search("0","0");//查询信息 
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
    $('#_reset').click(function(){
        document.getElementById("edition_add_form").reset();
    });
});