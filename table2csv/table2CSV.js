jQuery.fn.table2CSV = function(options) {
    var options = jQuery.extend({
        separator: '\t',
        header: [],
        delivery: 'popup' // popup, value
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;

    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array
    i=0;
    $(el).find('thead:first-child').find('tr').find('th').each(function() {
    	if(i<$(el).find('thead:first-child').find('tr').find('th').length/2){
    		tmpRow[tmpRow.length] = formatData($(this).html());
    	}
        i++;
    });
	
    row2CSV(tmpRow);

    // actual data
    $(el).find('tr').each(function() {
        var tmpRow = [];
        $(this).find('td').each(function() {
            tmpRow[tmpRow.length] = formatData($(this).html());
        });
        row2CSV(tmpRow);
    });
    if (options.delivery == 'popup') {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = mystr;
        }
    }
    function formatData(input) {
        // replace " with “
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "“");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
        var output = output.replace(regexp, "");
        if (output == "") return '';
        return '"' + output + '"';
    }
    function popup(data) {
    	var iWidth=600; //弹出窗口的宽度;
    	var iHeight=300; //弹出窗口的高度;
    	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
    	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
    	var generator =  window.open("","请自行全选(Ctril+a)粘贴至EXCEL","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft);
        generator.document.write('<html><head><title>请全选(Ctril+a)粘贴至EXCEL</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textarea style="width:590px;height:260px;" >');
        generator.document.write(data);
        generator.document.write('</textarea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }
};