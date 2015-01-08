SmartTable v3.5
=======
聪明的表格，基于一套数据源使用Ajax获取数据，并展现成表格与图像的形式，并且支持下载（思路源于talkingdata）<br/>

开源引入：Bootstrap 3.0，Bootstrap respond (IE解决方案)，Jquery 11.02，dataTables，echarts，table2CSV<br/>

<h3>1.功能展示:</h3>
![image](https://github.com/toryzen/SmartTable/raw/master/screenshots/v3.5.png)


- 右上角为切换图形表格选项
- 图片显示中，左下角为切换事件，右下角为切换图形显示
- 表格现实中，右下角为下载表格数据


<h3>2.示例&参数</h3>
<pre>
  &lt;div class="smart_here" src="./demodata.txt"  >&lt;/div>
  &lt;div class="smart_here" src="./demodata2.txt" >&lt;/div>
</pre>
元素的class设置为smart_here,SmartTable会自动检测此组件并进行图表写入<br/><br/>
Demo
<pre>
[{
    "data":[['2014-07-20','0','12','644','0'],['2014-07-21','35','3','444','60'],['2014-07-22','9','10','144','0'],['2014-07-23','1','5','144','50'],['2014-07-24','2','656','155','1'],['2014-07-25','0','8','144','5'],['2014-07-26','7','1','220','0']],
    "column":[{ "title": "时间"},{ "title": "iPad"},{ "title": "iPhone"},{ "title": "iPod touch"},{ "title": "PC"}],
	"title":"我是测试数据",
	"pdim":"total_time",
	"front":"graph",
	"graph":{
		"ptype":"line",
		"markPoint":{
			"data" : [{"type" : 'max', "name": "最大值"}]
		},"markLine":{
			"data" : [{"type" : "max", "name": "自定义名字"}]
		},
        "zoom":{
            "start":80,
            "end":100
        }
	},
    "table":{
         "scrolly":400,
         "page":200,
         "scrollx":true
    }
}]
</pre>
- 参1:data   数据源(时间维度)

- 参2:column 表头(事件)

- 参3:title  SmartTable名称

- 参3:pdim   默认维度
	- time  时间纬度 ： 时间为横轴，每一条线为一个事件
	- event 事件纬度 ： 事件为横轴，每一条线为一个时间
	- total_time  统计(时间)纬度 ： 时间为横轴，展示各事件数值的一个加和与平均
	- total_event 统计(事件)纬度 ： 事件为横轴，展示各时间数值的一个加和与平均
    
- 参4:front 默认显示在前面
    - all           全部显示
	- table			表格
	- graph		    图形
    
- 辅参1:graph	图形的辅助参数
	- ptype		图片类型(单图片支持多类型展示，采用;分割，且支持两个坐标系，追加:1，例如 “line;bar:1”)
		- line	线图
		- bar	柱状图
		- area	区域图
	- markPoint	图形中的点标注
		- 具体参考：http://echarts.baidu.com/doc/doc.html#SeriesMarkPoint
	- markLine  图形中的线标注
		- 具体参考：http://echarts.baidu.com/doc/doc.html#SeriesMarkLine
    - zoom  数据拖拽条
        -start  开始百分比
        -end    结束报粉笔
        
- 辅参2:table	表格的辅助参数
	- scrolly	y轴长度
	- page		分页数
	- scrollx	横轴拖拽条

注意：测试代码时请放入IIS或Apache下，然后使用URL路径访问，不要直接打开index.html

<h3>4.SmartTable汇集</h3>
从v3.2版本，我们引入了一个新的功能元素，<b>SmartTable汇集</b>，它支持将相同事件的多个SmartTable的统计纬度中加和数据进行汇总展示<br/>
![image](https://github.com/toryzen/SmartTable/raw/master/screenshots/v3.2_comb.png)
<h4>4-1.示例&参数</h4>
<pre>
&lt;div class="smart_comb_here" title="统计维度汇总" src="./demodata.txt;./demodata2.txt;./demodata.txt;./demodata.txt" ptitle="汇总1;汇总2;汇总1;汇总1">&lt;/div>
</pre>
元素的class设置为smart_comb_here,SmartTable会自动检测此组件并进行表写入<br/>

- 参1:src  数据源地址：多个SmartTable数据源以;隔开
- 参2:ptitle 各列的名称：与数据源位置一一对应
- 参2:title  表格的名称

<h3>更新日志</h3>
* 2015-01-08发布:V3.5版本发布,增加zoom控制，增加多图形支持
* 2015-01-08发布:V3.4版本发布,大更新，采用Echart替代HighCharts,增加点/线标注，新增加一种维度
* 2014-09-13发布:V3.2版本发布,大更新，扩展至三种纬度(事件/时间/统计)，并新增SmartTable汇集
* 2014-07-16发布:V3.0版本发布,支持多纬度显示切换,支持线图,柱状图,区域图快速切换
* 2014-07-14发布:V2.3版本发布,元素改名smart_here
* 2014-07-14发布:V2.2版本发布,将highchart,datatables封装入SmartTable
* 2014-07-14发布:V2.0版本发布,采用在HTML中获取参数形式生成SmartTable
* 2014-07-14发布:V1.0版本发布
