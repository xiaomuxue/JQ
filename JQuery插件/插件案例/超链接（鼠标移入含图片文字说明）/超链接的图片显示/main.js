;(function(w,d,u,$){//把window,document,undfined,jQuery作为采纳数传进来，  在内部查找w,d,u,$ 比全局变量window,document,undefined,jQuery要快
	$.fn.linkWithPic=function(){
		$(this).hover(function(e){
			//title的获取
			var title=$(this).attr("title") || "&nbsp;";
			//或者 在一开始就  取title的值，如果undifined  则赋值为&nbsp;
			//添加一个层
			$("body").append("<div id='screenshot'><img src='"+$(this).attr("rel")+"' /></div>");
			//判断如果有title 为空  或者  temp为空   或者一开始就没有title  都不加换行符        那么这里不需要判断了
			if( $(this).attr("title")=="&nbsp;"  || $(this).attr("temp")=="&nbsp;"  || !$(this).attr("title") ){
				$("#screenshot").append(title);
			}else{//  否则  则加一个换行符
				$("#screenshot").append("<br />"+title);
			}
			$("#screenshot").css({
				"display":"block",
				"top":( e.pageY+20 )+"px",
				"left":( e.pageX+20 )+"px"
			});
			$(this).attr("temp",title).removeAttr("title");
			
		},function(){
			var title=$(this).attr("temp");
			$(this).attr("title",title).removeAttr("temp");
			$("#screenshot").remove();
		});
		
		$(this).mousemove(function(e){
			$("#screenshot").css({
				"display":"block",
				"top":( e.pageY+20 )+"px",
				"left":( e.pageX+20 )+"px"
			});
		});
	}
})(window,document,undefined,jQuery);



















