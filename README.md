SmartTable v1.0
=======
聪明的表格，基于一套数据源使用Ajax获取数据，并展现成表格与图像的形式，并且支持下载（思路源于talkingdata）

开源引入：
	Bootstrap 3.0
	Bootstrap respond (IE解决方案)
	Jquery 11.02
	dataTables
	highcharts
	table2CSV


<h3>示例代码</h3>
<pre>
<div class="panel panel-primary">
  	  <input class="smart_data_src" type="hidden" value="./demodata.txt"/>
	  <div class="panel-heading">
	    <h3 class="panel-title">
	    	<b>SmartTables示例</b>
	    	<span style="margin:-7px -5px 0 0;float:right">
	    	  <button type="button" class="btn btn-default btn-sm change_pic"><span title="显示图形" class="glyphicon glyphicon-picture"></span></button>
	    	  <button type="button" class="btn btn-default btn-sm change_table"><span title="显示表格" class="glyphicon glyphicon-list-alt"></span></button>
	    	  <button type="button" class="btn btn-default btn-sm down_load"><span title="下载表格" class="glyphicon glyphicon-download"></span></button>
	    	</span>
	   </h3>
	  </div>
	  <div class="panel-body">
	  	<div class="smart_pic" ></div>
	    <div class="smart_table"></div>
	  </div>
  </div>
</pre>
其中 class 为 smart_data_src 的value值为数据地址

<h3>数据格式</h3>
<pre>
[
	[['2014-07-08','715','1274','6','0'],['2014-07-09','135','273','4','0'],['2014-07-10','49','110','1','0'],['2014-07-11','31','75','1','0'],['2014-07-12','32','66','1','1'],['2014-07-13','20','78','1','0'],['2014-07-14','17','31','0','0']],
	[{ "title": "时间"},{ "title": "iPad"},{ "title": "iPhone"},{ "title": "iPod touch"},{ "title": "PC"}],
	1,
	'line',
	'pic'
]
</pre>
采用Js数组形式的传参方式<br/\>
参1：数据<br/\>
参2：表头<br/\>
参3：图形底部刻度数<br/\>
参4：图形类型(line:线形图,area:区域图,column:柱状图)<br/\>
参5：默认显示在最前端的内容(pic:图形,table表格)<br/\>

<h3>更新日志</h3>
* 2014-07-14发布:V1.0版本发布