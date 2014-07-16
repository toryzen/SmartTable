SmartTable v3.0
=======
聪明的表格，基于一套数据源使用Ajax获取数据，并展现成表格与图像的形式，并且支持下载（思路源于talkingdata）<br/>

开源引入：<br/>
	Bootstrap 3.0<br/>
	Bootstrap respond (IE解决方案)<br/>
	Jquery 11.02<br/>
	dataTables<br/>
	highcharts<br/>
	table2CSV<br/>


<h3>示例代码</h3>
<pre>

  &lt;div class=&quot;smart_here&quot; src=&quot;./demodata.txt&quot; title=&quot;SmartTables示例(Line)&quot; ptype=&quot;line&quot; pdim=&quot;a&quot; front=&quot;pic&quot; &gt;&lt;/div&gt;
  
  &lt;div class=&quot;smart_here&quot; src=&quot;./demodata.txt&quot; title=&quot;SmartTables示例(Area)&quot; ptype=&quot;area&quot; pdim=&quot;b&quot; front=&quot;table&quot; &gt;&lt;/div&gt;
  
  &lt;div class=&quot;smart_here&quot; src=&quot;./demodata.txt&quot; title=&quot;SmartTables示例(Column)&quot; ptype=&quot;column&quot; pdim=&quot;a&quot; front=&quot;pic&quot; &gt;&lt;/div&gt;

</pre>
元素的class设置为smart_here,SmartTable会自动检测此组件并进行图表写入<br/\>
参1:src   源数据地址<br/\>
参2:title 表格标题<br/\>
参3:ptype 图类型(area/line/column)<br/\>
参4:front 默认显示(pic/table)<br/\>
参5:pdim  显示纬度(a/b)<br/\>

<h3>数据格式</h3>
<pre>
[
	[['2014-07-08','715','1274','6','0'],['2014-07-09','135','273','4','0'],['2014-07-10','49','110','1','0'],['2014-07-11','31','75','1','0'],['2014-07-12','32','66','1','1'],['2014-07-13','20','78','1','0'],['2014-07-14','17','31','0','0']],
	[{ "title": "时间"},{ "title": "iPad"},{ "title": "iPhone"},{ "title": "iPod touch"},{ "title": "PC"}]
]
</pre>
采用Js数组形式的传参方式<br/\>
参1：数据(注意在数据中,第一列为图形中的横坐标)<br/\>
参2：表头(注意在表头中,第一列为图形元素)<br/\>

注意：测试代码时请放入IIS或Apache下，然后使用URL路径访问，不要直接打开index.html


<h3>更新日志</h3>
* 2014-07-16发布:V3.0版本发布,支持多纬度显示切换,支持线图,柱状图,区域图快速切换
* 2014-07-14发布:V2.3版本发布,元素改名smart_here
* 2014-07-14发布:V2.2版本发布,将highchart,datatables封装入SmartTable
* 2014-07-14发布:V2.0版本发布,采用在HTML中获取参数形式生成SmartTable
* 2014-07-14发布:V1.0版本发布
