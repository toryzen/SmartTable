$(document).ready(function() {
	$(".smart_data_src").each(function(){
	    var src = $(this).val();
		var pic_categories =  new Array();	//画图标图
		var pic_data =  new Array();
		$.ajaxSetup({ async :false});
		$.get(src,
			function(data){
				recive_data = eval(data);
				table_data = recive_data[0];	//表数据
				columns    = recive_data[1];	//表格头
				setps    = recive_data[2];	//表格头
				ptype    = recive_data[3];	//图类型
				front    = recive_data[4];	//默认显示
				//作图数据
				for(var x=1;x<table_data[0].length;x++){
					pic_data[x-1]=new Array();
				}
				for(var i=0;i<table_data.length;i++){
			    	  pic_categories[i] = table_data[i][0];
			    	  for(var j=1;j<table_data[i].length;j++){
			    		  pic_data[j-1][i] = parseInt(table_data[i][j]);
			    		  
			    	  }
			    }
				series=new Array();
				for(var i=1;i<columns.length;i++){
					series[i-1]=new Array();
					series[i-1]['name'] = columns[i]["title"];
					series[i-1]['data'] = pic_data[i-1];
				}
	    });
		$(this).parent().find('.smart_pic').highcharts({
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
		$(this).parent().find('.smart_table').html( '<table style="clear:both"  class="table table-striped table_val"></table>' );
		$(this).parent().find('.smart_table').find('.table_val').dataTable( {
		                 		"data": table_data,
		                 		"scrollY": 400,
		                        "scrollX": true,
		                        "columns": columns,
		                        //"paging":  false,
		                        "scrollCollapse": true,
		                        "pageLength": 300,
		                        //"jQueryUI":       true,
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
			$(this).parent().find('.smart_table').hide();
		}else{
			$(this).parent().find('.smart_pic').hide();
		}
	});
	
    
	//切换图片
    $('.change_pic').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_pic').show();
    	$(this).parent().parent().parent().parent().find('.smart_table').hide();
    	//$(this).parent().find('.down_load').hide();
    });
    
	//切换表格
    $('.change_table').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_pic').hide();
    	$(this).parent().parent().parent().parent().find('.smart_table').show();
    	//$(this).parent().find('.down_load').show();
    });
	
    //点击下载
    $('.down_load').click(function(){
    	$(this).parent().parent().parent().parent().find('.smart_table').table2CSV()
    });
    
 
});