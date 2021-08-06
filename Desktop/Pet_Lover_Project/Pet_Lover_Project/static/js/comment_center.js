$(function () {
    email();//查询信息
    //首次访问
    function email(){
        var url="http://127.0.0.1:800/student/comment_query";

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
        	line:line
        },
        dataType: 'JSON',
        success: function (data) {
         	console.log(data.res.data[0]);
         	var counts='';
         	if(data.code==0){
                    $("#Comment_content").html('');
                    var html = '';
                    for (var i = 0; i < data.res.data.length; i ++) {
                        html += '<li >' +'</li>';
                    }

                    $("#Comment_content").append(html);
                    var lilist=$("#Comment_content li");//获取ID为div里面的所有img

                    for(var i=0;i<data.res.data.length;i++){ //循环为每个img设置
                        user_comment = data.res.data[i].user_comment;
                        lilist.eq(i).text(user_comment);
                    }
                    toastr["success"]("success！");
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
    $('#Comment_Btn').click(function(){
        var tet= document.getElementById("text").value;
        console.log(tet);
        var url="http://127.0.0.1:800/student/comment_update";
        $.ajax({
            url: url,
            type: "get",
            dataType:"JSON",
            data: {
                'user_name':'admin',
                'user_comment': tet,
            },
            xhrFields: {
		   		withCredentials: true
			},
            success: function (data)
            {
                window.location.reload();
                console.log('success');
            },
            error:function (XMLHttpRequest) {
                console.log("delete success！");
                toastr["error"](XMLHttpRequest);
            }
        });
	});
});