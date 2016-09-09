$(function(){
     $.focus=function( id ){
		 //取出层的宽度
		 var sWidth=$(id).width();
		 //取出li的个数  ->  生成数字按钮
		 var len=$(id).find("ul li").length;
		 //图片的索引
		 var index=0;
		 //定时器名
		 var picTimer;
		 
		 
		 //添加数字按钮
		 var btn="<div class='btnBg'></div><div class='btn'>";
		 for(var i=0;i<len;i++){
		     var ii=i+1;
			 btn+="<span>"+ii+"</span>";
		 }
		 btn+="</div><div class='preNext pre'></div><div class='preNext next'></div>";
		 $(id).append( btn );
		 
		 $(id).find("div.preNext").css("opacity",0.3);
		 //.mouseenter:当鼠标指针穿过被选元素时，才会触发处理函数      mouseenter（[data],fn）
		 $(id+" div.btn span").css("opacity",0.3).mouseenter(function(){
		      index=$(id+" div.btn span").index(this);
			 //显示这张图
			 showPic( index );
		 }).eq(0)   //选到索引值为0的，第一张图片
		   //.css("opacity",1)     //鼠标不放上面时，第一个高亮显示，两种写法都可以，下面的和这个一样的效果
		   .trigger("mouseenter");    //激活mouseenter
		   
		   
		   //控制上下页   鼠标放上，移开时的外观
		   $(id+" .preNext").hover(function(){
			      $(this).stop(true,false).animate({"opacity":0.7},200);
			},function(){
				  $(this).stop(true,false).animate({"opacity":0.2},200); 
		    });
		   
		   
		   //控制上下页的点击
		   $(id+" .next").click(function(){
			     index++;
				 if(index==len){
			        index=0;
				 }   
				 showPic(index);
			});
		   
		   $(id+" .pre").click(function(){
		         index--;
				 if(index==-1){    //当索引为-1时，它会是最后一张
				    index=len-1;  
				 }
				 showPic(index);
		   });
		   
		   
		   //控制定时器，当鼠标移到div时，图片定时器停止，鼠标移开时，定时器启动
		   $(id).hover(function(){
			      clearInterval(picTimer);     //当鼠标移上去时，清除定时器
			},function(){
				  picTimer=setInterval(function(){   //当鼠标移开时，设置定时器
				      showPic(index);
					  index++;
					  if( index==len ){
						  index=0;
					  }
				  },1000);      //隔1秒调用一次
			});
		   
		 
		 //定义一个私有函数，   showPic就能访问到   sWith
		 function showPic(index){
		     //要偏移的距离
			 var nowLeft=-index*sWidth;        //sWith: 800px正好是一张图片的宽度
			 $(id+" ul").stop( true,false ).animate( {"left":nowLeft},300 );    //stop停止所有在指针元素上正在运行的动画   stop（[clearQueue],[jumpToEnd]）
			 //数字按钮上改样式
			 $(id+" .btn span").stop(true,false).animate({"opacity":0.4},300)
			        .eq(index).stop(true,false).animate({"opacity":1},300);
		 }
	 };
});