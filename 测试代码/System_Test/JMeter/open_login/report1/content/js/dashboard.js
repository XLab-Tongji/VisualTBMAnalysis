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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9818181818181818, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.85, 500, 1500, ""], "isController": true}, {"data": [0.9, 500, 1500, "/sockjs-node/418/siy2oweq/xhr?t=1655001057031-494"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title1.21c3c425.png-482"], "isController": false}, {"data": [1.0, 500, 1500, "/__webpack_dev_server__/sockjs.bundle.js-490"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img2.f6a2fee2.jpeg-503"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img4.ac8cc09a.jpeg-505"], "isController": false}, {"data": [1.0, 500, 1500, "/__webpack_dev_server__/sockjs.bundle.js-493"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/iframe.html-489"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title2.c2326998.png-499"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-474"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title1.21c3c425.png-500"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/171/5t0rbpvh/eventsource-485"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/iframe.html-492"], "isController": false}, {"data": [0.9, 500, 1500, "/sockjs-node/418/siy2oweq/xhr?t=1655001057083-495"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/418/qa5mcfvf/htmlfile-491"], "isController": false}, {"data": [1.0, 500, 1500, "/-476"], "isController": false}, {"data": [0.9, 500, 1500, "访问登陆界面"], "isController": true}, {"data": [1.0, 500, 1500, "/assets/img/bg5.2f039688.jpg-480"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/418/y2yjbiar/eventsource-488"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/title2.c2326998.png-481"], "isController": false}, {"data": [0.85, 500, 1500, "/sockjs-node/418/siy2oweq/xhr?t=1655001057127-496"], "isController": false}, {"data": [1.0, 500, 1500, "填写用户名密码进入主页"], "isController": true}, {"data": [1.0, 500, 1500, "/assets/js/chunk-vendors.js-478"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-483"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img3.bd124c52.jpeg-507"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-486"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/img1.34c6a75e.jpeg-506"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/fonts/element-icons.535877f5.woff-479"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/img/tjlogo.078f1780.png-502"], "isController": false}, {"data": [1.0, 500, 1500, "/api/login-498"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/js/app.js-477"], "isController": false}, {"data": [1.0, 500, 1500, "/sockjs-node/info-508"], "isController": false}, {"data": [1.0, 500, 1500, "/assets/fonts/zcool_title.b2e0fdc1.TTF-501"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 600, 0, 0.0, 299.91499999999985, 0, 25015, 2.0, 20.899999999999977, 40.599999999999454, 25006.97, 3.260639193969991, 2942.3888572070996, 1.5897738882578947], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["", 20, 0, 0.0, 3753.95, 2, 25015, 3.0, 25008.9, 25014.7, 25015.0, 0.10950563680265442, 0.04450270581584437, 0.06138304250461292], "isController": true}, {"data": ["/sockjs-node/418/siy2oweq/xhr?t=1655001057031-494", 20, 0, 0.0, 2502.0, 0, 25012, 1.0, 22506.70000000005, 25011.75, 25012.0, 0.15078862450616726, 0.06127996688304835, 0.08452409225248048], "isController": false}, {"data": ["/assets/img/title1.21c3c425.png-482", 20, 0, 0.0, 1.6999999999999997, 1, 4, 2.0, 2.900000000000002, 3.9499999999999993, 4.0, 0.17599281949296466, 9.4936439093285, 0.08438718200297428], "isController": false}, {"data": ["/__webpack_dev_server__/sockjs.bundle.js-490", 20, 0, 0.0, 1.7499999999999996, 1, 5, 1.5, 3.8000000000000043, 4.949999999999999, 5.0, 0.17600056320180224, 9.352092426695766, 0.08043775740082369], "isController": false}, {"data": ["/assets/img/img2.f6a2fee2.jpeg-503", 20, 0, 0.0, 2.400000000000001, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.11318170757242214, 18.44309188373975, 0.05415921553758482], "isController": false}, {"data": ["/assets/img/img4.ac8cc09a.jpeg-505", 20, 0, 0.0, 3.2500000000000004, 1, 5, 3.0, 4.900000000000002, 5.0, 5.0, 0.11318234808099328, 42.34423544616482, 0.054159522030944054], "isController": false}, {"data": ["/__webpack_dev_server__/sockjs.bundle.js-493", 20, 0, 0.0, 1.35, 0, 4, 1.0, 2.0, 3.8999999999999986, 4.0, 0.17600520975420872, 9.352339329244145, 0.08043988102047821], "isController": false}, {"data": ["/sockjs-node/iframe.html-489", 20, 0, 0.0, 1.2500000000000002, 0, 6, 1.0, 4.700000000000006, 5.949999999999999, 6.0, 0.17600056320180224, 0.12650040480129537, 0.1005471967510296], "isController": false}, {"data": ["/assets/img/title2.c2326998.png-499", 20, 0, 0.0, 3.6, 2, 7, 3.5, 5.800000000000004, 6.949999999999999, 7.0, 0.11317594332148759, 6.035571375823355, 0.054266980635596096], "isController": false}, {"data": ["/sockjs-node/info-474", 20, 0, 0.0, 7.050000000000001, 3, 49, 5.0, 10.600000000000009, 47.09999999999997, 49.0, 0.17577472710973616, 0.06708277671336416, 0.07604316807579406], "isController": false}, {"data": ["/assets/img/title1.21c3c425.png-500", 20, 0, 0.0, 1.8499999999999999, 1, 3, 2.0, 2.900000000000002, 3.0, 3.0, 0.11317978609020429, 6.105297875049516, 0.054268823213174125], "isController": false}, {"data": ["/sockjs-node/171/5t0rbpvh/eventsource-485", 20, 0, 0.0, 1.1, 0, 3, 1.0, 1.9000000000000021, 2.9499999999999993, 3.0, 0.17599901440551932, 0.07493708035235003, 0.07923393128998478], "isController": false}, {"data": ["/sockjs-node/iframe.html-492", 20, 0, 0.0, 0.6000000000000001, 0, 2, 1.0, 1.0, 1.9499999999999993, 2.0, 0.17600520975420872, 0.1265037445108375, 0.10054985127559776], "isController": false}, {"data": ["/sockjs-node/418/siy2oweq/xhr?t=1655001057083-495", 20, 0, 0.0, 2501.75, 0, 25014, 1.0, 22503.900000000052, 25013.5, 25014.0, 0.12687215727072615, 0.0530781564206827, 0.07111779128261407], "isController": false}, {"data": ["/sockjs-node/418/qa5mcfvf/htmlfile-491", 20, 0, 0.0, 1.2500000000000004, 0, 4, 1.0, 2.900000000000002, 3.9499999999999993, 4.0, 0.1760021120253443, 0.2590187332247987, 0.10467313107757292], "isController": false}, {"data": ["/-476", 20, 0, 0.0, 2.3000000000000003, 1, 4, 2.0, 3.0, 3.9499999999999993, 4.0, 0.17585509540138924, 0.20899965928075265, 0.08930141563351798], "isController": false}, {"data": ["访问登陆界面", 20, 0, 0.0, 5174.9, 126, 50192, 169.5, 45162.200000000106, 50189.25, 50192.0, 0.1265038140899948, 2812.2538611336004, 1.1660834972611924], "isController": true}, {"data": ["/assets/img/bg5.2f039688.jpg-480", 20, 0, 0.0, 7.05, 3, 18, 6.5, 10.0, 17.599999999999994, 18.0, 0.17596649597916555, 182.87816437250348, 0.08385903324007109], "isController": false}, {"data": ["/sockjs-node/418/y2yjbiar/eventsource-488", 20, 0, 0.0, 1.2000000000000002, 0, 3, 1.0, 2.900000000000002, 3.0, 3.0, 0.17600056320180224, 0.07493773980076736, 0.07923462855081137], "isController": false}, {"data": ["/assets/img/title2.c2326998.png-481", 20, 0, 0.0, 1.7, 1, 8, 1.0, 2.0, 7.699999999999996, 8.0, 0.17599591689472804, 9.385704126664262, 0.08438866718292136], "isController": false}, {"data": ["/sockjs-node/418/siy2oweq/xhr?t=1655001057127-496", 20, 0, 0.0, 3753.95, 2, 25015, 3.0, 25008.9, 25014.7, 25015.0, 0.10950623638016185, 0.0445029494820355, 0.06138337859591104], "isController": false}, {"data": ["填写用户名密码进入主页", 20, 0, 0.0, 68.60000000000001, 49, 111, 67.0, 81.9, 109.54999999999998, 111.0, 0.11313177022937466, 547.6593710669033, 0.5485344132703567], "isController": true}, {"data": ["/assets/js/chunk-vendors.js-478", 20, 0, 0.0, 127.50000000000003, 77, 323, 122.0, 159.50000000000003, 314.89999999999986, 323.0, 0.17572530620134605, 3503.146100765284, 0.07413411355369287], "isController": false}, {"data": ["/sockjs-node/info-483", 20, 0, 0.0, 0.9500000000000001, 0, 3, 1.0, 2.8000000000000043, 3.0, 3.0, 0.17599746563649482, 0.06715059553142434, 0.07613952859078829], "isController": false}, {"data": ["/assets/img/img3.bd124c52.jpeg-507", 20, 0, 0.0, 2.8000000000000003, 1, 8, 2.0, 4.900000000000002, 7.849999999999998, 8.0, 0.1131836291198841, 24.15243588854808, 0.05416013502806954], "isController": false}, {"data": ["/sockjs-node/info-486", 20, 0, 0.0, 0.8500000000000002, 0, 4, 1.0, 1.0, 3.849999999999998, 4.0, 0.17600056320180224, 0.06712599605318738, 0.07614086865077968], "isController": false}, {"data": ["/assets/img/img1.34c6a75e.jpeg-506", 20, 0, 0.0, 2.25, 1, 5, 2.0, 4.800000000000004, 5.0, 5.0, 0.11318491018777377, 12.018933182703082, 0.05416074803907143], "isController": false}, {"data": ["/assets/fonts/element-icons.535877f5.woff-479", 20, 0, 0.0, 2.6500000000000004, 1, 7, 2.0, 6.0, 6.949999999999999, 7.0, 0.1759726890386612, 4.8899442056592815, 0.08265904631601176], "isController": false}, {"data": ["/assets/img/tjlogo.078f1780.png-502", 20, 0, 0.0, 1.7499999999999998, 1, 3, 2.0, 2.0, 2.9499999999999993, 3.0, 0.11318106707110034, 1.7660225484980872, 0.054269437433506124], "isController": false}, {"data": ["/api/login-498", 20, 0, 0.0, 27.099999999999998, 13, 62, 26.0, 32.7, 60.54999999999998, 62.0, 0.11315673339142046, 0.05823593603249861, 0.06751832431851357], "isController": false}, {"data": ["/assets/js/app.js-477", 20, 0, 0.0, 10.899999999999997, 4, 23, 8.5, 20.900000000000002, 22.9, 23.0, 0.17585200295431366, 177.20626945362784, 0.07247025903000036], "isController": false}, {"data": ["/sockjs-node/info-508", 20, 0, 0.0, 1.5499999999999998, 1, 4, 1.0, 2.0, 3.8999999999999986, 4.0, 0.11318619128466327, 0.04317986877475948, 0.04896629173740804], "isController": false}, {"data": ["/assets/fonts/zcool_title.b2e0fdc1.TTF-501", 20, 0, 0.0, 22.05, 14, 41, 21.0, 32.900000000000006, 40.599999999999994, 41.0, 0.11317338162064282, 436.902524120077, 0.05282898087369851], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 600, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
