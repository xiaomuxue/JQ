 /* $(function(){
			$('li').mouseover(function(){
				$(this).addClass('scroll_number_over');
				$('#dd_scroll').attr('src','images/dd_scroll_'+( $(this).text() )+'.jpg')
			})
				.mouseout(function(){
					$(this).removeClass('scroll_number_over');
				})
  });     //不是和完整的方案；
  */
  
  
  //完整方案一：
  var index=0;    //定义一个索引值
  var myinterval;
  
  function show( id ){   //要做一个判断，判断html里面是否有传参
     //完成轮换显示的效果。。。。。
	 if( Number(id) ){
		 index=id;    //传了参，就直接用参数
		 clearInterval(myinterval);   //清除定时器
	 //index:0 1 2 3 4 5 6 7 8 9 10....
	 //      1 2 3 4 5 6
	 }else{      
	    index=index%6+1;    //当没有传参时，就计算它的索引值，索引值根据图片的下标来变
	 }
	 var $picname="images/dd_scroll_"+index+".jpg";       //取出图片路径
	 //修改图片
	 $("#dd_scroll").attr("src",$picname);
	 //先将所有的li加入 out
	 $("#scroll_number>li").attr("class","scroll_number_out");     //添加一个样式
	 //再将其中的下标   ，查找某一个子元素可以用 >  找
	 $("#scroll_number>li").eq(index-1).addClass("scroll_number_over");     
	 
  }
  
  
  function start(){    //开始时，调用一下定时器，当鼠标移出时，就可以通过定时器再调用show（）函数
      myinterval=setInterval("show()",1000); 
  }
  myinterval=setInterval("show()",1000);       //定时器规定几秒调用一次