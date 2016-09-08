
$(function(){
    Total();    //加载页面时，就使它调用一次计算价格的
	
});


//方法一：显示或隐藏
//根据您挑选的商品，当当为您推荐下面一块的隐藏和显示  （点击事件）
/*function shopping_commend_show(){
	var $self=$("#shopping_commend_sort");     //获取到要隐藏部分的ID
	if( $self.css("display")=="none"){         //判断样式属性  display是否为 none
	    $self.css("display","block");
	    $("#shopping_commend_arrow").attr("src","images/shopping_arrow_up.gif");   //更改小图标
	}else{
	    $self.css("display","none");
	    $("#shopping_commend_arrow").attr("src","images/shopping_arrow_down.gif");
	}
}*/



//方法二：显示或隐藏
function shopping_commend_show(){
   /*$("#shopping_commend_sort").toggle(      //toggle只支持1.9以下的版本
        function(){
	      $("#shopping_commend_arrow").attr("src","images/shopping_arrow_up.gif");
	   },function(){
	       $("#shopping_commend_arrow").attr("src","images/shopping_arrow_down.gif");
	   });*/       //JQuery版本号不支持，所以导致有bug,这个不行

    var $sort=$("#shopping_commend_sort");
	var $arrow=$("#shopping_commend_arrow");
	
	$sort.toggle();     //这里还是可以使用toggle的，上下各一次
	if( $sort.css("display")=="none"){     //如果是隐藏的，就显示向下的图片
	    $arrow.attr("src","images/shopping_arrow_down.gif");
	}else{         //否则，显示时就显示向上的小图标
	    $arrow.attr("src","images/shopping_arrow_up.gif"); 
	}
}     


//购买的添加
function buyProduct( Unm ){     //Unm传入的值
	//取出表格
    var $table=$("#myTableProduct");     //找到表格
	
	var $ul=$("#"+Unm);     //获取到ul的ID值
	var flag=-1;           //定义一个flag,用来判断table里面是否已经有要购买的物品
	var $pname=$ul.find("li:eq(0) a").html();      //选定的商品名
	var $trs=$table.find("tr");        //获取到table里面所有的 tr 
	for(var i=0;i<$trs.length;i++){     //循环每一个tr
	    if( $($trs[i]).find("td a").html()==$pname ){    //把每个tr td a的文本和购买里面的物品名进行匹配
		    flag=i;         //若是匹配到了，就使用现有的i,跳出
			break;
		}
	}
	if( flag==-1 ){
	    addTr($table,$ul);     //如果之前没有，则插入到table 表格里面去
	}else{
	    updataNum(flag);      //当已经添加进去时，更新input里面的value值
	}
	Total();       //计算一次总价
	
}

function updataNum(index){
	//获取input里面的值，并且把它转换为数值来用
    var $Num=parseInt($("#myTableProduct tr:eq("+index+")").find("td:eq(4) input").val());	
	$("#myTableProduct tr:eq("+index+")").find("td:eq(4) input").val( $Num+1 );      //更改里面的数值，在原有的基础上加一
}

//增加新行，传两个参进去	
function addTr( $table,$ul ){   
	var $pname=$ul.find("li:eq(0) a").html();      //选定的商品名
    var $pir=$ul.find("li:eq(1)").html().substring(1);//获取商品价格，  使用.substring(1)是为了截取掉前面的特殊符￥
	var $ddpir=$ul.find("li:eq(2)").html().substring(1);  ////获取当当价格，  使用.substring(1)是为了截取掉前面的特殊符￥
	
	var $newId=parseInt($table.find("tr:last").attr("id").split("_")[1])+1;      //查找到表格ID
	
	var newtr=$table.find("tr:last").clone();    //克隆表格的最后一行，这样有一个缺点：要是表格里面没有值，那就会出错
	
	$(newtr).attr("id","shoppingProduct_0"+$newId);     //更改这一行的属性id值
	$(newtr).find("td:eq(0)").html("<a href='#' class='blue'>"+$pname+"</a>");    //商品名更改为购买加进去的商品名
	$(newtr).find("td:eq(1) label").html( ($ddpir*10).toFixed(0) );  //可获积分更改为购买进去的可获积分
	$(newtr).find("td:eq(2) label").html( $pir );         //市场价更改为购买进去的市场价
	$(newtr).find("td:eq(3)").html( "<label>"+$ddpir+"</label>("+($ddpir/$pir*100).toFixed(0)+"折)" );
	$(newtr).find("td:eq(4) input").val( 1 );
	$(newtr).find("td:eq(4)").attr("href","javascript:deleteProduct('shoppingProduct_0'"+$newId+")");
	
	$table.prepend( newtr );    //把新的行添加到表格后面
	
}



