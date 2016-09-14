// JavaScript Document

/**

*@params flakeChar: 图标
*@params minSize: 最少数量
*@params maxSize: 最多数量
*@params newOn: 新图标出现的频率
*@params flakeColor: 颜色

*/


;(function(w,d,$){
	$.fn.showPic=function(options){
		var defaults={
			flakeChar:"&#10052;",
			minSize:10,
			maxSize:200,
			newOw:100,
			flakeColor:['#fff','blue','green']
		};
		$.extend(defaults,options);
		
		//生成一个节点，用于存这个图标
		var $flake=$("<div></div>").css({"position":"absolute","top":"-50px"} );
		
		//设置出现的位置
		//1.页面多大
		var documentHeight=$(d).height();
		
		var randomHeight=documentHeight-Math.ceil(Math.random()*100+10);
		var documentWidth=$(d).width();
		
		$flake.html(defaults.flakeChar);
		var colors=defaults.flakeColor;
		$flake.css({"color":colors[0]});
		
		//定时器操作
		//启动定时器
		setInterval(function(){
			
			//计算起始的位置
			var size=Math.ceil(Math.random()*30)+10;
			var x=Math.ceil(Math.random()* documentWidth); //left的距离
			$flake.css({"left":x});
			$flake.css({"fontSize":size});
			//克隆div
			var flakeClone=$flake.clone();
			$("body").append(flakeClone);
			
			
			//通过animate设置  flake的动画 （坐标，透明度，大小）
			function animateTop(obj){
				//obj.css({"MozTransform":"rotate(1380deg)"})
				obj.animate({ "top":randomHeight+100,opacity:0},10000); 	
				
			}
			var mydiv=$("body").find("div");
			//alert(mydiv.length)
			mydiv.each(function(index, element) {
				 animateTop($(element));
				
            });
		},1100);
		
	};
})(window,document,$)


