$(function () {
    email();//查询信息
    //首次访问
    function email(){
        var url="http://127.0.0.1:800/student/query";
	 	access_token="";
	 	console.log(access_token);
        $.ajax({
        url: url,
        type: 'POST',
        xhrFields: {
		   		withCredentials: true
			},
        data: {
        	page:1,
        	line:line,
            'type':'cat'

        },
        dataType: 'JSON',
        success: function (data) {
         	console.log(data.res.data[0]);
         	var counts='';
         	if(data.code==0){
                // var data = ["a", "b", "c", "d"];
                var html = '';
                var test_p = "images/AmericanBobtail_body_6.jpg"
                for (var i = 0; i < data.res.data.length; i ++) {
                    html += '<div class="u-border-2 u-border-grey-75 u-container-style u-list-item u-repeater-item u-white u-list-item-1">' +
                            '<div class="u-container-layout u-similar-container u-container-layout-1">'+
                           '<img class="u-image u-image-default u-image-1" src="" alt="" data-image-width="360" data-image-height="359">'+

                            '<p class="u-align-center u-large-text u-text u-text-default u-text-variant u-text-1" style="width: 300px;word-break: break-all;">American Bobtail Cat</p>'+
                            '<a class="u-align-center u-large-text u-text u-text-default u-text-variant u-text-1" style="width: 200px;"></a>'+
                            '</div>'+
                            '</div>';
                }

                $("#pet_item").append(html);
                var imglist=$("#pet_item img");//获取ID为div里面的所有img
                var spanlist=$("#pet_item a");//获取ID为div里面的所有img
                var plist=$("#pet_item p");//获取ID为div里面的所有img

                for(var i=0;i<data.res.data.length;i++){ //循环为每个img设置
                    img1 = data.res.data[i].dogsimg
                    name1 = data.res.data[i].dogsname
                    pdesc = data.res.data[i].dogsdesc

                    imglist.eq(i).attr("src",img1);
                    spanlist.eq(i).text(name1);
                    plist.eq(i).text(pdesc);



                }
                //  for (var i = 0; i < data.length; i ++) {
                //     $("#pet_item img:"+"nth-child(1)").attr("src", "images/AmericanBobtail_body_6.jpg");
                // }



        	// $('#total_num').html(data.res.count);
        	$('#total_num').html(0);
         	toastr["success"]("success！");
     		// if (data.res.count%line==0){
     		// 	totalPages = data.res.count/line;
     		// }else{
     		// 	totalPages = data.res.count/line+1
     		// }
            // $('#pageLimit').bootstrapPaginator({
            //      currentPage: 1,//当前的请求页面。
            //      // totalPages: totalPages,//一共多少页。
            //      totalPages: 1,//一共多少页。
            //      size: "normal",//应该是页眉的大小。
            //      bootstrapMajorVersion: 3,//bootstrap的版本要求。
            //      alignment: "right",
            //      numberOfPages: 7,//一页列出多少数据。
            //      itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
            //          switch (type) {
            //              case "first":
            //                  return "首页";
            //              case "prev":
            //                  return "上一页";
            //              case "next":
            //                  return "下一页";
            //              case "last":
            //                  return "末页";
            //              case "page":
            //                  return page;
            //          }
            //      },
            //      onPageClicked: function (event, originalEvent, type, page) {//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
            //         $.ajax({
            //             url: url,
            //             type: 'POST',
            //             data: {
				//         	token:access_token,
				//         	page:page,
				//         	line:line
				//         },
            //              dataType: 'JSON',
            //              success: function (data) {
            //              	console.log(data);
            //              	var counts='';
            //              	if(data.code==0){
				//          		for (var i = 0; i < data.res.data.length; i++) {
            //     			counts = counts + " <tr>\n" +
				//                 	"                                <td id='"+data.res.data[i].id+"'>"+data.res.data[i].id+"</td>\n" +
				// 				    "                                <td >"+data.res.data[i].username+"</td>\n" +
				// 				    "                                <td >"+data.res.data[i].name+"</td>\n" +
				// 				    "                                <td >"+timestampToTime2(data.res.data[i].login_time)+"</td>\n" +
            //                         "                                <td>\n" +
            //                         "                                    <a href=\"javascript:void(0)\" style=\"color:red;\" class=\"btn btn-info btn-lg email_delect\" >\n" +
            //                         "                                        <span class=\"glyphicon glyphicon-trash \"></span> 删除\n" +
            //                         "                                    </a>\n" +
            //                         "                                </td>\n" +
            //                         "                            </tr>";
            // }
				//             $('tbody').html("");
				//             $('tbody').append(counts);
				//             }else{
				//             	console.log(JSON.stringify(data));
				//             }
            //             },
            //             error: function (XMLHttpRequest) {
 			// 				console.log("访问失败！");
            //     			console.log(XMLHttpRequest);
         	// 				toastr["error"]("访问失败,请联系开发人员!");
            //             }
            //          })
            //      }
            //  });
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

    $('#search_button').click(function(){
        var search_input =$("#search_input").val();
        var url="http://127.0.0.1:800/student/search";
        $.ajax({
            url: url,
            type: "get",
            dataType:"JSON",
            data: {
                'search':search_input,
                'type':'cat',
                'token':access_token,
                'page':1,
        	    'line':line
            },
            xhrFields: {
		   		withCredentials: true
			},
            success: function (data)
            {
                if(data.code==0){
                    $("#pet_item").html('');
                    var html = '';
                    for (var i = 0; i < data.res.data.length; i ++) {
                        html += '<div class="u-border-2 u-border-grey-75 u-container-style u-list-item u-repeater-item u-white u-list-item-1">' +
                                '<div class="u-container-layout u-similar-container u-container-layout-1">'+
                               '<img class="u-image u-image-default u-image-1" src="" alt="" data-image-width="360" data-image-height="359">'+

                                '<p class="u-align-center u-large-text u-text u-text-default u-text-variant u-text-1" style="width: 300px;word-break: break-all;">American Bobtail Cat</p>'+
                                '<a class="u-align-center u-large-text u-text u-text-default u-text-variant u-text-1" style="width: 200px;"></a>'+
                                '</div>'+
                                '</div>';
                    }

                    $("#pet_item").append(html);
                    var imglist=$("#pet_item img");//获取ID为div里面的所有img
                    var spanlist=$("#pet_item a");//获取ID为div里面的所有img
                    var plist=$("#pet_item p");//获取ID为div里面的所有img

                    for(var i=0;i<data.res.data.length;i++){ //循环为每个img设置
                    img1 = data.res.data[i].dogsimg
                    name1 = data.res.data[i].dogsname
                    pdesc = data.res.data[i].dogsdesc

                    imglist.eq(i).attr("src",img1);
                    spanlist.eq(i).text(name1);
                    plist.eq(i).text(pdesc);



                    }

                    $('#total_num').html(0);
                    toastr["success"]("success！");
                 }else{
                    console.log(JSON.stringify(data));
                 }
            },
            error:function (XMLHttpRequest) {
                console.log("删除失败！");
                toastr["error"](XMLHttpRequest);
            }
        });
	});
});