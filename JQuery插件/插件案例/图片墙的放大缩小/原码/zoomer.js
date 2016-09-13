;(function( w,d,u,$ ){
    $.fn.Zommer=function(params){
		var defaults={
		    speedView:200,
			speedRemove:200,
			altText:true,
			speedText:200
		}
		
	   params=$.extend({},defaults,params);
	   
	   $(this).hover(function(){
		     $(this).find("img").css("z-index",100);
			 $(this).find("img").stop().animate({
			      width:'200px',
				  height:'200px',
				  left:'-50px',
				  top:'-50px'
			 },params.speedView);
			 
			 if( params.altText ){
			     var altText=$(this).find("img").attr("alt");
				 $(this).prepend("<span class='title'>"+altText+"</span>");
				 $(".title").animate({
				     marginLeft:'-42px',
					 marginTop:'108px'
				 },params.speedText).css({
				     "z-index":101,
					 "position":'absolute'
				 });
			 }
			 
		},function(){
		     $(this).find("img").css("z-index",0);
			 $(this).find("img").stop().animate({
			      width:'100px',
				  height:'100px',
				  top:'0px',
				  left:'0px'
			 },params.speedRemove);
			 $(this).find(".title").remove();
		});
	}
})( window,document,undefined,$ );