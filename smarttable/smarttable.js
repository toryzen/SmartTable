/*!
 * SmartTable 3.2
 * http://toryzen.com/ | Released under GPLv3 license
 */


//文件导入
function dirname(file_src) {
	var dir=''
	ns = file_src.split("/")
	for (i=0;i<ns.length-1;i++) {
		dir = dir + ns[i] + '/' 
	}
	return dir
}
dir = dirname(document.all['smarttablejs'].src);
document.write('<script type="text/javascript" src="'+dir+'highcharts/highcharts.js"></script>');
document.write('<script type="text/javascript" src="'+dir+'datatables/js/jquery.dataTables.min.js"></script>');
document.write('<script type="text/javascript" src="'+dir+'table2csv/table2CSV.js"></script>');
document.write('<link rel="stylesheet" type="text/css" href="'+dir+'datatables/css/jquery.dataTables.min.css">');

$(document).ready(function() {
	/*SmartTable*/
	var table_data;
	var columns;
	var smart_i=0;
	var all_smart = $(".smart_here").length;
	var count_all_smart = 0;
	/*SmartTable Comb*/
	var smart_comb_columns = [];
	var smart_comb_all_data = [];
	var smart_comb_data_info = [];
	smart_cob_i=-1;
	var all_smart = $(".smart_here").length;
	var count_all_smart = 0;
	if(all_smart>0){//先检测SmartTable
		$(".smart_here").each(function(){
			$("body").append('<img id="smart_loading" src="'+dir+'images/loading.jpg" style="width:150px;position:absolute;top:50%;left:50%;margin:-150px 0 0 0px;width:150px;height:150px;"/>');
			title = $(this).attr('title');		//项目标题
			src   = $(this).attr('src');		//数据源
			pdim  = $(this).attr('pdim');		//纬度
			front = $(this).attr('front');		//默认显示
			if(front.indexOf('graph')>=0){
				cob_f = front.split(':');
				if(cob_f[1]!=''){
					front = cob_f[0];
					ptype = cob_f[1];
				}else{
					front = cob_f[0];
					ptype = 'line'
				}
			}
			ajax_loop(src,this);
			smart_i=smart_i+1;
			if(smart_i==1)return false;
		});
	}else{//后检测SmartTable_Comb
		try{ 
			var src_arr_r = $(".smart_comb_here").attr('src').split(";");	//数据源
			$("body").append('<img id="smart_loading" src="'+dir+'images/loading.jpg" style="width:150px;position:absolute;top:50%;left:50%;margin:-150px 0 0 0px;width:150px;height:150px;"/>');
			smarttable_comb_ajax_loop(src_arr_r);
		} 
		catch (e){ 
			$("#smart_loading").remove();
		}
	}
	
	function ajax_loop(src,obj){
		$.get(src,function(data){

			recive_data = eval(data);
			table_data = recive_data[0];	//表数据
			columns	= recive_data[1];		//表格头
			for(var i=0;i<table_data.length;i++){
				for(var j=0;j<table_data[i].length;j++){
					if(table_data[i][j]=='')table_data[i][j]='0';
				}
			}
			var glo_data = new Array();
			glo_data[0] = table_data;
			glo_data[1] = columns;
			//alert(table_data);
			//计算平均和总计
			//alert($(obj).html());
			total_data = do_sum_avg(table_data,columns);
			//total_data = [];
			do_division(table_data); //数据计算(除法)
			if(pdim == 'totle'){
				table_data = total_data[0];
				columns	= total_data[1];
			}
			//写入SmartTable
			$(obj).append( '<div class="panel panel-default">  <div class="panel-heading"> <h3 class="panel-title"><b>'+title+'</b><span style="margin:-7px -5px 0 0;float:right"><button type="button" class="btn btn-default btn-sm change_pic"><span title="显示图形" class="glyphicon glyphicon-picture"></span></button>&nbsp;<button type="button" class="btn btn-default btn-sm change_table"><span title="显示表格" class="glyphicon glyphicon-list-alt"></span></button></span></h3> </div>  <div class="panel-body">	<div class="smart_pic"></div>	<div class="smart_table"></div>  </div>  <div class="panel-footer">	 <span style="margin:-8px -8px 0 0;float:right"><span class="table_tools"><span title="下载数据" class="tools_download glyphicon glyphicon-download"></span>&nbsp;</span><span class="pic_tools"><span title="折线图" ptype="line" class="tools_pic_line glyphicon glyphicon-random"></span>&nbsp;<span title="柱状图" ptype="column" class="tools_pic_column glyphicon glyphicon-stats"></span>&nbsp;<span title="区域图"  ptype="area" class="tools_pic_area glyphicon glyphicon-tower"></span>&nbsp;</span></span> <span style="margin:-8px -8px 0 0;float:left"><span class="pic_dim_tools"> <span title="时间纬度" pdim="time" class="tools_pic_dim glyphicon glyphicon-time"></span>&nbsp;<span title="事件纬度" pdim="event" class="tools_pic_dim glyphicon glyphicon-resize-full"></span>&nbsp;<span title="统计维度" pdim="totle" class="tools_pic_dim glyphicon glyphicon-indent-left"/> &nbsp;  </span></span> </div></div>' );
			$(obj).append( '<span class="smart_data hide">'+array_to_string(glo_data)+'</span>' );
			$(obj).append( '<span class="smart_data_total hide">'+array_to_string(total_data)+'</span>' );
			//默认图标绿色
			$(obj).find(".pic_dim_tools").find(".tools_pic_dim").each(function(k,v){
				if($(this).attr("pdim") == pdim){
					$(this).addClass('btn-success');
				} 
			});
			//默认图标绿色
			$(obj).find(".pic_tools").find(".glyphicon").each(function(k,v){
				if($(this).attr("ptype") == ptype){
					$(this).addClass('btn-success');
				} 
			});
			if(table_data!=''){
				//画图
				show_smart_pic(obj,ptype,pdim,table_data,columns);
				//制表
				make_table(obj,table_data,columns);
			}else{
				$(obj).find('.smart_pic').append('<div style="text-align:center">没有相关数据</div>');
				$(obj).find('.smart_table').append('<div style="text-align:center">没有相关数据</div>');
			}
			//默认图形
			if(front=='graph'){
				$(obj).find('.change_pic').addClass('btn-success');
				$(obj).find('.smart_table').addClass('hidden');
				$(obj).find('.panel-footer').find('.table_tools').addClass('hidden');
			}else{
				$(obj).find('.change_table').addClass('btn-success');
				$(obj).find('.smart_pic').addClass('hidden');
				$(obj).find('.panel-footer').find('.pic_tools').addClass('hidden');
				$(obj).find('.panel-footer').find('.pic_dim_tools').addClass('hidden');
			}
			//删除loading，绑定事件
			count_all_smart ++;
			if(count_all_smart==all_smart){
				
				band_action();
				//Smart Table Comb启动
				try{ 
					var src_arr_r = $(".smart_comb_here").attr('src').split(";");	//数据源
					smarttable_comb_ajax_loop(src_arr_r);
				} 
				catch (e){ 
					$("#smart_loading").remove();
				}
			}
			var smart_ci=0;
			$(".smart_here").each(function(){
				if(smart_i==smart_ci){
					title = $(this).attr('title');		//项目标题
					src   = $(this).attr('src');		//数据源
					pdim  = $(this).attr('pdim');		//纬度
					front = $(this).attr('front');		//默认显示
					if(front.indexOf('graph')>=0){
						cob_f = front.split(':');
						if(cob_f[1]!=''){
							front = cob_f[0];
							ptype = cob_f[1];
						}else{
							front = cob_f[0];
							ptype = 'line'
						}
					}
					ajax_loop(src,this);
					//alert(src);
				}
				smart_ci = smart_ci+1;
			});
			smart_i = smart_i+1;
		});
		

	}
	/*SmartTable Comb Loop*/
	function smarttable_comb_ajax_loop(src_arr,obj){
		smart_cob_i++;
		//smart_comb_columns[smart_cob_i] = {};
		smart_comb_data_info[smart_cob_i] = {};
		if(src_arr.length>0){
			src = src_arr.pop();
			$.get(src,function(data){
				recive_data = eval(data);
				for(i=recive_data[1].length-1;i>0 ;i--){
					var sum =0;
					var sum_x = 0;
					var sum_y = 0;
					smart_comb_columns[recive_data[1][i]['title']]=recive_data[1][i]['title'];	//首列内容
					for(j=0;j<recive_data[0].length;j++){
						if(recive_data[0][j][i].indexOf("\/")>=0){
							temp = recive_data[0][j][i].split("\/");
							sum_x += Number(temp[0]);
							sum_y += Number(temp[1]);
							sum = sum_x/sum_y;
							sum = sum.toFixed(2);
							//alert(sum_x);
						}else{
							sum += Number(recive_data[0][j][i]);
						}
					}
					//alert(sum);
					smart_comb_data_info[smart_cob_i][recive_data[1][i]['title']]=sum;			//其余列内容
					
				}
                tmp_src = src_arr.pop();
                if(tmp_src){
                	src_arr.push(tmp_src);
                }else{
        			var result_column = new Array();
        			var title      = $(".smart_comb_here").attr('title');	//项目标题
        			var src_arr_r  = $(".smart_comb_here").attr('src').split(";");	//数据源
        	        var ptitle     = $(".smart_comb_here").attr('ptitle').split(";");	//统计项列名
					//ptitle.reverse();
        			//做表
        			$(".smart_comb_here").append( '<div class="panel panel-default">  <div class="panel-heading">  	<h3 class="panel-title"><b>'+title+'</b></h3><span style="margin:-23px -5px 0 0;float:right"><button type="button" class="btn btn-default btn-sm down_table"><span title="下载表格" class="glyphicon glyphicon-download"></span></button></span>  </div>  <div class="panel-body">  <div class="smart_table"></div>  </div>  </div>' );
        			
					result_column.push({"title":"类型"});
                    $.each(src_arr_r,function(k,v){
        	    		result_column.push({"title":ptitle[k]});
        	    	});
					var col_i = 0;
					for(var x in smart_comb_columns) {
						smart_comb_all_data[col_i] = [];
						smart_comb_all_data[col_i][0] = smart_comb_columns[x];
						for(col_j=0;col_j<smart_comb_data_info.length;col_j++){
							smart_comb_all_data[col_i][col_j+1]=smart_comb_data_info[col_j][smart_comb_columns[x]]?smart_comb_data_info[col_j][smart_comb_columns[x]]:0;
						}
						col_i++;
						
					}
					var n_smart_comb_all_data = [];
					for(xy=0;xy<smart_comb_all_data.length;xy++){
						//n_smart_comb_all_data[xy] = new Array();
						smart_comb_all_data[xy].reverse();
						smart_comb_all_data[xy][-1]=smart_comb_all_data[xy][smart_comb_all_data[xy].length-1];
						for(xi=smart_comb_all_data[xy].length-1;xi>-1;xi--){
							smart_comb_all_data[xy][xi] = smart_comb_all_data[xy][xi-1];
						}
						//smart_comb_all_data[xy][smart_comb_all_data[xy].length-1] = tmp;
					}
					//alert(smart_comb_all_data[0][-1]);
					make_table($(".smart_comb_here"),smart_comb_all_data,result_column);
					$('.down_table').click(function(){
						$(this).closest('.smart_comb_here').find('.smart_table').table2CSV()
					});
					$("#smart_loading").remove();
        			return true;
        		}
                smarttable_comb_ajax_loop(src_arr,obj);
			});
		}
	}
  
	
   //数据计算(除法)
   function do_division(table_data){
		for(var i=0;i<table_data.length;i++){
		   for(var j=1;j<table_data[i].length;j++){
			if(!table_data[i][j]==0)
			{
				if(table_data[i][j].indexOf("\/")>=0){
					temp = table_data[i][j].split("\/");
					if(temp[1] != 0){
						//alert(table_data[i][j]);
						table_data[i][j] = eval(table_data[i][j]) ;
						//table_data[i][j] = table_data[i][j].substr(0,table_data[i][j].toString().indexOf(".")+3);  
						table_data[i][j] = table_data[i][j].toFixed(2);
						//alert(table_data[i][j]);
					}
					else
						table_data[i][j] = 0;
				}
			}
	
		   }
		}
   }
   
   
   //求和及平均数
   function do_sum_avg(table_data,columns)
   {
		var data = new Array();
		var save_data = new Array
		for(var i=1;i<columns.length;i++)
		{
			//alert(columns[i]['title']);
			temp_data = new Array();
			temp_data[0] = columns[i]['title'];
			sum = 0;
			var sum1=0,sum2=0;
			$.each(table_data,function(k,info){
				if(info[i].indexOf("\/")>=0)
				{
					temp = info[i].split("\/");
					sum1 += Number(temp[0]);
					sum2 += Number(temp[1]);
				}
				else
				{
					sum += Number(info[i]);
				}
				
			});
			if(sum == 0) {sum = Math.round((sum1/sum2)*100)/100;}
			if(table_data!=''){
				temp_data.push(sum);
				temp_data.push(sum/table_data.length);
			}
			data.push(temp_data);
		}
		result_data = new Array();
		result_data.push(data);
		result_data.push([{"title":"统计项"},{"title":"总计"},{"title":"平均"}]);
		return result_data;
   }
	
   //把数组拼接成默认字符串
   function array_to_string(data){
		result_data = "[[";
		$.each(data[0],function(k,v){
			result_data += "[";
			for(var i=0;i<v.length;i++){
				result_data +="'"+v[i]+"',";
			}
			result_data = result_data.slice(0,result_data.length-1)+"],";
		})
		result_data = result_data.slice(0,result_data.length-1)+"],";
		result_data += "[";
		$.each(data[1],function(k,v){
			result_data +="{'title':'"+v['title']+"'},";
		})
		result_data = result_data.slice(0,result_data.length-1)+"]]";
		return result_data;
   }
   
   //制表函数
   function make_table(ts,table_data,columns){
		$(ts).find('.smart_table').html( '<table style="clear:both;width:100%;" class="table table-striped table_val"><thead></thead><tbody></tbody></table>' );
		$(ts).find('.smart_table').find('.table_val').dataTable( {
							"data": table_data,
							"scrollY": 400,
							"bJQueryUI":true,
							"bAutoWidth": true,
							"bRetrieve": true,
							"scrollX": true,
							"columns": columns,
							"scrollCollapse": true,
							"pageLength": 300,
							"language": {
								"emptyTable":	 "没有相关数据",
								"info":		   "第 _START_ 至 _END_ 条记录 共 _TOTAL_ 条记录",
								"infoEmpty":	  "没有数据",
								"infoFiltered":   "(filtered from _MAX_ total entries)",
								"infoPostFix":	"",
								"thousands":	  ",",
								"lengthMenu":	 "每页显示 _MENU_ 条数据",
								"loadingRecords": "载入中...",
								"processing":	 "载入中...",
								"search":		 "搜索:",
								"zeroRecords":	"未找到相应条目",
								"paginate": {
									"first":	  "第一页",
									"last":	   "最后一个",
									"next":	   "下一页",
									"previous":   "前一页"
								},
								"aria": {
									"sortAscending":  ": 按正序排列",
									"sortDescending": ": 按倒序排列"
								}
							}
		} );
	
   }
	//显示图像
	function show_smart_pic(ts,ptype,pdim,table_data,columns){
		var pic_categories   =  new Array();	//画图标图
		var pic_categories_x =  new Array();
		var series  = new Array();
		var series_x  = new Array();
		//setps	= parseInt(table_data.length/10);	//表格头
		if(pdim=='time'){
			//--------时间纬度----------------
			pic_data  = new Array();
			for(var x=1;x<table_data[0].length;x++){
				pic_data[x-1]=new Array();
			}
		 
			for(var i=0;i<table_data.length;i++){
				  pic_categories[i] = table_data[i][0];
				  for(var j=1;j<table_data[i].length;j++){
					  pic_data[j-1][i] = parseInt(table_data[i][j]);
				  }
			}
			for(var i=1;i<columns.length;i++){
				series[i-1]=new Array();
				series[i-1]['name'] = columns[i]["title"];
				series[i-1]['data'] = pic_data[i-1];
			}
		}else if(pdim == 'event'){
			//---------事件纬度----------------
			pic_data=new Array();
			for(var i=1;i<columns.length;i++){
				pic_categories[i-1] = columns[i]["title"];
			}
			for(var i=0;i<table_data.length;i++){
				  series[i]=new Array();
				  series[i]['name'] = table_data[i][0];
				  pic_data[i]=new Array();
				  for(var j=1;j<table_data[i].length;j++){
					  pic_data[i][j-1] = parseInt(table_data[i][j]);
				  }
				  series[i]['data']=pic_data[i];
			}
		}else{
			//----------统计纬度--------------
			pic_data  = new Array();
			for(var x=1;x<table_data[0].length;x++){
				pic_data[x-1]=new Array();
			}
			for(var i=0;i<table_data.length;i++){
				pic_categories[i] = table_data[i][0];
				for(var j=1;j<table_data[i].length;j++){
					pic_data[j-1][i] = parseInt(table_data[i][j]);
				}
			}
			for(var i=1;i<columns.length;i++){
				series[i-1]=new Array();
				series[i-1]['name'] = columns[i]["title"];
				series[i-1]['data'] = pic_data[i-1];
			}
		}
		setps = parseInt(pic_categories.length/10);
		$(ts).find('.smart_pic').highcharts({
			chart: {spacingBottom:30,type:ptype},
			title: {text: ''},
			xAxis: {
				categories: pic_categories,
				labels:{
					rotation:-45,
					step: setps, //每个多少个刻度显示值
					staggerLines: 1
				},
			},
			yAxis: {
				labels: {style: {color: Highcharts.getOptions().colors[1]}},
				title: {text: '',style: {color: Highcharts.getOptions().colors[1]}},
				min:0
			},
			credits: {enabled: false},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: series
		});
	}
	
	//绑定事件
	function band_action(){
		//切换图片
		$('.change_pic').click(function(){
		  $(this).parent().find(".btn-success").removeClass("btn-success");
		  $(this).addClass('btn-success');
			$(this).closest('.smart_here').find(".smart_pic").removeClass('hidden');
			$(this).closest('.smart_here').find('.smart_table').addClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.pic_tools').removeClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.pic_dim_tools').removeClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.table_tools').addClass('hidden');
		});
		
		
		//切换表格
		$('.change_table').click(function(){
		  $(this).parent().find(".btn-success").removeClass("btn-success");
		  $(this).addClass('btn-success');
			$(this).closest('.smart_here').find('.smart_pic').addClass('hidden');
			$(this).closest('.smart_here').find('.smart_table').removeClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.pic_tools').addClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.pic_dim_tools').addClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.table_tools').removeClass('hidden');
		});
		
		//工具-下载
		$('.tools_download').click(function(){
			$(this).closest('.smart_here').find('.smart_table').table2CSV()
		});
		
		
		//工具-切换纬度
		$('.tools_pic_dim').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
			if(front.indexOf('graph')>=0){
				cob_f = front.split(':');
				if(cob_f[1]){
					ptype = cob_f[1];
				}else{
					ptype = 'line'
				}
			}
			
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			table_data = recive_data[0];	//表数据
			do_division(table_data);
			columns	= recive_data[1];	//表格头
		  
			if($(this).attr("pdim") == 'totle'){
				$(this).closest('.smart_here').attr('pdim','totle');
				pdim = 'totle';
				recive_data = eval($(this).closest('.smart_here').find('.smart_data_total').html());
				table_data = recive_data[0];
				columns	= recive_data[1];
			}
		  
			if($(this).attr("pdim") == 'event'){
				$(this).closest('.smart_here').attr('pdim','event');
				pdim = 'event';
			}

			if($(this).attr("pdim") == 'time'){
				$(this).closest('.smart_here').attr('pdim','time');
				pdim = 'time';
			}
			$(this).parents(".panel-footer").find('.pic_dim_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			//绘图
			show_smart_pic($(this).closest('.smart_here'),ptype,pdim,table_data,columns);
			$(this).closest('.smart_here').find('.smart_table').removeClass('hidden');
			//制表
			make_table($(this).closest('.smart_here'),table_data,columns);
			$(this).closest('.smart_here').find('.smart_table').addClass('hidden');
		 
		});
		
		
		//工具-线形图
		$('.tools_pic_line').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
			$(this).parents(".panel-footer").find('.pic_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			$(this).closest('.smart_here').find('.smart_table').addClass('hidden');
			pdim = $(this).closest('.smart_here').attr('pdim');
			ptype = 'line';
			$(this).parent().parent().parent().parent().parent().attr('ptype',ptype);
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			table_data = recive_data[0];	//表数据
			do_division(table_data);
			columns	= recive_data[1];	//表格头
			if(pdim == 'totle'){
				recive_data = eval($(this).closest('.smart_here').find('.smart_data_total').html());
				table_data = recive_data[0];
				columns	= recive_data[1];
			}
			show_smart_pic($(this).closest('.smart_here'),ptype,pdim,table_data,columns);
			return false;
		});
		//工具-柱状图
		$('.tools_pic_column').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
			$(this).parents(".panel-footer").find('.pic_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			$(this).closest('.smart_here').find('.smart_table').addClass('hidden');
			pdim = $(this).closest('.smart_here').attr('pdim');
			ptype = 'column';
			$(this).closest('.smart_here').attr('ptype',ptype);
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			table_data = recive_data[0];	//表数据
			do_division(table_data);
			columns	= recive_data[1];	//表格头
			if(pdim == 'totle'){
				recive_data = eval($(this).closest('.smart_here').find('.smart_data_total').html());
				table_data = recive_data[0];
				columns	= recive_data[1];
		  }
			show_smart_pic($(this).closest('.smart_here'),ptype,pdim,table_data,columns);
		});
		//工具-区域图
		$('.tools_pic_area').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
			$(this).parents(".panel-footer").find('.pic_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			$(this).closest('.smart_here').find('.smart_table').addClass('hidden');
			pdim = $(this).closest('.smart_here').attr('pdim');
			ptype = 'area';
			$(this).closest('.smart_here').attr('ptype',ptype);
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			table_data = recive_data[0];	//表数据
			do_division(table_data);
			columns	= recive_data[1];	//表格头
			if(pdim == 'totle'){
				recive_data = eval($(this).closest('.smart_here').find('.smart_data_total').html());
				table_data = recive_data[0];
				columns	= recive_data[1];
		  }
			show_smart_pic($(this).closest('.smart_here'),ptype,pdim,table_data,columns);
		});
		
	}
 
});