//方法一：
/*function Total(){       //计算商品金额总计、 节省金额、 可获商品积分
    var $List_2=$(".shopping_product_list_2").children();      //获取到积分label
	var $List_3=$(".shopping_product_list_3").children();      //获取到市场价label
	var $List_4=$(".shopping_product_list_4").children();      //获取到当当价label

	var $Total=$("#product_total");    //获取到商品金额总计的节点ID
	var $Save=$("#product_save");      //获取到商品节省金额的节点ID
	var $Integ=$("#product_integral");  //获取到可获商品积分的节点ID
	
	var Allmoney=0;     //定义一个商品金额总计，开始为0
	var Allmark=0;      //定义一个商品市场价总金额，开始为0
	var Allinteg=0;     //定义一个可获商品积分，开始为0
	
	var TotalSave=0;    //定义一个商品节省金额的总数
	
	for(var i=0;i<$List_4.length;i++){
	   var $Value=document.getElementsByTagName("input")[i].value;    //获取input里面的属性value的值	
	   Allmoney+=$List_4[i].innerText*$Value;      //计算出商品金额总计，单价*多少件
	   Allsave+=$List_3[i].innerText*$Value;
	   Allinteg+=($List_2[i].innerText*$Value);
	   TotalSave=Allsave-Allmoney;       //计算出可节省金额，市场总价-商品金额总计
	}
	
	
	
	$Total.text(Allmoney.toFixed(2));     //toFixed(2);表示保持小数点后两位，
	$Save.text(TotalSave.toFixed(2));
	$Integ.text(Allinteg); 
}*/

//方法二：手动添加数量，计算金额总计、积分、节约钱
function Total(){
    var savemoney=0;    //定义一个节约总金额
	var score=0;        //定义一个总积分
	var total=0;        //定义一个金额总计
	
	var markettotal=0;    //
	
	var sc=0;
	var price=0;
	var ddprice=0;
	var num=0;
	
	var trs=$("#myTableProduct tr");     //先查找到table里面所有的tr
	//循环出来tr里面的td跟价格和积分有关的文本
	for(var i=0;i<trs.length;i++){
	   sc=$(trs[i]).find("td:eq(1) label").html();
	   price=$(trs[i]).find("td:eq(2) label").html();
	   ddprice=$(trs[i]).find("td:eq(3) label").html();
	   num=$(trs[i]).find("td:eq(4) input").val();      //取input里面的value值在JQuery里面用val(),原生JS使用value
	   markettotal+=price*num;
	   score+=sc*num;
	   total+=ddprice*num;
	   
	   savemoney=markettotal-total;
	}
	$("#product_total").html( total.toFixed(2) );
	$("#product_save").html( savemoney.toFixed(2) );
	$("#product_integral").html( score );
	
}

//失焦函数调用
function productCount(){	//失焦时，调用计算函数
	 Total(); 
}


//删除部分
function deleteProduct( items ){
	 var r=confirm("您确认删除么？");
	 if( r ){
		 $('#'+items+'').remove();    //直接删除节点
		 Total();         //删除后，再重新计算一下
	 }
}