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
                if(test.indexOf(href) > 0 ) {
                    $(this).css("color","blue");
                    $(this).parent().parent().parent().addClass("in"); 
                    $(this).parent().parent().parent().parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_user_s.png\" style=\" margin-left: 10px; \">");
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
	   
	//重置
    $('#email_reset').click(function(){
        document.getElementById("edition_add_form").reset();
    });
    //   搜索
    $('#search').click(function(){
//		var content = $('input[name="content"]').val();
//		var select_id = $("#select_id").find("option:selected").val();
//		if (select_id=="name"){
//			platform_search(content,"0");
//		}else{
//			platform_search("0",content);
//		}


		var name_value = $('input[name="name_value"]').val();
		var id_value = $('input[name="id_value"]').val();
		if (name_value!=""){
			students_search(name_value,"0");
		}else if(id_value!=""){
			students_search("0",id_value);
		}
		
    });
    
    access_token=$.cookie("access_token");
	 	console.log(access_token); 
	 $('#building_number').change(function() {
	 });
	  
     
     $('#building_number').change(function() {
	    console.log($(this).val());
	    building_number = $(this).val();
	    if (building_number==""){
	    	$('#dormitory_number').html('');
	    	return;
	    }
	    $.ajax({ 
        url: urlip+"dormitory/select",
        type: 'POST', 
        xhrFields: {
		   		withCredentials: true
			},   
        data: {
        	token:access_token,
        	building_number:building_number,
        },
        dataType: 'JSON',
        success: function (data) { 
         	console.log(data);
         	var counts='';
         	if(data.code==0){
         	 
         		var dormitory_number_html="<option value=''>请选择宿舍号</option>";
         		for (var i = 0; i < data.res.data.length; i++) {
         		    dormitory_number_html = dormitory_number_html+ " <option value='"+data.res.data[i].id+"'>"+data.res.data[i].dormitory_number+"</option>"
         		}
         		$('#dormitory_number').html(dormitory_number_html);
         	}
         },
         error: function (XMLHttpRequest) {
         	console.log("访问失败！");
         	console.log(XMLHttpRequest);
         	toastr["error"]("访问失败,请联系开发人员!");
         }
     });
     
	})
     $('#edit_building_number').change(function() {
	    console.log($(this).val());
	    building_number = $(this).val();
	    if (building_number==""){
	    	$('#edit_dormitory_number').html('');
	    	return;
	    }
	    $.ajax({ 
        url: urlip+"dormitory/select",
        type: 'POST', 
        xhrFields: {
		   		withCredentials: true
			},   
        data: {
        	token:access_token,
        	building_number:building_number,
        },
        dataType: 'JSON',
        success: function (data) { 
         	console.log(data);
         	var counts='';
         	if(data.code==0){
         	 
         		var dormitory_number_html="<option value=''>请选择宿舍号</option>";
         		for (var i = 0; i < data.res.data.length; i++) {
         		    dormitory_number_html = dormitory_number_html+ " <option value='"+data.res.data[i].id+"'>"+data.res.data[i].dormitory_number+"</option>"
         		}
         		$('#edit_dormitory_number').html(dormitory_number_html);
         	}
         },
         error: function (XMLHttpRequest) {
         	console.log("访问失败！");
         	console.log(XMLHttpRequest);
         	toastr["error"]("访问失败,请联系开发人员!");
         }
     });
     
	})
     
     
        
    
    
    
    students_search("0","0");//查询信息 
    //首次访问 
    function students_search(name,id){ 
        var url=urlip+"title/select"; 
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
         	if(data.code==0){
         		for (var i = 0; i < data.res.data.length; i++) {
         		 
                	counts = counts + " <tr>\n" + 
				                	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +  
                                    "                                <td>"+data.res.data[i].paper_headline+"</td>\n" + 
                                    
								    "                                <td >"+timestampToTime2(data.res.data[i].add_time)+"</td>\n" +
                                   
                                     "                               <td  class='display_admin_delete disabled_admin'>\n" +
//                                   "                                    <a href=\"javascript:void(0)\" style=\"color:blue;\" class=\"btn btn-info  btn-lg disabled_admin theme-compile\" >\n" +
//                                   "                                        <span class=\"glyphicon glyphicon-edit\"></span> 编辑\n" +
//                                   "                                    </a>\n" +
                                     "                                    <a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg disabled_admin edition_delect\" >\n" +
                                     "                                        <span class=\"glyphicon glyphicon-trash \"></span> 删除\n" +
                                     "                                    </a></td>\n" +
                                    "   </tr>";
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
			         			counts = counts + " <tr>\n" + 
				                	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +  
                                    "                                <td>"+data.res.data[i].paper_headline+"</td>\n" + 
                                    
								    "                                <td >"+timestampToTime2(data.res.data[i].add_time)+"</td>\n" +
                                   
                                     "                               <td  class='display_admin_delete disabled_admin'>\n" +
//                                   "                                    <a href=\"javascript:void(0)\" style=\"color:blue;\" class=\"btn btn-info  btn-lg disabled_admin theme-compile\" >\n" +
//                                   "                                        <span class=\"glyphicon glyphicon-edit\"></span> 编辑\n" +
//                                   "                                    </a>\n" +
                                     "                                    <a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg disabled_admin edition_delect\" >\n" +
                                     "                                        <span class=\"glyphicon glyphicon-trash \"></span> 删除\n" +
                                     "                                    </a></td>\n" +
                                    "   </tr>";
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
    $(document).on('click','.edition_delect', function() {
        // 唯一的ID
        var tr0=$(this).parent().parent().children().eq(0).text();
        $("#delete_id").val(tr0);
		$('#delect_id').fadeIn(100);
		$('#delect').slideDown(200);
	}); 
	
	
	
	// 确定删除
    $('#delect_value').click(function(){ 
        //通过用户唯一的ID删除
        var delete_id=$("#delete_id").val();
 		var kid="#"+delete_id; 
        $.ajax({
            url: urlip+"title/delete",
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
	
	// 打开编辑用户信息
	    $(document).on('click', '.theme-compile', function() { 
			var tr0=$(this).parent().parent().children().eq(0).text();//id
			var tr1=$(this).parent().parent().children().eq(1).text(); 
			var tr2=$(this).parent().parent().children().eq(2).text();  
			var tr3=$(this).parent().parent().children().eq(3).text(); 
			var tr4=$(this).parent().parent().children().eq(4).text(); 
			var tr5=$(this).parent().parent().children().eq(5).text();  
			var tr6=$(this).parent().parent().children().eq(6).text();  
			
			var tr7=$(this).parent().parent().children().eq(7).text();  
			
			$("#edit_pkid").val(tr0);
			$("#edit_students_name").val(tr1);
	        $("#edit_students_number").val(tr2); 
	        $("#edit_academy").val(tr3);
	        $("#edit_major").val(tr4); 
	        $("#edit_students_telephone").val(tr5);
	        $('#edit_building_number').val(tr6)
	        building_number = tr6;
	        $.ajax({ 
		        url: urlip+"dormitory/select",
		        type: 'POST', 
		        xhrFields: {
				   		withCredentials: true
					},   
		        data: {
		        	token:access_token,
		        	building_number:building_number,
		        },
		        dataType: 'JSON',
		        success: function (data) { 
		         	console.log(data);
		         	var counts='';
		         	if(data.code==0){
		         	 
		         		var dormitory_number_html="<option value=''>请选择宿舍号</option>";
		         		for (var i = 0; i < data.res.data.length; i++) {
		         		    dormitory_number_html = dormitory_number_html+ " <option value='"+data.res.data[i].id+"'>"+data.res.data[i].dormitory_number+"</option>"
		         		}
		         		$('#edit_dormitory_number').html(dormitory_number_html);
		         		$('#edit_dormitory_number').val(tr7)
		         	}
		         },
		         error: function (XMLHttpRequest) {
		         	console.log("访问失败！");
		         	console.log(XMLHttpRequest);
		         	toastr["error"]("访问失败,请联系开发人员!");
		         }
		     });
	        
	        $('#edit_id').fadeIn(100);
			$('#edit').slideDown(200);
		});  
		 
		 
		// 确定修改用户信息
	    $('#edit_value').click(function(){
	        var edit_pkid=$("#edit_pkid").val();  
	        
	        var edit_students_name = $('input[name="edit_students_name"]').val();
			var edit_students_number = $('input[name="edit_students_number"]').val();
			var edit_academy = $('input[name="edit_academy"]').val();
			var edit_major = $('input[name="edit_major"]').val();
			var edit_students_telephone = $('input[name="edit_students_telephone"]').val();
			var edit_building_number = $('#edit_building_number').val();
			var edit_dormitory_number = $('#edit_dormitory_number').val();
	        
	       	var tr_status=$("#tr_status").val();
	        $.ajax({
	            url: urlip+"students/modify",
	            type: "post",
	            dataType:"JSON",
	            xhrFields: {
			   		withCredentials: true
				},  
	            data: {    
	               token:access_token,
	               id:edit_pkid,
	               edit_students_name:edit_students_name,
	               edit_students_number:edit_students_number,
	               edit_academy:edit_academy,
	               edit_major:edit_major,
	               edit_students_telephone:edit_students_telephone,
	               edit_dormitory_number:edit_dormitory_number,
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
	        $(edit_pkid).parent().children().eq(1).html(edit_students_name); 
        	$(edit_pkid).parent().children().eq(2).html(edit_students_number); 
        	$(edit_pkid).parent().children().eq(3).html(edit_academy); 
	        $(edit_pkid).parent().children().eq(4).html(edit_major); 
	        $(edit_pkid).parent().children().eq(5).html(edit_students_telephone); 
	        $(edit_pkid).parent().children().eq(6).html(edit_building_number); 
	        $(edit_pkid).parent().children().eq(7).html($('#edit_dormitory_number').find("option:selected").text()); 
	       
	       	$('#edit_id').fadeOut(100);
			$('#edit').slideUp(200);
		}); 
	
	// 保存
    $(document).on('click', '#_add', function() {
		var students_name = $('input[name="title"]').val();
		 
    	var access_token=$.cookie("access_token");
    	
        $.ajax({
            url: urlip+"title/add",
            type: "get",
            dataType: "JSON",
            data: {
            	'token':access_token,
            	'title':students_name,
            },
            success: function (data) {
                if(data.code==0){
                	console.log(data)
		    		toastr["success"]("成功！");
		    		students_search("0","0");//查询信息 
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