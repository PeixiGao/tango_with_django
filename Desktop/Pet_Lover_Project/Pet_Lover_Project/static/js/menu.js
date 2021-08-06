$(function () {
    $(document).on('shown.bs.collapse', "#collapseA", function () {//显示
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_user_s.png\" style=\" margin-left: 10px;\">");
        $(this).parent().children().eq(0).css("background-color", "#0a56c5").css("color", "white");
        $(this).parent().children().eq(0).children().eq(1).css({"color": "white"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_shrink.png\" style=\"margin-right: 10px;margin-top: 8px;\">");
    });
    $(document).on('hidden.bs.collapse', "#collapseA", function () {//隐藏
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_user_n.png\" style=\" margin-left: 10px; \">");
        $(this).parent().children().eq(0).css({"background-color": "#e5eeff"});
        $(this).parent().children().eq(0).children().eq(1).css({"color": "black"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_unfold.png\" style=\"margin-right: 10px;margin-top: 8px;\">");
    });

    $(document).on('shown.bs.collapse', '#collapseB', function () {//显示
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_equipment_s.png\" style=\" margin-left: 10px;\">");
        $(this).parent().children().eq(0).css("background-color", "#0a56c5").css("color", "white");
        $(this).parent().children().eq(0).children().eq(1).css({"color": "white"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_shrink.png\" class=\"collapse_hao\">");
    });
    $(document).on('hidden.bs.collapse', '#collapseB', function () {//隐藏
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_equipment_n.png\" style=\" margin-left: 10px;\">");
        $(this).parent().children().eq(0).css({"background-color": "#e5eeff"});
        $(this).parent().children().eq(0).children().eq(1).css({"color": "black"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_unfold.png\" class=\"collapse_hao\">");
    });
    
    $(document).on('shown.bs.collapse', '#collapseC', function () {//显示
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_versions_s.png\" style=\" margin-left: 10px; \">");
        $(this).parent().children().eq(0).css("background-color", "#0a56c5").css("color", "white");
        $(this).parent().children().eq(0).children().eq(1).css({"color": "white"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_shrink.png\" class=\"collapse_hao\">");
    });
    $(document).on('hidden.bs.collapse', '#collapseC', function () {//隐藏
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_versions_n.png\" style=\" margin-left: 10px; \">");
        $(this).parent().children().eq(0).css({"background-color": "#e5eeff"});
        $(this).parent().children().eq(0).children().eq(1).css({"color": "black"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_unfold.png\" class=\"collapse_hao\">");
    });
    $(document).on('shown.bs.collapse', '#collapseD', function () {//显示
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_help_s.png\" style=\" margin-left: 10px; \">");
        $(this).parent().children().eq(0).css("background-color", "#0a56c5").css("color", "white");
        $(this).parent().children().eq(0).children().eq(1).css({"color": "white"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_shrink.png\" class=\"collapse_hao\">");
    });
    $(document).on('hidden.bs.collapse', '#collapseE', function () {//隐藏
        // 执行一些动作...
        $(this).parent().children().eq(0).children().eq(0).html("<img src=\"../images/main/icon_help_n.png\" style=\" margin-left: 10px; \">");
        $(this).parent().children().eq(0).css({"background-color": "#e5eeff"});
        $(this).parent().children().eq(0).children().eq(1).css({"color": "black"});
        $(this).parent().children().eq(0).children("a:last-child").html("<img src=\"../images/main/icon_unfold.png\" class=\"collapse_hao\">");
    }); 
    
	$(document).on('click', '#close_exit_id', function () {//隐藏
        // 执行一些动作...  
        logout();
    }); 
});
function logout(){
 
   try {
       window.opener = window;
       var win = window.open("","_self");
       win.close();
       //frame的时候
       top.close();
   } catch (e) {

   } 
}
 