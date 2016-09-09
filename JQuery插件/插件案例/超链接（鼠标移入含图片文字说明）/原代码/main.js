;(function( w,d,u,$ ){
     $.fn.linkWithPic=function(){
		   var temp;     //定义一个临时变量
	      $("p a.screenshot").hover(function(){
			 
			  //title文字的获取
		      var title=$(this).attr("title") || '&nbsp;';     //a标签里面有title属性就取，没有就取空
			  $(this).attr("temp",title).removeAttr("title");  //把title保存到临时变量里面去，移除掉以前的title
			  var Pic=$(this).attr("rel");
			  
			  //添加一个层
			  var odiv="<div id='screenshot'><pre>"+title;
			  //加入图片，加入文字
			  odiv+='<ul><li><img src="'+Pic+'" />';
			  odiv+="</li></ul></pre></div>";
			  $(this).append( odiv );
			  //取出鼠标的位置，加一个偏移
			  $("#screenshot pre").css({"width":"240px","color":"#000"});
			  $("#screenshot pre ul li img").css({"margin-left":"-6px"});
			  
			  //再设置层的位置
			  $("#screenshot").css({"display":"block","width":"260px","left":"300px"});
			    
		  },function(){
		      var title=$(this).attr("temp");
			  $(this).attr("title",title).removeAttr("temp");
			  
			  //移除层
			  $("#screenshot").remove();
			  
			  $("#screenshot").css("display","none");
		  });
	 }
})(window,document,undefined,$);