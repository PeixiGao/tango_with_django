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
       access_token=$.cookie("access_token");
	 	console.log(access_token); 
       $.ajax({
       	
            url: urlip+"video/select_tu",
            type: "get",
            dataType: "JSON",
            data: {
            	token:access_token
            },
            success: function (data) {
                if(data.code==0){
                	console.log(data)
                	var points_all='';
                	 
                	$.each(data.res.data,function(index,element){
                		if(index==0){//判断最大的那个数值为默认选中的显示
					   			points_all=points_all+"{'name': '"+index+"', 'y': "+element+", 'sliced': true,   'selected': true },"
					   		}else{   
					   			points_all=points_all+"['"+index+"', "+element+"],";
					   		} 
                	});
                	points_all=points_all.substr(0, points_all.length-1); 
					points_all="["+points_all+"]"; 
					points_all=points_all.replace(/'/g, '"');
//					console.log(points_all);
					points_all=JSON.parse(points_all); 
					pie_chart(points_all);
//		    		toastr["success"]("提交成功！");
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
       
       
       
       
       
       
       //饼状图初始化  
	function pie_chart(points_all){ 
		    console.log(points_all);
	 	    chart = new Highcharts.Chart({  
            chart: {  
                renderTo: 'container3',  
                plotBackgroundColor: null,  
                plotBorderWidth: null,  
                plotShadow: false  
            },  
            title: {  
                text: '最近三年毕设选题扇形图分析'  
            },  
            tooltip: {  
                formatter: function () {   
                    return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';  
                    
                }  
            },  
            plotOptions: {  
                pie: {  
                    allowPointSelect: true,  
                    cursor: 'pointer',  
                    dataLabels: {  
                        enabled: true,  
                        color: '#000000',  
                        connectorColor: '#000000',  
                        formatter: function () {  
                            return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' % ' ;  
                        }  
                    }  
                }  
            },  
            series:  [{  
                type: 'pie',  
                name: 'pie',  
                data:  points_all
            }]  
        }); 
        $(".highcharts-credits").hide();
	}
      
       
 
});