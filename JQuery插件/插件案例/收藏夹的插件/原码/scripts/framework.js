$(document).ready(function(){
    //第一步给超链接绑定点击事件
	$("#container #filter li a").click(function(){   
	     //更改样式    这里一定的注意 a 往上一级找li,只能找到一个，所以得再往上一级找ul,对ul找它所有的li,然后移除它的类
		 $(this).parent().parent().find("li").removeClass("current");
		 $(this).parent().addClass("current");
		 //先取到它的文本，把它的文本先全部转为小写，并且有空格的就用-代替
		 var filterclass=$(this).text().toLowerCase().replace(" ","-");
		 
		 if( filterclass=='all' ){
		    $("ul#portfolio li").fadeIn("slow");
		 }else{
			 $("ul#portfolio li").each(function(index,element){
				 if( $(element).hasClass(filterclass) ){
					 $(element).fadeIn("slow");
				 }else{
					 $(element).fadeOut("slow");
				 }
			});
		 }
	});
});