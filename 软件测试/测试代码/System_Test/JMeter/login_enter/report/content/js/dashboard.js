/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/sockjs-node/418/siy2oweq/xhr?t=1655001057031-494"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title1.21c3c425.png-482"], "isController": false}, {"data": [1.0, 500, 1500, "/__webpack_dev_server__/sockjs.bundle.js-490"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img2.f6a2fee2.jpeg-503"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img4.ac8cc09a.jpeg-505"], "isController": false}, {"data": [1.0, 500, 1500, "/__webpack_dev_server__/sockjs.bundle.js-493"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/iframe.html-489"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title2.c2326998.png-499"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-474"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title1.21c3c425.png-500"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/171/5t0rbpvh/eventsource-485"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/iframe.html-492"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/418/siy2oweq/xhr?t=1655001057083-495"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/418/qa5mcfvf/htmlfile-491"], "isController": false}, {"data": [1.0, 500, 1500, "/-476"], "isController": false}, {"data": [1.0, 500, 1500, "访问登陆界面"], "isController": true}, {"data": [1.0, 500, 1500, "/assets/img/bg5.2f039688.jpg-480"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/418/y2yjbiar/eventsource-488"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title2.c2326998.png-481"], "isController": false}, {"data": [1.0, 500, 1500, "填写用户名密码进入主页"], "isController": true}, {"data": [1.0, 500, 1500, "/assets/js/chunk-vendors.js-478"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-483"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img3.bd124c52.jpeg-507"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-486"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img1.34c6a75e.jpeg-506"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/fonts/element-icons.535877f5.woff-479"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/tjlogo.078f1780.png-502"], "isController": false}, {"data": [1.0, 500, 1500, "/api/login-498"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/js/app.js-477"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-508"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/fonts/zcool_title.b2e0fdc1.TTF-501"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1450, 0, 0.0, 3.9537931034482647, 0, 177, 1.0, 7.0, 12.0, 76.49000000000001, 4.932291542650716, 4604.316790190097, 2.39223447901395], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/sockjs-node/418/siy2oweq/xhr?t=1655001057031-494", 50, 0, 0.0, 0.7199999999999999, 0, 5, 1.0, 1.0, 1.0, 5.0, 0.17020233653767597, 0.06365966298235343, 0.0954063878638926], "isController": false}, {"data": ["/assets/img/title1.21c3c425.png-482", 50, 0, 0.0, 0.8599999999999999, 0, 2, 1.0, 1.0, 2.0, 2.0, 0.17019654296781922, 9.180973281695701, 0.08160791269257739], "isController": false}, {"data": ["/__webpack_dev_server__/sockjs.bundle.js-490", 50, 0, 0.0, 1.14, 0, 3, 1.0, 2.0, 2.0, 3.0, 0.1701994397034445, 9.043839758929513, 0.07778646267696486], "isController": false}, {"data": ["/assets/img/img2.f6a2fee2.jpeg-503", 50, 0, 0.0, 0.8799999999999999, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.17020928934217514, 27.73580316231839, 0.08144780447037678], "isController": false}, {"data": ["/assets/img/img4.ac8cc09a.jpeg-505", 50, 0, 0.0, 1.3200000000000003, 1, 2, 1.0, 2.0, 2.0, 2.0, 0.17020986876819116, 63.679600932324554, 0.08144808173477898], "isController": false}, {"data": ["/__webpack_dev_server__/sockjs.bundle.js-493", 50, 0, 0.0, 1.1200000000000008, 0, 2, 1.0, 2.0, 2.0, 2.0, 0.17020175716294095, 9.043962901122992, 0.07778752182837535], "isController": false}, {"data": ["/sockjs-node/iframe.html-489", 50, 0, 0.0, 0.4600000000000001, 0, 2, 0.0, 1.0, 1.0, 2.0, 0.1701994397034445, 0.12233084728685072, 0.09723307834620608], "isController": false}, {"data": ["/assets/img/title2.c2326998.png-499", 50, 0, 0.0, 1.4200000000000004, 1, 3, 1.0, 2.0, 2.0, 3.0, 0.17020813050197783, 9.07704667830323, 0.08161346882467882], "isController": false}, {"data": ["/sockjs-node/info-474", 50, 0, 0.0, 1.6400000000000001, 1, 24, 1.0, 2.0, 2.0, 24.0, 0.17012936637018788, 0.06491830919481173, 0.07360088799022776], "isController": false}, {"data": ["/assets/img/title1.21c3c425.png-500", 50, 0, 0.0, 0.7599999999999999, 0, 3, 1.0, 1.0, 2.0, 3.0, 0.17020813050197783, 9.181598352215088, 0.08161346882467882], "isController": false}, {"data": ["/sockjs-node/171/5t0rbpvh/eventsource-485", 50, 0, 0.0, 0.5399999999999999, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.17019828099736192, 0.07246723683090801, 0.07662246830057017], "isController": false}, {"data": ["/sockjs-node/iframe.html-492", 50, 0, 0.0, 0.5199999999999998, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.17020175716294095, 0.12233251296086381, 0.09723440228546919], "isController": false}, {"data": ["/sockjs-node/418/siy2oweq/xhr?t=1655001057083-495", 50, 0, 0.0, 0.5599999999999999, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.17020523347051875, 0.10438367833934159, 0.0954080117305447], "isController": false}, {"data": ["/sockjs-node/418/qa5mcfvf/htmlfile-491", 50, 0, 0.0, 0.5999999999999996, 0, 2, 1.0, 1.0, 1.4499999999999957, 2.0, 0.17020001906240215, 0.25047991086625004, 0.1012224722744169], "isController": false}, {"data": ["/-476", 50, 0, 0.0, 0.82, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.17014268165283405, 0.20221058942529208, 0.0864005805268298], "isController": false}, {"data": ["访问登陆界面", 50, 0, 0.0, 88.22000000000001, 60, 196, 79.0, 126.29999999999998, 164.7999999999998, 196.0, 0.17005645874430309, 3780.482311338302, 1.567541908288552], "isController": true}, {"data": ["/assets/img/bg5.2f039688.jpg-480", 50, 0, 0.0, 4.319999999999999, 2, 33, 4.0, 5.0, 6.449999999999996, 33.0, 0.17017742698537497, 176.8617104724636, 0.08110018004771775], "isController": false}, {"data": ["/sockjs-node/418/y2yjbiar/eventsource-488", 50, 0, 0.0, 0.6800000000000002, 0, 2, 1.0, 1.0, 2.0, 2.0, 0.1701988603484311, 0.07246748350773043, 0.0766227291217058], "isController": false}, {"data": ["/assets/img/title2.c2326998.png-481", 50, 0, 0.0, 0.6399999999999996, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.1701977016502369, 9.076490517009558, 0.08160846827174445], "isController": false}, {"data": ["填写用户名密码进入主页", 50, 0, 0.0, 26.440000000000005, 18, 51, 24.0, 32.9, 41.14999999999997, 51.0, 0.17019306701522205, 823.8850485975667, 0.8250374850230101], "isController": true}, {"data": ["/assets/js/chunk-vendors.js-478", 50, 0, 0.0, 67.30000000000001, 42, 177, 60.5, 89.0, 114.69999999999989, 177.0, 0.1701339975364597, 3391.681385915797, 0.07177528021069393], "isController": false}, {"data": ["/sockjs-node/info-483", 50, 0, 0.0, 0.5199999999999999, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.1701977016502369, 0.0649510330574996, 0.0736304510068896], "isController": false}, {"data": ["/assets/img/img3.bd124c52.jpeg-507", 50, 0, 0.0, 1.1800000000000004, 0, 10, 1.0, 1.8999999999999986, 2.4499999999999957, 10.0, 0.17021044819815218, 36.321480143674634, 0.08144835900106892], "isController": false}, {"data": ["/sockjs-node/info-486", 50, 0, 0.0, 0.37999999999999995, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.1701994397034445, 0.064925102672812, 0.07363120291857998], "isController": false}, {"data": ["/assets/img/img1.34c6a75e.jpeg-506", 50, 0, 0.0, 0.8200000000000001, 0, 2, 1.0, 1.0, 1.0, 2.0, 0.17021102763205823, 18.074449718385857, 0.08144863626924662], "isController": false}, {"data": ["/assets/fonts/element-icons.535877f5.woff-479", 50, 0, 0.0, 1.1800000000000004, 1, 3, 1.0, 2.0, 2.0, 3.0, 0.17017742698537497, 4.728904965692231, 0.07993685779293493], "isController": false}, {"data": ["/assets/img/tjlogo.078f1780.png-502", 50, 0, 0.0, 0.64, 0, 2, 1.0, 1.0, 1.4499999999999957, 2.0, 0.17020928934217514, 2.655863305770776, 0.0816140244795], "isController": false}, {"data": ["/api/login-498", 50, 0, 0.0, 7.679999999999999, 6, 12, 7.0, 9.0, 11.0, 12.0, 0.17020233653767597, 0.08533386677582311, 0.10139006375779527], "isController": false}, {"data": ["/assets/js/app.js-477", 50, 0, 0.0, 4.22, 2, 33, 3.0, 6.0, 15.599999999999966, 33.0, 0.1701415237194298, 171.45181283666756, 0.0701169170015619], "isController": false}, {"data": ["/sockjs-node/info-508", 50, 0, 0.0, 0.78, 0, 1, 1.0, 1.0, 1.0, 1.0, 0.1702237761761612, 0.06495433428034494, 0.07364173129496035], "isController": false}, {"data": ["/assets/fonts/zcool_title.b2e0fdc1.TTF-501", 50, 0, 0.0, 10.959999999999999, 6, 33, 8.5, 16.9, 25.14999999999997, 33.0, 0.17020755108779645, 657.0812644250899, 0.07945235294918623], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1450, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
