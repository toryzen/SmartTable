SmartTable v3.2
=======
聪明的表格，基于一套数据源使用Ajax获取数据，并展现成表格与图像的形式，并且支持下载（思路源于talkingdata）<br/>

开源引入：<br/>
	Bootstrap 3.0<br/>
	Bootstrap respond (IE解决方案)<br/>
	Jquery 11.02<br/>
	dataTables<br/>
	highcharts<br/>
	table2CSV<br/>

<h3>功能展示:</h3>
![image](https://github.com/toryzen/SmartTable/raw/master/screenshots/v3.2.png)

<h3>示例代码</h3>
<pre>
  &lt;div class="smart_here" src="./demodata.txt" title="SmartTables示例(Line)" pdim="time"  front="graph:area" ></div>
  &lt;div class="smart_here" src="./demodata2.txt" title="SmartTables示例(Area)" pdim="event"  front="table" ></div>
  &lt;div class="smart_comb_here" title="统计维度汇总" src="./demodata.txt;./demodata2.txt;./demodata.txt;./demodata.txt" ptitle="汇总1;汇总2;汇总1;汇总1"></div>
</pre>
元素的class设置为smart_here,SmartTable会自动检测此组件并进行图表写入<br/>
参1:src   源数据地址<br/\>
参2:title 表格标题<br/\>
参3:pdim 默认显示的纬度(time,event,totle)<br/\>
参4:front 默认显示(graph:area,graph:line,graph:column,table)<br/\>

<h3>数据格式</h3>
<pre>
[
	[['2014-07-20','0','12','6444','0'],['2014-07-21','35','3','444','60'],['2014-07-22','9','10','144','0'],['2014-07-23','1','5','144','50'],['2014-07-24','2','6','155','1'],['2014-07-25','0','8','144','5'],['2014-07-26','7','1','220','0']],
	[{ "title": "时间"},{ "title": "iPad"},{ "title": "iPhone"},{ "title": "iPod touch"},{ "title": "PC"}]
]
</pre>
采用Js数组形式的传参方式<br/>
参1：数据(注意在数据中,第一列为图形中的横坐标)<br/>
参2：表头(注意在表头中,第一列为图形元素)<br/>

注意：测试代码时请放入IIS或Apache下，然后使用URL路径访问，不要直接打开index.html


<h3>更新日志</h3>
* 2014-09-13发布:V3.2版本发布,扩展至三种纬度(事件/时间/统计)，并新增SmartTable_Combination
* 2014-07-16发布:V3.0版本发布,支持多纬度显示切换,支持线图,柱状图,区域图快速切换
* 2014-07-14发布:V2.3版本发布,元素改名smart_here
* 2014-07-14发布:V2.2版本发布,将highchart,datatables封装入SmartTable
* 2014-07-14发布:V2.0版本发布,采用在HTML中获取参数形式生成SmartTable
* 2014-07-14发布:V1.0版本发布
