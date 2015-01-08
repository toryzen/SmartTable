/*!
 * SmartTable 3.4
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
document.write('<script type="text/javascript" src="'+dir+'echarts/echarts-all.js"></script>');
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
    //改变图标容器大小
	if(all_smart>0){//先检测SmartTable
		$(".smart_here").each(function(){
			$("body").append('<img id="smart_loading" src="'+dir+'images/loading.jpg" style="width:150px;position:absolute;top:50%;left:50%;margin:-150px 0 0 0px;width:150px;height:150px;"/>');
            src   = $(this).attr('src');		//数据源
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
            param = {}
            param = {
                "title":"&nbsp;",
                "pdim":"time",
                "front":"table",
                "graph":{
                    "ptype":"line",
                    "markPoint":{"data" : []},
                    "markLine":{"data" : []}
                },
                "table":{
                    "scrolly":400,
                    "page":300,
                    "scrollx":true
                }
            }
            if(recive_data[0]['data']){//新模式
                recive_data = recive_data[0]
                table_data      = recive_data['data'];
                columns	        = recive_data['column'];
                param['title']  = recive_data['title']?recive_data['title']:param['title'];
                param['pdim']   = recive_data['pdim']?recive_data['pdim']:param['pdim'];
                param['front']  = recive_data['front']?recive_data['front']:param['front'];
                if(recive_data['graph']){
                    if(recive_data['graph']['ptype'])
                        param['graph']['ptype']     = recive_data['graph']['ptype'];
                    if(recive_data['graph']['markPoint'])
                        param['graph']['markPoint']     = recive_data['graph']['markPoint'];
                    if(recive_data['graph']['markLine'])
                        param['graph']['markLine']     = recive_data['graph']['markLine'];                        
                }
                if(recive_data['table']){
                    if(recive_data['table']['scrolly']) 
                        param['table']['scrolly'] = recive_data['table']['scrolly'];
                    if(recive_data['table']['page']) 
                        param['table']['page'] = recive_data['table']['page'];
                    if(recive_data['table']['scrollx']) 
                        param['table']['scrollx'] = recive_data['table']['scrollx'];
                }
            }else{//兼容3.3之前版本
                table_data      = recive_data[0];
                columns	        = recive_data[1];
                param['title']  = recive_data[2]?recive_data[2]:param['title'];
                param['pdim']   = recive_data[3]?recive_data[3]:param['pdim'];
                param['front']  = recive_data[4]?recive_data[4]:param['front'];
                if(param['front'].indexOf('graph')>=0){
                    cob_f = param['front'].split(':');
                    if(cob_f[0]=='graph'){
                        param['front'] = cob_f[0];
                        param['graph']['ptype'] = cob_f[1];
                    }else{
                        param['front'] = 'table';
                        param['graph']['ptype']     = cob_f[1]?cob_f[1]:param['graph']['ptype'];
                    }
                }
            }
			for(var i=0;i<table_data.length;i++){
				for(var j=0;j<table_data[i].length;j++){
					if(table_data[i][j]=='')table_data[i][j]='0';
				}
			}
			recive_data = [table_data,columns];
			//写入SmartTable
			$(obj).append( '<div class="panel panel-default">  <div class="panel-heading"> <h3 class="panel-title"><b>'+param['title']+'</b><span style="margin:-7px -5px 0 0;float:right"><button type="button" class="btn btn-default btn-sm change_pic"><span title="显示图形" class="glyphicon glyphicon-picture"></span></button>&nbsp;<button type="button" class="btn btn-default btn-sm change_table"><span title="显示表格" class="glyphicon glyphicon-list-alt"></span></button></span></h3> </div>  <div class="panel-body">	<div class="smart_pic" style="height:350px;width:100%"></div>	<div class="smart_table"></div>  </div>  <div class="panel-footer">	 <span style="margin:-8px -8px 0 0;float:right"><span class="table_tools"><span title="下载数据" class="tools_download glyphicon glyphicon-download"></span>&nbsp;</span><span class="pic_tools"><span title="折线图" ptype="line" class="tools_pic_type glyphicon glyphicon-random"></span>&nbsp;<span title="柱状图" ptype="bar" class="tools_pic_type glyphicon glyphicon-stats"></span>&nbsp;<span title="区域图"  ptype="area" class="tools_pic_type glyphicon glyphicon-tower"></span>&nbsp;</span></span> <span style="margin:-8px -8px 0 0;float:left"><span class="pic_dim_tools"> <span title="时间纬度" pdim="time" class="tools_pic_dim glyphicon glyphicon-time"></span>&nbsp;<span title="事件纬度" pdim="event" class="tools_pic_dim glyphicon glyphicon-resize-full"></span>&nbsp;<span title="统计(事件)维度" pdim="total_event" class="tools_pic_dim glyphicon glyphicon-indent-left"/> &nbsp;<span title="统计(时间)维度" pdim="total_time" class="tools_pic_dim glyphicon glyphicon-indent-right"/> &nbsp;  </span></span> </div></div>' );
			$(obj).append( '<span class="smart_data hide">'+array_to_string(recive_data)+'</span>' );
            $(obj).append( '<span class="smart_param hide">param='+obj2String(param)+'</span>' );
            $(obj).closest('.smart_here').attr('pdim',param['pdim']);
			//默认图标绿色
			$(obj).find(".pic_dim_tools").find(".tools_pic_dim").each(function(k,v){
				if($(this).attr("pdim") == param['pdim']){
					$(this).addClass('btn-success');
				}
			});
			//默认图标绿色
			$(obj).find(".pic_tools").find(".glyphicon").each(function(k,v){
				if($(this).attr("ptype") == param['graph']['ptype']){
					$(this).addClass('btn-success');
				} 
			});
            //画图与制表
            if(table_data!=''){
                if(param['front']=='table'){
                    $(obj).find('.change_table').addClass('btn-success');
                    $(obj).find('.smart_pic').addClass('hidden');
                    $(obj).find('.panel-footer').find('.pic_tools').addClass('hidden');
                    make_table(obj,param,recive_data);
                }else if(param['front']=='graph'){
                    $(obj).find('.change_pic').addClass('btn-success');
                    $(obj).find('.smart_table').addClass('hidden');
                    $(obj).find('.panel-footer').find('.table_tools').addClass('hidden');
                    show_smart_pic(obj,param,recive_data);
                }else{
                    $(obj).find('.change_table').hide();
                    $(obj).find('.change_pic').hide();
                    make_table(obj,param,recive_data);
                    show_smart_pic(obj,param,recive_data);
                }
            }else{
                $(obj).find('.smart_pic').append('<div style="text-align:center">没有相关数据</div>');
				$(obj).find('.smart_table').append('<div style="text-align:center">没有相关数据</div>');
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
					src   = $(this).attr('src');		//数据源
					ajax_loop(src,this);
				}
				smart_ci = smart_ci+1;
			});
			smart_i = smart_i+1;
		});
	}
	/*SmartTable Comb Loop*/
	function smarttable_comb_ajax_loop(src_arr,obj){
		smart_cob_i++;
		smart_comb_data_info[smart_cob_i] = {};
		if(src_arr.length>0){
			src = src_arr.pop();
			$.get(src,function(data){
				revc = eval(data);
                if(revc[0]['data']){
                    recive_data = [];
                    recive_data[1] = revc[0]['column'];
                    recive_data[0] = revc[0]['data'];
                }else{
                    recive_data = revc
                }
				for(i=recive_data[1].length-1;i>0 ;i--){
					var sum =0;
					var sum_x = 0;
					var sum_y = 0;
					smart_comb_columns[recive_data[1][i]['title']]=recive_data[1][i]['title'];	//首列内容
					for(j=0;j<recive_data[0].length;j++){
						sum += Number(recive_data[0][j][i]);
					}
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
						smart_comb_all_data[xy].reverse();
						smart_comb_all_data[xy][-1]=smart_comb_all_data[xy][smart_comb_all_data[xy].length-1];
						for(xi=smart_comb_all_data[xy].length-1;xi>-1;xi--){
							smart_comb_all_data[xy][xi] = smart_comb_all_data[xy][xi-1];
						}
					}
                    param = {
                        "table":{
                            "scrolly":400,
                            "page":300,
                            "scrollx":true
                        }
                    }
					make_table($(".smart_comb_here"),param,[smart_comb_all_data,result_column]);
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
    //事件维度
   function do_event_dim(revc){
		table_data   = revc[0];
		columns      = revc[1];
		columns_x    = [];
		table_data_x = [];
		columns_x[0] = {};
		columns_x[0]['title'] = '分类';
		for(var z=0;z<table_data.length;z=z+1){
			columns_x[z+1] = {};
			columns_x[z+1]['title'] = table_data[z][0];
        }
		for(var x=1;x<table_data[0].length;x=x+1){
            table_data_x[x-1]  = new Array();
			table_data_x[x-1][0]  = columns[x]['title'];
            for(var y=0;y<table_data.length;y=y+1){
				table_data_x[x-1][y+1] = parseInt(table_data[y][x]);
            }
        }
		result_data = [table_data_x,columns_x];
		return result_data;
   }
   //统计维度(事件)
   function do_total_dim(revc)
   {
        table_data = revc[0];
		columns = revc[1];
		var data = new Array();
		var save_data = new Array
		for(var i=1;i<columns.length;i++)
		{
			temp_data = new Array();
			temp_data[0] = columns[i]['title'];
			sum = 0;
			var sum1=0,sum2=0;
			$.each(table_data,function(k,info){
				sum += Number(info[i]);
			});
			if(sum == 0) {sum = Math.round((sum1/sum2)*100)/100;}
			if(table_data!=''){
				temp_data.push(sum);
                avg = sum/table_data.length;
				temp_data.push(avg.toFixed(2));
			}
			data.push(temp_data);
		}
		result_data = new Array();
		result_data.push(data);
		result_data.push([{"title":"分类"},{"title":"累计"},{"title":"平均"}]);
		return result_data;
   }
   //统计维度(时间)
   function do_total_t_dim(revc)
   {
        return do_total_dim(do_event_dim(revc))
   }
   //数组拼接成字符串
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
   //对象拼接成字符串
   var obj2String = function(_obj) {
        var t = typeof (_obj);
        if (t != 'object' || _obj === null) {
          if (t == 'string') {
            _obj = '"' + _obj + '"';
          }
          return String(_obj);
        } else {
          if ( _obj instanceof Date) {
            return _obj.toLocaleString();
          }
          var n, v, json = [], arr = (_obj && _obj.constructor == Array);
          for (n in _obj) {
            v = _obj[n];
            t = typeof (v);
            if (t == 'string') {
              v = '"' + v + '"';
            } else if (t == "object" && v !== null) {
              v = obj2String(v);
            }
            json.push(( arr ? '' : '"' + n + '":') + String(v));
          }
          return ( arr ? '[' : '{') + String(json) + ( arr ? ']' : '}');
        }
    };
   //制表函数
   function make_table(ts,param,recive_data){
		if(param['pdim'] == 'total_event'){
			recive_data = do_total_dim(recive_data);			
		}else if(param['pdim'] == 'event'){
			recive_data = do_event_dim(recive_data);
		}else if(param['pdim'] == 'total_time'){
			recive_data = do_total_t_dim(recive_data);
		}
		table_data = recive_data[0];//表数据
		columns	   = recive_data[1];	//表格头
		$(ts).find('.smart_table').html( '<table style="clear:both;width:100%;" class="table table-striped table_val"><thead></thead><tbody></tbody></table>' );
		$(ts).find('.smart_table').find('.table_val').dataTable( {
							"data": table_data,
							"scrollY": param['table']['scrolly'],
							"bJQueryUI":true,
							"bAutoWidth": true,
							"bRetrieve": true,
							"scrollX": param['table']['scrollx'],
							"columns": columns,
							"scrollCollapse": true,
							"pageLength": param['table']['page'],
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
	function show_smart_pic(ts,param,recive_data){
		if(param['pdim'] == 'total_event'){
			recive_data = do_total_dim(recive_data);			
		}else if(param['pdim'] == 'event'){
			recive_data = do_event_dim(recive_data);
		}else if(param['pdim'] == 'total_time'){
			recive_data = do_total_t_dim(recive_data);
		}
		table_data = recive_data[0];    //表数据
		columns	   = recive_data[1];	//表格头
        ptype = param['graph']['ptype'];
		var data_x = new Array();
		var series_x   = [];
		var series_x_x = [];
		var columns_x  = [];
		for(var x=0;x<table_data[0].length;x=x+1){
			data_x[x]  = new Array();
			for(var y=0;y<table_data.length;y=y+1){
				if(x>0){
					data_x[x].push(parseInt(table_data[y][x]));
				}else{
					data_x[x].push(table_data[y][x]);
				}
			}
			if(x>0){
				series_x[x]={};
				ptype_s = ptype.split(';');
				if(ptype_s[x]){
					this_ptype = ptype_s[x];
				}else{
					this_ptype = ptype_s[0];
				}
				if(this_ptype=='column'){
					this_ptype = 'bar';
				}
				if(this_ptype=='area'){
					series_x[x]['itemStyle']= {normal: {areaStyle: {type: 'default'}}};
					series_x[x]['type'] = 'line';
				}else{
					series_x[x]['type']=this_ptype;
				}
				series_x[x]['name']=columns[x]['title'];
				series_x[x]['data'] = data_x[x];
				if(param['graph']['markPoint']){
					series_x[x]['markPoint'] = param['graph']['markPoint']
				}
				if(param['graph']['markLine']){
					series_x[x]['markLine'] =  param['graph']['markLine']
				}
				series_x_x.push(series_x[x]);
				columns_x.push(columns[x]['title']);
			}else{
				xaxis_x = data_x[x];
			}
		}
        var myChart = echarts.init($(ts).find('.smart_pic')[0]);
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                y: 'bottom',
                data:columns_x.length<15?columns_x:[]
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            dataZoom : {
                show : true,
                realtime : true,
                y: 36,
                height: 20,
            },
            xAxis : [
                {
                    type : 'category',
                    data : xaxis_x
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : series_x_x
        };
        myChart.setOption(option);
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
            eval($(this).closest('.smart_here').find('.smart_param').html());
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			param['pdim'] = $(this).attr("pdim");
            show_smart_pic($(this).closest('.smart_here'),param,recive_data);
		});
		//切换表格
		$('.change_table').click(function(){
            $(this).parent().find(".btn-success").removeClass("btn-success");
            $(this).addClass('btn-success');
            $(this).closest('.smart_here').find('.smart_pic').addClass('hidden');
			$(this).closest('.smart_here').find('.smart_table').removeClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.pic_tools').addClass('hidden');
			$(this).closest('.smart_here').find('.panel-footer').find('.table_tools').removeClass('hidden');
            eval($(this).closest('.smart_here').find('.smart_param').html());
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
            eval($(this).closest('.smart_here').find('.smart_param').html());
            make_table($(this).closest('.smart_here'),param,recive_data);
		});
		//工具-下载
		$('.tools_download').click(function(){
			$(this).closest('.smart_here').find('.smart_table').table2CSV()
		});
		//工具-切换纬度
		$('.tools_pic_dim').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
            eval($(this).closest('.smart_here').find('.smart_param').html());
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
			param['pdim'] = $(this).attr("pdim");
			$(this).parents(".panel-footer").find('.pic_dim_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			//绘图
			show_smart_pic($(this).closest('.smart_here'),param,recive_data);
			//制表
			make_table($(this).closest('.smart_here'),param,recive_data);
            $(this).closest('.smart_here').find('.smart_param').html('param='+obj2String(param));
		 
		});
        //工具-切换图表
		$('.tools_pic_type').click(function(){
			$("html,body").animate({scrollTop: $(this).position().top-500}, 0);
            eval($(this).closest('.smart_here').find('.smart_param').html());
			recive_data = eval($(this).closest('.smart_here').find('.smart_data').html());
            param['graph']['ptype'] = $(this).attr("ptype");
			$(this).parents(".panel-footer").find('.pic_tools').find(".btn-success").removeClass("btn-success");
			$(this).addClass('btn-success');
			//绘图
			show_smart_pic($(this).closest('.smart_here'),param,recive_data);
            $(this).closest('.smart_here').find('.smart_param').html('param='+obj2String(param));
		});
	}
    
});