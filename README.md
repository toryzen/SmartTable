SmartTable v1.0
=======
聪明的表格，基于一套数据源使用Ajax获取数据，并展现成表格与图像的形式，并且支持下载（思路源于talkingdata）

开源引入：<br/\>
	Bootstrap 3.0<br/\>
	Bootstrap respond (IE解决方案)<br/\>
	Jquery 11.02<br/\>
	dataTables<br/\>
	highcharts<br/\>
	table2CSV<br/\>


<h3>示例代码</h3>
<pre>
&lt;div class=&quot;panel panel-primary&quot;&gt;
  	  &lt;input class=&quot;smart_data_src&quot; type=&quot;hidden&quot; value=&quot;./demodata.txt&quot;/&gt;
	  &lt;div class=&quot;panel-heading&quot;&gt;
	    &lt;h3 class=&quot;panel-title&quot;&gt;
	    	&lt;b&gt;SmartTables示例&lt;/b&gt;
	    	&lt;span style=&quot;margin:-7px -5px 0 0;float:right&quot;&gt;
	    	  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm change_pic&quot;&gt;&lt;span title=&quot;显示图形&quot; class=&quot;glyphicon glyphicon-picture&quot;&gt;&lt;/span&gt;&lt;/button&gt;
	    	  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm change_table&quot;&gt;&lt;span title=&quot;显示表格&quot; class=&quot;glyphicon glyphicon-list-alt&quot;&gt;&lt;/span&gt;&lt;/button&gt;
	    	  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm down_load&quot;&gt;&lt;span title=&quot;下载表格&quot; class=&quot;glyphicon glyphicon-download&quot;&gt;&lt;/span&gt;&lt;/button&gt;
	    	&lt;/span&gt;
	   &lt;/h3&gt;
	  &lt;/div&gt;
	  &lt;div class=&quot;panel-body&quot;&gt;
	  	&lt;div class=&quot;smart_pic&quot; &gt;&lt;/div&gt;
	    &lt;div class=&quot;smart_table&quot;&gt;&lt;/div&gt;
	  &lt;/div&gt;
&lt;/div&gt;
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
参1：数据(注意在数据中,第一列为图形中的横坐标)<br/\>
参2：表头(注意在表头中,第一列为图形元素)<br/\>
参3：图形底部刻度数<br/\>
参4：图形类型(line:线形图,area:区域图,column:柱状图)<br/\>
参5：默认显示在最前端的内容(pic:图形,table表格)<br/\>

<h3>更新日志</h3>
* 2014-07-14发布:V1.0版本发布