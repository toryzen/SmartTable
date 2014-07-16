/*!
 * SmartTable 3.0
 * http://toryzen.com/ | Released under GPLv3 license
 */
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
	$(".smart_here").each(function(){
		var title = $(this).attr('title');	//项目标题
		var src   = $(this).attr('src');	//数据源
		var ptype = $(this).attr('ptype');	//图表类型
		var pdim  = $(this).attr('pdim');	//图表纬度
		var front = $(this).attr('front');	//默认显示
		$.ajaxSetup({ async :false});
		var glo_data;
		$.get(src,function(data){
				glo_data = data;
				recive_data = eval(data);
				table_data = recive_data[0];	//表数据
				columns    = recive_data[1];	//表格头
	    });
		$(this).append( '<div class="panel panel-primary">  <div class="panel-heading">  	<h3 class="panel-title"><b>'+title+'</b><span style="margin:-4px -5px 0 0;float:right"><button type="button" class="btn btn-default btn-sm change_pic"><span title="显示图形" class="glyphicon glyphicon-picture"></span></button>&nbsp;<button type="button" class="btn btn-default btn-sm change_table"><span title="显示表格" class="glyphicon glyphicon-list-alt"></span></button></span></h3>  </div>  <div class="panel-body">    <div class="smart_pic"></div>    <div class="smart_table"></div>  </div>  <div class="panel-footer">	  <span style="margin:-8px -8px 0 0;float:right">	  	<span class="table_tools">	  		<span title="下载数据" class="tools_download glyphicon glyphicon-download"></span>&nbsp;	  	</span>	  	<span class="pic_tools">		  	<span title="更换纬度" class="tools_pic_dim glyphicon glyphicon-resize-full"></span>&nbsp;		  	<span title="折线图" class="tools_pic_line glyphicon glyphicon-random"></span>&nbsp;		  	<span title="柱状图" class="tools_pic_column glyphicon glyphicon-stats"></span>&nbsp;		  	<span title="区域图" class="tools_pic_area glyphicon glyphicon-tower"></span>&nbsp;	  	</span>	  </span>  </div></div>' );
		$(this).append( '<span class="smart_data hide">'+glo_data+'</span>' );
		//画图
		show_smart_pic(this,ptype,pdim,table_data,columns);
		//制表
		$(this).find('.smart_table').html( '<table style="clear:both"  class="table table-striped table_val"></table>' );
		$(this).find('.smart_table').find('.table_val').dataTable( {
		                 		"data": table_data,
		                 		"scrollY": 400,
		                        "scrollX": true,
		                        "columns": columns,
		                        "scrollCollapse": true,
		                        "pageLength": 300,
		                        "language": {
		                        	"emptyTable":     "没有相关数据",
	                        	    "info":           "第 _START_ 至 _END_ 条记录 共 _TOTAL_ 条记录",
	                        	    "infoEmpty":      "没有数据",
	                        	    "infoFiltered":   "(filtered from _MAX_ total entries)",
	                        	    "infoPostFix":    "",
	                        	    "thousands":      ",",
	                        	    "lengthMenu":     "每页显示 _MENU_ 条数据",
	                        	    "loadingRecords": "载入中...",
	                        	    "processing":     "载入中...",
	                        	    "search":         "搜索:",
	                        	    "zeroRecords":    "未找到相应条目",
	                        	    "paginate": {
	                        	        "first":      "第一页",
	                        	        "last":       "最后一个",
	                        	        "next":       "下一页",
	                        	        "previous":   "前一页"
	                        	    },
	                        	    "aria": {
	                        	        "sortAscending":  ": 按正序排列",
	                        	        "sortDescending": ": 按倒序排列"
	                        	    }
		                        }
		} );
		if(front=='pic'){
			$(this).find('.smart_table').hide();
			$(this).find('.panel-footer').find('.table_tools').hide();
		}else{
			$(this).find('.smart_pic').hide();
	    	$(this).find('.panel-footer').find('.pic_tools').hide();
		}
	});
	
	//显示图像
	function show_smart_pic(ts,ptype,pdim,table_data,columns){
		//alert(columns);
		var pic_categories   =  new Array();	//画图标图
		var pic_categories_x =  new Array();
		var series  = new Array();
		var series_x  = new Array();
		setps    = parseInt(table_data.length/10);	//表格头
		if(pdim=='a'){
			//--------纬度1----------------
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
		}else{
			//---------纬度2----------------
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
		}
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
	
    
	//切换图片
    $('.change_pic').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_pic').show();
    	$(this).parent().parent().parent().parent().find('.smart_table').hide();
    	$(this).parent().parent().parent().parent().find('.panel-footer').find('.pic_tools').show();
    	$(this).parent().parent().parent().parent().find('.panel-footer').find('.table_tools').hide();
    });
	//切换表格
    $('.change_table').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_pic').hide();
    	$(this).parent().parent().parent().parent().find('.smart_table').show();
    	$(this).parent().parent().parent().parent().find('.panel-footer').find('.pic_tools').hide();
    	$(this).parent().parent().parent().parent().find('.panel-footer').find('.table_tools').show();
    });
    
    //工具-下载
    $('.tools_download').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_table').table2CSV()
    });
    //工具-切换纬度
    $('.tools_pic_dim').click(function(){
    	$("html,body").animate({scrollTop: $(this).position().top-500}, 1000);
    	ptype = $(this).parent().parent().parent().parent().parent().attr('ptype');
    	if($(this).parent().parent().parent().parent().parent().attr('pdim')=='a'){
    		$(this).parent().parent().parent().parent().parent().attr('pdim','b');
    		pdim = 'b';
    	}else{
    		$(this).parent().parent().parent().parent().parent().attr('pdim','a');
    		pdim = 'a';
    	}
    	recive_data = eval($(this).parent().parent().parent().parent().parent().find('.smart_data').html());
		table_data = recive_data[0];	//表数据
		columns    = recive_data[1];	//表格头
		//alert(columns);
    	show_smart_pic($(this).parent().parent().parent().parent().parent(),ptype,pdim,table_data,columns);
    	
    });
    //工具-线形图
    $('.tools_pic_line').click(function(){
    	$("html,body").animate({scrollTop: $(this).position().top-500}, 1000);
    	$(this).parent().parent().parent().parent().find('.smart_table').hide();
    	pdim = $(this).parent().parent().parent().parent().parent().attr('pdim');
    	ptype = 'line';
    	$(this).parent().parent().parent().parent().parent().attr('ptype',ptype);
    	recive_data = eval($(this).parent().parent().parent().parent().parent().find('.smart_data').html());
		table_data = recive_data[0];	//表数据
		columns    = recive_data[1];	//表格头
    	show_smart_pic($(this).parent().parent().parent().parent().parent(),ptype,pdim,table_data,columns);
    	return false;
    });
    //工具-柱状图
    $('.tools_pic_column').click(function(){
    	$("html,body").animate({scrollTop: $(this).position().top-500}, 1000);
    	$(this).parent().parent().parent().parent().find('.smart_table').hide();
    	pdim = $(this).parent().parent().parent().parent().parent().attr('pdim');
    	ptype = 'column';
    	$(this).parent().parent().parent().parent().parent().attr('ptype',ptype);
    	recive_data = eval($(this).parent().parent().parent().parent().parent().find('.smart_data').html());
		table_data = recive_data[0];	//表数据
		columns    = recive_data[1];	//表格头
    	show_smart_pic($(this).parent().parent().parent().parent().parent(),ptype,pdim,table_data,columns);
    });
    //工具-区域图
    $('.tools_pic_area').click(function(){
    	$("html,body").animate({scrollTop: $(this).position().top-500}, 1000);
    	$(this).parent().parent().parent().parent().find('.smart_table').hide();
    	pdim = $(this).parent().parent().parent().parent().parent().attr('pdim');
    	ptype = 'area';
    	$(this).parent().parent().parent().parent().parent().attr('ptype',ptype);
    	recive_data = eval($(this).parent().parent().parent().parent().parent().find('.smart_data').html());
		table_data = recive_data[0];	//表数据
		columns    = recive_data[1];	//表格头
    	show_smart_pic($(this).parent().parent().parent().parent().parent(),ptype,pdim,table_data,columns);
    });

 
});